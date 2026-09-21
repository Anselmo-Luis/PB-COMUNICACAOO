(() => {
  const video = document.getElementById('hero-video');
  const hero = document.querySelector('.hero');

  if (hero) {
    requestAnimationFrame(() => hero.classList.add('is-visible'));
  }

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

  if (video.readyState >= 2) {
    void tryPlay();
  }
})();
