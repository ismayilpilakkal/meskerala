document.addEventListener('DOMContentLoaded', () => {
  const mosaic = document.getElementById('mosaic');
  if(!mosaic) return;
  const tiles = Array.from(document.querySelectorAll('.tile'));

  const start = tiles.map(() => ({
    x: Math.random() * 500 - 250,      // -250..250 px
    y: Math.random() * 220 - 60,       // -60..160 px
    rot: Math.random() * 22 - 11,      // -11..11 deg
    scale: 0.82 + Math.random() * 0.12 // 0.82..0.94
  }));

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const clamp01 = v => Math.min(1, Math.max(0, v));

  // How much of the scroll-through the entrance stagger consumes.
  const STAGGER_SPAN = 0.35;

  let targetRaw = 0;
  let currentRaw = 0;
  let isFirstUpdate = true;

  function calculateTarget() {
    const rect = mosaic.getBoundingClientRect();
    const vh = window.innerHeight;
    targetRaw = (vh - rect.top) / (vh * 1.3);
  }

  function loop(){
    // Smoothly interpolate currentRaw towards targetRaw for a buttery feel
    currentRaw += (targetRaw - currentRaw) * 0.05;
    
    if(Math.abs(targetRaw - currentRaw) > 0.0001 || isFirstUpdate) {
        isFirstUpdate = false;
        const progress = clamp01(currentRaw);

        tiles.forEach((tile, i) => {
          const offset = (i / tiles.length) * STAGGER_SPAN;
          const local = easeOutCubic(clamp01((progress - offset) / (1 - STAGGER_SPAN)));

          const s = start[i];
          const x = s.x * (1 - local);
          const y = s.y * (1 - local);
          const rot = s.rot * (1 - local);
          const scale = s.scale + (1 - s.scale) * local;

          tile.style.opacity = local;
          tile.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        });
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('scroll', calculateTarget, { passive: true });
  window.addEventListener('resize', calculateTarget);
  
  calculateTarget();
  currentRaw = targetRaw - 0.001; // Offset slightly to force initial render
  loop(); 
});
