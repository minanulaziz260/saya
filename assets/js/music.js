/* ═══════════════════════════════════════
   M Aziz – Personal Branding
   music.js
═══════════════════════════════════════ */

(function () {

  const audio    = document.getElementById('bg-music');
  const player   = document.getElementById('music-player');
  const btnIcon  = document.getElementById('mp-btn-icon');
  const progress = document.getElementById('mp-progress');
  const mpTitle  = document.getElementById('mp-title');

  // Ambil nama file lagu
  const srcEl   = audio ? audio.querySelector('source') : null;
  if (srcEl) {
    const name = decodeURIComponent(srcEl.src.split('/').pop().replace(/\.mp3$/i, ''));
    if (mpTitle) mpTitle.textContent = name;
  }

  function setPlaying(state) {
    if (state) {
      player.classList.add('playing');
      btnIcon.textContent = '⏸';
    } else {
      player.classList.remove('playing');
      btnIcon.textContent = '▶';
    }
  }

  window.toggleMusic = function (e) {
    if (e) e.stopPropagation();
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  // Progress bar
  if (audio) {
    audio.addEventListener('timeupdate', () => {
      if (audio.duration && progress) {
        progress.style.width = (audio.currentTime / audio.duration * 100) + '%';
      }
    });

    // Autoplay saat user pertama kali interaksi
    const tryPlay = () => {
      if (audio.paused) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('keydown', tryPlay);
    };
    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('keydown', tryPlay, { once: true });
  }

})();
