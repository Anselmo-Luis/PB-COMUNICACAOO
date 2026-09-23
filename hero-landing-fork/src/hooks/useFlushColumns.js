import { useLayoutEffect } from 'react';

const STRETCHED = 'is-stretched';

function columnOf(element, containerLeft) {
  return Math.round(element.getBoundingClientRect().left - containerLeft);
}

function reset(container) {
  for (const tile of container.querySelectorAll(`.${STRETCHED}`)) {
    tile.classList.remove(STRETCHED);
    tile.style.height = '';
  }
}

// CSS columns balance the mosaic groups, but their bottoms still land a few pixels
// apart. Grow the last row of each shorter column (the photos crop to fit) so every
// column ends on the same line.
function flush(container) {
  reset(container);

  const groups = [...container.children];
  const containerLeft = container.getBoundingClientRect().left;
  const lastInColumn = new Map();

  for (const group of groups) {
    const column = columnOf(group, containerLeft);
    const bottom = group.getBoundingClientRect().bottom;
    const current = lastInColumn.get(column);
    if (!current || bottom > current.bottom) lastInColumn.set(column, { group, bottom });
  }

  if (lastInColumn.size < 2) return;

  const columnsBefore = groups.map((group) => columnOf(group, containerLeft));
  const target = Math.max(...[...lastInColumn.values()].map(({ bottom }) => bottom));

  for (const { group, bottom } of lastInColumn.values()) {
    const delta = target - bottom;
    if (delta < 0.5) continue;

    const lastRow = [...group.querySelectorAll('.portfolio-mosaic-tile')]
      .filter((tile) => Math.abs(tile.getBoundingClientRect().bottom - bottom) < 1);

    for (const tile of lastRow) {
      tile.style.height = `${tile.getBoundingClientRect().height + delta}px`;
      tile.classList.add(STRETCHED);
    }
  }

  // Taller content can make the browser rebalance the columns; if any group moved,
  // the natural layout is the safer one.
  const moved = groups.some((group, index) => columnOf(group, containerLeft) !== columnsBefore[index]);
  if (moved) reset(container);
}

export function useFlushColumns(ref, layoutKey) {
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return undefined;

    let width = container.getBoundingClientRect().width;
    flush(container);

    // Only width changes the layout; our own stretching changes the height.
    const observer = new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.width - width) < 0.5) return;
      width = entry.contentRect.width;
      flush(container);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [ref, layoutKey]);
}
