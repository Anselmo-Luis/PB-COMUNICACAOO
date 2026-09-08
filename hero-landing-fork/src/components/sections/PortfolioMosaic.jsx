function mosaicRows(images, size) {
  const rows = [];

  for (let index = 0; index < images.length; index += size) {
    rows.push(images.slice(index, index + size));
  }

  return rows;
}

function MosaicTile({ image, imageIndex, startIndex, onOpenLightbox, isHero }) {
  return (
    <button
      type="button"
      className={isHero ? 'portfolio-mosaic-tile portfolio-mosaic-tile-hero' : 'portfolio-mosaic-tile'}
      style={{ '--tile-ratio': image.ratio }}
      onClick={() => onOpenLightbox(startIndex + imageIndex)}
      aria-label={`Ampliar ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
      <span className="portfolio-mosaic-tile-hint" aria-hidden="true">Ampliar</span>
    </button>
  );
}

export default function ProjectMosaic({ project, categoryLabel, startIndex, onOpenLightbox }) {
  const { images } = project;

  let content = null;

  if (images.length === 1) {
    content = (
      <MosaicTile
        image={images[0]}
        imageIndex={0}
        startIndex={startIndex}
        onOpenLightbox={onOpenLightbox}
      />
    );
  } else if (images.length === 2) {
    content = (
      <div className="portfolio-mosaic-row">
        {images.map((image, imageIndex) => (
          <MosaicTile
            key={image.src}
            image={image}
            imageIndex={imageIndex}
            startIndex={startIndex}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>
    );
  } else {
    const [hero, ...rest] = images;
    const isWide = images.length >= 5;
    // Keep leftover photos in one row when possible so a tall orphan
    // (e.g. Friboi frota-14) does not drop below the neighboring column.
    const rowSize = isWide || rest.length === 3 ? 3 : 2;

    content = (
      <div className={isWide || rest.length === 3 ? 'portfolio-mosaic-cluster is-wide' : 'portfolio-mosaic-cluster'}>
        <MosaicTile
          image={hero}
          imageIndex={0}
          startIndex={startIndex}
          onOpenLightbox={onOpenLightbox}
          isHero
        />
        {mosaicRows(rest, rowSize).map((row, rowIndex) => (
          <div className="portfolio-mosaic-row" key={row[0].src}>
            {row.map((image, imageIndex) => (
              <MosaicTile
                key={image.src}
                image={image}
                imageIndex={rowIndex * rowSize + imageIndex + 1}
                startIndex={startIndex}
                onOpenLightbox={onOpenLightbox}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="portfolio-mosaic-group" data-category={categoryLabel}>
      {content}
    </div>
  );
}
