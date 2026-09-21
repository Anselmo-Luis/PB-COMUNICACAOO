(() => {
  const video = document.getElementById('hero-video');
  const hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-visible'));

  const wavePaths = [
    'M0 5.2 C12 5.5 28 3.2 48 2.6 C68 2.1 86 3.2 100 4.4 L100 5.1 C84 4.1 66 3.5 44 4.1 C24 4.7 8 5.3 0 5.2 Z',
    'M0 5.2 C14 4.0 30 6.4 50 3.5 C72 0.8 86 5.6 100 3.2 L100 4.1 C86 6.2 68 2.2 48 4.8 C30 6.8 12 4.4 0 5.2 Z',
    'M0 5.2 C16 6.6 34 2.2 52 5.4 C70 8.0 88 2.6 100 5.4 L100 6.2 C86 3.6 70 7.0 50 4.4 C32 2.0 14 5.8 0 5.2 Z',
    'M0 5.2 C12 3.6 34 5.9 52 2.7 C74 0.2 88 4.9 100 3.0 L100 3.9 C86 5.5 70 1.6 50 4.1 C32 6.5 14 4.2 0 5.2 Z',
    'M0 5.2 C12 5.5 28 3.2 48 2.6 C68 2.1 86 3.2 100 4.4 L100 5.1 C84 4.1 66 3.5 44 4.1 C24 4.7 8 5.3 0 5.2 Z',
  ];

  document.querySelectorAll('.hero-intro .mark').forEach((mark) => {
    if (mark.querySelector('.mark-wave')) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'mark-wave');
    svg.setAttribute('viewBox', '0 0 100 8');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', wavePaths[0]);

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'd');
    animate.setAttribute('dur', '2.1s');
    animate.setAttribute('repeatCount', 'indefinite');
    animate.setAttribute('values', wavePaths.join(';'));
    animate.setAttribute('calcMode', 'spline');
    animate.setAttribute('keyTimes', '0;0.25;0.5;0.75;1');
    animate.setAttribute('keySplines', '0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1');

    path.appendChild(animate);
    svg.appendChild(path);
    mark.appendChild(svg);
  });

  if (!video) return;

  const markReady = () => video.classList.add('is-ready');
  const tryPlay = () => {
    video.muted = true;
    video.playsInline = true;
    return video.play().then(markReady).catch(() => {});
  };

  video.addEventListener('playing', markReady);
  video.addEventListener('canplay', () => {
    void tryPlay();
  });
  if (video.readyState >= 2) void tryPlay();
})();
