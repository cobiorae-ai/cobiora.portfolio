/* Accessible, original SVG walking-robot illustration.
   Pure HTML/CSS/JavaScript; no packages or build step required.
   This is a visual design demo, not a validated dynamics simulation. */
(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const scene = document.getElementById('rover-scene');
  if (!scene) return; // Project detail pages don't include the animation.
  const frame = document.getElementById('animation-card');
  const rover = document.getElementById('rover');
  const jointsToggle = document.getElementById('joints-toggle');
  const motionToggle = document.getElementById('motion-toggle');
  const motionLabel = document.getElementById('motion-label');
  const motionIcon = document.getElementById('motion-icon');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const specs = [
    { id: 'leg-rear-far',  hipX: -65, hipY: 162, phase: .5,  front: false, ground: 280 },
    { id: 'leg-front-far', hipX:  65, hipY: 162, phase: 0,   front: true,  ground: 280 },
    { id: 'leg-rear-near', hipX: -75, hipY: 169, phase: .75, front: false, ground: 283 },
    { id: 'leg-front-near',hipX:  75, hipY: 169, phase: .25, front: true,  ground: 283 }
  ].map(spec => ({ ...spec, el: document.getElementById(spec.id) }));

  // Two-segment inverse kinematics; knee is the intersection of two circles.
  function inverseKinematics(hx, hy, fx, fy, length1, length2, bend) {
    const dx = fx - hx, dy = fy - hy;
    const d = Math.max(0.001, Math.min(Math.hypot(dx, dy), length1 + length2 - 0.001));
    const ux = dx / Math.hypot(dx, dy), uy = dy / Math.hypot(dx, dy);
    const a = (length1 * length1 - length2 * length2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, length1 * length1 - a * a));
    return { x: hx + a * ux + bend * h * -uy, y: hy + a * uy + bend * h * ux };
  }

  function draw(t) {
    const cycle = t / 2.35;
    const bob = Math.sin(cycle * Math.PI * 4) * 1.8;
    rover.setAttribute('transform', `translate(${452 + Math.sin(t * .23) * 15} ${bob})`);
    for (const { el, hipX, hipY, phase, front, ground } of specs) {
      const p = (cycle + phase) % 1;
      const stance = 0.62;
      const fx = p < stance ? 46 - (p / stance) * 92 : -46 + ((p - stance) / (1 - stance)) * 92;
      const lift = p < stance ? 0 : Math.sin(Math.PI * (p - stance) / (1 - stance)) * 28;
      const fy = ground - lift - bob;
      const k = inverseKinematics(hipX, hipY, hipX + fx, fy, 72, 75, front ? -1 : 1);
      el.querySelector('.upper-link').setAttribute('d', `M${hipX} ${hipY} L${k.x.toFixed(2)} ${k.y.toFixed(2)}`);
      el.querySelector('.lower-link').setAttribute('d', `M${k.x.toFixed(2)} ${k.y.toFixed(2)} L${(hipX + fx).toFixed(2)} ${fy.toFixed(2)}`);
      el.querySelector('.foot').setAttribute('d', `M${(hipX + fx - 12).toFixed(2)} ${(fy+1).toFixed(2)} h24`);
      el.querySelector('.hip-joint').setAttribute('cx', hipX);
      el.querySelector('.hip-joint').setAttribute('cy', hipY);
      el.querySelector('.knee-joint').setAttribute('cx', k.x.toFixed(2));
      el.querySelector('.knee-joint').setAttribute('cy', k.y.toFixed(2));
    }
  }

  let playing = !prefersReducedMotion.matches;
  let simTime = 0;
  let prior = 0;
  function refreshButton() {
    motionToggle.setAttribute('aria-pressed', String(!playing));
    motionLabel.textContent = playing ? 'Pause' : 'Play';
    motionIcon.textContent = playing ? 'Ⅱ' : '▶';
  }
  function step(now) {
    const delta = prior ? Math.min((now - prior) / 1000, .05) : 0;
    prior = now;
    if (playing) simTime += delta;
    draw(simTime);
    window.requestAnimationFrame(step);
  }
  jointsToggle.addEventListener('click', () => {
    const on = frame.classList.toggle('show-joints');
    jointsToggle.setAttribute('aria-pressed', String(on));
    jointsToggle.textContent = on ? 'Hide joints' : 'Show joints';
  });
  motionToggle.addEventListener('click', () => { playing = !playing; refreshButton(); });
  prefersReducedMotion.addEventListener?.('change', e => { playing = !e.matches; refreshButton(); });
  refreshButton();
  draw(0);
  window.requestAnimationFrame(step);
})();
