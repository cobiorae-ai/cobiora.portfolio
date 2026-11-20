(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const projectsDropdown = nav?.querySelector('.projects-dropdown');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      if (!open && projectsDropdown) projectsDropdown.open = false;
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (projectsDropdown) projectsDropdown.open = false;
    }));
  }

  if (projectsDropdown) {
    document.addEventListener('click', event => {
      if (!projectsDropdown.contains(event.target)) projectsDropdown.open = false;
    });
    projectsDropdown.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !projectsDropdown.open) return;
      projectsDropdown.open = false;
      projectsDropdown.querySelector('summary').focus();
    });
  }

  // Photo slots: add your real image to assets/projects using the filename in
  // data-photo. Once the image loads, it replaces the starter illustration or
  // placeholder. If the file doesn't exist, the original fallback remains.
  document.querySelectorAll('[data-photo]').forEach(slot => {
    const src = slot.dataset.photo;
    if (!src) return;
    const photo = document.createElement('img');
    photo.className = 'uploaded-photo';
    if (slot.dataset.photoFit === 'contain') photo.classList.add('fit-contain');
    photo.alt = slot.dataset.photoAlt || 'Project image';
    photo.loading = 'eager'; // The image is initially hidden until its load event fires.
    photo.decoding = 'async';
    photo.addEventListener('load', () => slot.classList.add('has-photo'), { once: true });
    photo.addEventListener('error', () => photo.remove(), { once: true });
    photo.src = src;
    slot.appendChild(photo);
  });

  const card = document.getElementById('animation-card');
  if (!card) return;

  const quadruped = document.getElementById('rover-mechanism');
  const ground = document.getElementById('ground-ticks');
  const glider = document.getElementById('glider');
  const airflow = document.getElementById('airflow-lines');
  const motionToggle = document.getElementById('motion-toggle');
  const motionLabel = document.getElementById('motion-label');
  const motionIcon = document.getElementById('motion-icon');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const gait = { period: 2.7, stride: 44, stance: 0.69, lift: 24, bob: 2 };
  const flight = { bankPeriod: 7.5, driftPeriod: 10, airflowSpeed: 23 };

  const legs = [
    { id: 'leg-rear-far', hipX: -79, hipY: 160, phase: 0.25, bend: 1 },
    { id: 'leg-front-far', hipX: 79, hipY: 160, phase: 0, bend: -1 },
    { id: 'leg-rear-near', hipX: -108, hipY: 150, phase: 0.75, bend: 1 },
    { id: 'leg-front-near', hipX: 108, hipY: 150, phase: 0.5, bend: -1 }
  ].map(leg => {
    const element = document.getElementById(leg.id);
    const hip = element.querySelector('.hip-joint');
    hip.setAttribute('cx', leg.hipX);
    hip.setAttribute('cy', leg.hipY);
    return {
      ...leg,
      upper: element.querySelector('.upper-link'),
      lower: element.querySelector('.lower-link'),
      foot: element.querySelector('.foot'),
      knee: element.querySelector('.knee-joint')
    };
  });

  // Two-link inverse kinematics puts the knee at the intersection of two circles.
  function kneePosition(hipX, hipY, footX, footY, bend) {
    const upperLength = 64;
    const lowerLength = 65;
    const dx = footX - hipX;
    const dy = footY - hipY;
    const distance = Math.hypot(dx, dy);
    const along = (upperLength ** 2 - lowerLength ** 2 + distance ** 2) / (2 * distance);
    const offset = bend * Math.sqrt(Math.max(0, upperLength ** 2 - along ** 2));
    return [
      hipX + (along * dx - offset * dy) / distance,
      hipY + (along * dy + offset * dx) / distance
    ];
  }

  function drawQuadruped(seconds) {
    const cycle = seconds / gait.period;
    const bob = gait.bob * Math.sin(cycle * Math.PI * 8);
    quadruped.setAttribute('transform', `translate(0 ${bob})`);
    // Matching the ground scroll to the stance velocity makes each foot stick to the moving surface.
    ground.setAttribute('patternTransform', `translate(${-(cycle * gait.stride / gait.stance % 52)} 0)`);

    for (const leg of legs) {
      const phase = (cycle + leg.phase) % 1;
      let step = gait.stride / 2 - gait.stride * phase / gait.stance;
      let lift = 0;
      if (phase >= gait.stance) {
        const swing = (phase - gait.stance) / (1 - gait.stance);
        const ease = swing * swing * (3 - 2 * swing);
        const endpointSpeed = -(1 - gait.stance) / gait.stance;
        const travel = ease + endpointSpeed * swing * (1 - swing) * (1 - 2 * swing);
        step = gait.stride * (travel - 0.5);
        lift = gait.lift * Math.sin(Math.PI * swing) ** 2;
      }
      const footX = leg.hipX + step;
      const footY = 258.5 - lift - bob;
      const [kneeX, kneeY] = kneePosition(leg.hipX, leg.hipY, footX, footY, leg.bend);
      leg.upper.setAttribute('d', `M${leg.hipX} ${leg.hipY}L${kneeX} ${kneeY}`);
      leg.lower.setAttribute('d', `M${kneeX} ${kneeY}L${footX} ${footY}`);
      leg.foot.setAttribute('d', `M${footX - 9} ${footY}h18`);
      leg.knee.setAttribute('cx', kneeX);
      leg.knee.setAttribute('cy', kneeY);
    }
  }

  function drawGlider(seconds) {
    const bank = Math.sin(seconds * 2 * Math.PI / flight.bankPeriod);
    const drift = seconds * 2 * Math.PI / flight.driftPeriod;
    const x = 350 + 13 * Math.sin(drift);
    const y = 153 + 5 * Math.sin(drift * 0.6);
    glider.setAttribute('transform',
      `translate(${x} ${y}) rotate(${3.5 * bank}) scale(${1 - 0.025 * bank ** 2} 1)`);
    airflow.setAttribute('patternTransform', `translate(0 ${seconds * flight.airflowSpeed % 154})`);
  }

  const scenes = {
    quadruped: { draw: drawQuadruped, time: 0 },
    glider: { draw: drawGlider, time: 0 }
  };
  const sceneButtons = card.querySelectorAll('[data-scene]');
  let activeScene = scenes.quadruped;
  let playing = !reducedMotion.matches;
  let userPaused = false;
  let frameId = null;
  let previousTime = null;

  function step(now) {
    if (previousTime !== null) {
      activeScene.time += Math.min((now - previousTime) / 1000, 0.05);
    }
    previousTime = now;
    activeScene.draw(activeScene.time);
    frameId = window.requestAnimationFrame(step);
  }

  function setPlaying(next) {
    playing = next;
    motionLabel.textContent = playing ? 'Pause' : 'Play';
    motionIcon.textContent = playing ? 'Ⅱ' : '▶';
    if (playing && frameId === null) {
      frameId = window.requestAnimationFrame(step);
    } else if (!playing && frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
      previousTime = null;
    }
  }

  for (const button of sceneButtons) {
    button.addEventListener('click', () => {
      const selectedScene = scenes[button.dataset.scene];
      if (selectedScene === activeScene) return;
      activeScene = selectedScene;
      previousTime = null;
      activeScene.draw(activeScene.time);
      for (const option of sceneButtons) {
        const selected = option === button;
        option.setAttribute('aria-pressed', String(selected));
        document.getElementById(option.getAttribute('aria-controls')).hidden = !selected;
      }
    });
  }

  motionToggle.addEventListener('click', () => {
    userPaused = playing;
    setPlaying(!userPaused);
  });
  reducedMotion.addEventListener('change', event => {
    setPlaying(!event.matches && !userPaused);
  });

  activeScene.draw(0);
  setPlaying(playing);
  document.getElementById('illustration-controls').hidden = false;
})();
