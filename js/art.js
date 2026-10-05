/**
 * Procedural Scientific Vector Graphics & Icon Generator
 * Sagar Kumar Portfolio
 */

import { AREAS, WORKS, GLOBAL_LINKS } from './data.js';

function rng(s) {
  s = (s % 2147483647) || 7;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export const ICONS = {
  arrowRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`,
  arrowLeft: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>`,
  arrowUp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>`,
  arrowUpRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`,
  download: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path><path d="M12 15V3"></path></svg>`,
  award: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>`,
  mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`,
  phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
  pin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  copy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="14" height="14" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>`,
  menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>`,
  x: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`
};

export function getIcon(name) {
  return ICONS[name] || '';
}

export function renderSvg(kind, options = {}) {
  const anim = options.anim !== false;
  const dark = !!options.dark;
  const seed = options.seed || 1;
  const ink = dark ? 'var(--color-bg)' : 'var(--color-text)';
  const soft = dark ? 'var(--color-neutral-700)' : 'var(--color-neutral-300)';
  const mid = 'var(--color-neutral-500)';
  const red = dark ? 'var(--color-accent-500)' : 'var(--color-accent)';
  const paper = dark ? 'var(--color-text)' : 'var(--color-bg)';

  const ell = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0`;

  if (kind === 'orbital') {
    const r = rng(seed * 11);
    let dotsHtml = '';
    for (let i = 0; i < 90; i++) {
      const cx = (r() * 400).toFixed(1);
      const cy = (r() * 400).toFixed(1);
      const rr = (0.6 + r() * 1.5).toFixed(2);
      const d = (2 + r() * 4).toFixed(1);
      const dl = (-r() * 4).toFixed(1);
      const animStyle = anim ? `style="animation: sk-pulse ${d}s ease-in-out ${dl}s infinite"` : '';
      dotsHtml += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${mid}" ${animStyle}></circle>`;
    }

    const orbits = [0, 60, 120].map((a, i) => {
      const dur = 10 + i * 5;
      const dotFill = i ? ink : red;
      const dotRadius = i ? 4 : 6;
      return `
        <g transform="rotate(${a} 200 200)">
          <path d="${ell(200, 200, 186, 60)}" fill="none" stroke="${soft}" stroke-width="1.5"></path>
          ${anim ? `
            <circle r="${dotRadius}" fill="${dotFill}">
              <animateMotion dur="${dur}s" repeatCount="indefinite" path="${ell(200, 200, 186, 60)}"></animateMotion>
            </circle>` : `
            <circle cx="14" cy="200" r="${dotRadius}" fill="${dotFill}"></circle>`}
        </g>`;
    }).join('');

    const spinStyle = anim ? `style="transform-origin: 200px 200px; animation: sk-spin 22s linear infinite"` : '';

    return `
      <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: a Bloch sphere with a rotating qubit state vector">
        <g data-depth="0.15">${dotsHtml}</g>
        <g data-depth="0.45">${orbits}</g>
        <g data-depth="0.9">
          <circle cx="200" cy="200" r="88" fill="${paper}" stroke="${ink}" stroke-width="2"></circle>
          <ellipse cx="200" cy="200" rx="88" ry="26" fill="none" stroke="${ink}" stroke-width="1.2" stroke-dasharray="4 5"></ellipse>
          <line x1="200" y1="100" x2="200" y2="300" stroke="${ink}" stroke-width="1.2"></line>
          <g ${spinStyle}>
            <line x1="200" y1="200" x2="256" y2="142" stroke="${red}" stroke-width="2.5"></line>
            <circle cx="256" cy="142" r="6.5" fill="${red}"></circle>
          </g>
          <circle cx="200" cy="200" r="3.5" fill="${ink}"></circle>
          <text x="208" y="94" fill="${ink}" style="font: 600 13px var(--font-body)">|0⟩</text>
          <text x="208" y="318" fill="${ink}" style="font: 600 13px var(--font-body)">|1⟩</text>
        </g>
      </svg>`;
  }

  if (kind === 'circuit') {
    const r = rng(seed * 7 + 3);
    const W = [50, 110, 170, 230];
    const G = ['H', 'X', 'Rz', 'Ry', 'H', 'Z'];
    const gates = [];
    const cn = [];
    let x = 96;

    while (x < 320) {
      if (r() < 0.3) {
        const a = Math.floor(r() * 3);
        cn.push([x, a, a + 1]);
        x += 46;
        continue;
      }
      const w = Math.floor(r() * 4);
      gates.push([x, w, G[Math.floor(r() * G.length)]]);
      if (r() < 0.55) {
        gates.push([x, (w + 2) % 4, G[Math.floor(r() * G.length)]]);
      }
      x += 52;
    }
    W.forEach((y, i) => gates.push([356, i, 'M']));
    const hot = 1 % gates.length;

    let wiresHtml = W.map((y, i) => `
      <line x1="40" y1="${y}" x2="384" y2="${y}" stroke="${ink}" stroke-width="1.5"></line>
      <text x="6" y="${y + 4}" fill="${ink}" style="font: 600 12px var(--font-body)">q${i}</text>
      ${anim ? `<path d="M40 ${y}H380" stroke="${red}" stroke-width="3" stroke-dasharray="26 314" fill="none" style="animation: sk-dash ${2.6 + i * 0.5}s linear ${i * 0.4}s infinite"></path>` : ''}
    `).join('');

    let cnHtml = cn.map(([cx, a, b]) => `
      <line x1="${cx}" y1="${W[a]}" x2="${cx}" y2="${W[b] + 11}" stroke="${ink}" stroke-width="2"></line>
      <circle cx="${cx}" cy="${W[a]}" r="5" fill="${ink}"></circle>
      <circle cx="${cx}" cy="${W[b]}" r="11" fill="${paper}" stroke="${ink}" stroke-width="2"></circle>
      <path d="M${cx - 11} ${W[b]}h22M${cx} ${W[b] - 11}v22" stroke="${ink}" stroke-width="2"></path>
    `).join('');

    let gatesHtml = gates.map(([gx, w, l], i) => {
      const on = i === hot;
      return `
        <g>
          <rect x="${gx - 17}" y="${W[w] - 17}" width="34" height="34" fill="${on ? red : paper}" stroke="${on ? red : ink}" stroke-width="2"></rect>
          <text x="${gx}" y="${W[w] + 1}" text-anchor="middle" dominant-baseline="central" fill="${on ? paper : ink}" style="font: 800 13px var(--font-body)">${l}</text>
        </g>`;
    }).join('');

    return `
      <svg viewBox="0 0 400 280" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: four-qubit quantum circuit">
        ${wiresHtml}
        ${cnHtml}
        ${gatesHtml}
      </svg>`;
  }

  if (kind === 'constellation') {
    const r = rng(seed * 13 + 5);
    const P = Array.from({ length: 22 }, () => {
      const a = r() * Math.PI * 2;
      const d = 30 + r() * 150;
      return [+(200 + Math.cos(a) * d).toFixed(1), +(200 + Math.sin(a) * d).toFixed(1)];
    });
    const edges = new Set();
    P.forEach((p, i) => {
      const ds = P.map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2]).filter(x => x[0] !== i).sort((a, b) => a[1] - b[1]);
      [ds[0][0], ds[1][0]].forEach(j => edges.add(i < j ? `${i}-${j}` : `${j}-${i}`));
    });

    let dotsHtml = '';
    for (let i = 0; i < 60; i++) {
      dotsHtml += `<circle cx="${(r() * 400).toFixed(1)}" cy="${(r() * 400).toFixed(1)}" r="${(0.6 + r() * 1.2).toFixed(2)}" fill="${mid}"></circle>`;
    }

    let edgesHtml = [...edges].map(e => {
      const [a, b] = e.split('-').map(Number);
      return `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="${ink}" stroke-width="1" opacity="0.6"></line>`;
    }).join('');

    let nodesHtml = P.map((p, i) => {
      const isRed = i % 7 === 0;
      const animStyle = isRed && anim ? `style="animation: sk-pulse 3s ease-in-out ${-i * 0.4}s infinite"` : '';
      return `<circle cx="${p[0]}" cy="${p[1]}" r="${i % 5 === 0 ? 5.5 : 3}" fill="${isRed ? red : ink}" ${animStyle}></circle>`;
    }).join('');

    const satSpin = anim ? `style="transform-origin: 200px 200px; animation: sk-spin 40s linear infinite"` : '';

    return `
      <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: research constellation diagram">
        <g data-depth="0.2">${dotsHtml}</g>
        <circle cx="200" cy="200" r="190" fill="none" stroke="${soft}" stroke-width="1.5" stroke-dasharray="2 6"></circle>
        <g ${satSpin}><rect x="384" y="194" width="12" height="12" fill="${red}"></rect></g>
        <g data-depth="0.6">
          ${edgesHtml}
          ${nodesHtml}
        </g>
      </svg>`;
  }

  if (kind === 'wave') {
    const rows = [[60, 14, 200], [105, 22, 100], [150, 36, 200], [195, 18, 50], [240, 10, 200]];
    let gridLines = '';
    for (let x = 0; x <= 400; x += 40) {
      gridLines += `<line x1="${x}" y1="20" x2="${x}" y2="280" stroke="${soft}" stroke-width="1"></line>`;
    }
    let wavesHtml = rows.map(([y, a, p], i) => {
      let d = `M0 ${y}`;
      for (let xx = 0; xx <= 800; xx += 8) {
        d += `L${xx} ${(y + a * Math.sin(2 * Math.PI * xx / p + i)).toFixed(1)}`;
      }
      const isRed = i === 2;
      const animStyle = anim ? `style="animation: sk-drift ${7 + i * 2}s linear infinite"` : '';
      return `<path d="${d}" fill="none" stroke="${isRed ? red : ink}" stroke-width="${isRed ? 3 : 1.5}" ${animStyle}></path>`;
    }).join('');

    return `
      <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: stacked waveforms drifting across grid">
        ${gridLines}
        ${wavesHtml}
      </svg>`;
  }

  if (kind === 'neural') {
    const r = rng(seed * 5 + 1);
    const L = [3, 4 + Math.floor(r() * 2), 4 + Math.floor(r() * 2), 2];
    const xs = [50, 150, 250, 350];
    const N = L.map((n, li) => Array.from({ length: n }, (_, k) => [xs[li], 150 + (k - (n - 1) / 2) * 52]));
    const pick = N.map(l => Math.floor(r() * l.length));

    let linksHtml = '';
    for (let li = 0; li < 3; li++) {
      N[li].forEach(a => {
        N[li + 1].forEach(b => {
          linksHtml += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${soft}" stroke-width="1"></line>`;
        });
      });
    }

    let activePathHtml = '';
    for (let li = 0; li < 3; li++) {
      const a = N[li][pick[li]];
      const b = N[li + 1][pick[li + 1]];
      const animStyle = anim ? `style="stroke-dasharray: 6 8; animation: sk-flow 1.2s linear infinite"` : '';
      activePathHtml += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${red}" stroke-width="2.5" ${animStyle}></line>`;
    }

    let nodesHtml = '';
    N.forEach((l, li) => {
      l.forEach((p, k) => {
        const isPick = pick[li] === k;
        nodesHtml += `<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="${isPick ? red : paper}" stroke="${isPick ? red : ink}" stroke-width="2"></circle>`;
      });
    });

    return `
      <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: layered neural network">
        ${linksHtml}
        ${activePathHtml}
        ${nodesHtml}
      </svg>`;
  }

  if (kind === 'galaxy') {
    const r = rng(seed * 3 + 9);
    const pts = [];
    for (let arm = 0; arm < 2; arm++) {
      for (let i = 0; i < 150; i++) {
        const rad = 14 + i * 1.2;
        const a = arm * Math.PI + rad * 0.034 + (r() - 0.5) * 0.35;
        pts.push([+(200 + Math.cos(a) * rad).toFixed(1), +(200 + Math.sin(a) * rad).toFixed(1), +(0.6 + r() * 1.8).toFixed(2), i]);
      }
    }

    let dotsHtml = '';
    for (let i = 0; i < 50; i++) {
      dotsHtml += `<circle cx="${(r() * 400).toFixed(1)}" cy="${(r() * 400).toFixed(1)}" r="${(0.6 + r() * 1.2).toFixed(2)}" fill="${mid}"></circle>`;
    }

    let ptsHtml = pts.map(p => {
      const isRed = p[3] % 29 === 0;
      return `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="${isRed ? red : ink}" opacity="${(1 - p[3] / 190).toFixed(2)}"></circle>`;
    }).join('');

    const spinStyle = anim ? `style="transform-origin: 200px 200px; animation: sk-spin 140s linear infinite"` : '';

    return `
      <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: spiral galaxy with rotating core">
        <g data-depth="0.15">${dotsHtml}</g>
        <ellipse cx="200" cy="200" rx="196" ry="112" fill="none" stroke="${soft}" stroke-width="1.5"></ellipse>
        <ellipse cx="200" cy="200" rx="120" ry="70" fill="none" stroke="${soft}" stroke-width="1" stroke-dasharray="3 6"></ellipse>
        <g transform="translate(200 200) scale(1 0.58) translate(-200 -200)" data-depth="0.5">
          <g ${spinStyle}>
            ${ptsHtml}
            <circle cx="200" cy="200" r="26" fill="none" stroke="${red}" stroke-width="1.5" stroke-dasharray="4 4"></circle>
            <circle cx="200" cy="200" r="10" fill="${red}"></circle>
          </g>
        </g>
      </svg>`;
  }

  if (kind === 'signal') {
    let ringsHtml = [60, 120, 180].map(rr => `
      <circle cx="200" cy="200" r="${rr}" fill="none" stroke="${soft}" stroke-width="1.5" stroke-dasharray="3 6"></circle>
    `).join('');

    let animRings = anim ? [0, 1, 2].map(i => `
      <circle cx="200" cy="200" r="185" fill="none" stroke="${red}" stroke-width="2" style="transform-origin: 200px 200px; animation: sk-ring 4.5s cubic-bezier(.2,.6,.3,1) ${i * 1.5}s infinite both"></circle>
    `).join('') : '';

    return `
      <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: radar signal rings radiating outward">
        ${ringsHtml}
        <path d="M200 10V390M10 200H390" stroke="${soft}" stroke-width="1"></path>
        ${animRings}
        <rect x="315" y="105" width="10" height="10" fill="${ink}"></rect>
        <rect x="81" y="145" width="10" height="10" fill="${ink}"></rect>
        <rect x="135" y="325" width="10" height="10" fill="${ink}"></rect>
        <rect x="295" y="295" width="10" height="10" fill="${ink}"></rect>
        <rect x="190" y="190" width="20" height="20" fill="${red}"></rect>
      </svg>`;
  }

  if (kind === 'globe') {
    const R = 150;
    const J = [252, 168];

    let parallels = [-60, -30, 0, 30, 60].map(lat => {
      const y = 200 - R * Math.sin(lat * Math.PI / 180);
      const rx = R * Math.cos(lat * Math.PI / 180);
      return `<ellipse cx="200" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.14).toFixed(1)}" fill="none" stroke="${lat === 0 ? ink : soft}" stroke-width="1.2" ${lat === 0 ? 'stroke-dasharray="4 5"' : ''}></ellipse>`;
    }).join('');

    let linksHtml = GLOBAL_LINKS.map((p, i) => {
      const mx = (J[0] + p.x) / 2;
      const my = (J[1] + p.y) / 2;
      const dx = p.x - J[0];
      const dy = p.y - J[1];
      const len = Math.hypot(dx, dy) || 1;
      const cx = +(mx - dy / len * len * 0.45 - (200 - mx) * 0.15).toFixed(1);
      const cy = +(my + dx / len * len * 0.45 * -1 - (200 - my) * 0.15).toFixed(1);
      const d = `M${J[0]} ${J[1]}Q${cx} ${cy} ${p.x} ${p.y}`;
      const main = !!p.primary;
      const animStyle = anim ? `style="animation: sk-flow ${1.2 + i * 0.15}s linear infinite"` : '';

      return `
        <path d="${d}" fill="none" stroke="${main ? red : ink}" stroke-opacity="${main ? 1 : 0.7}" stroke-width="${main ? 2.5 : 1.5}" stroke-dasharray="6 6" ${animStyle}></path>
        ${anim ? `
          <circle r="${main ? 5 : 3.5}" fill="${main ? red : ink}">
            <animateMotion dur="${3.5 + i * 0.6}s" repeatCount="indefinite" path="${d}"></animateMotion>
          </circle>` : `
          <circle cx="${p.x}" cy="${p.y}" r="${main ? 5 : 3.5}" fill="${main ? red : ink}"></circle>`}
        <rect x="${p.x - 4}" y="${p.y - 4}" width="8" height="8" fill="${main ? red : ink}"></rect>
        ${p.label ? `<text x="${p.x + (p.anchor === 'end' ? -10 : 10)}" y="${p.y + (p.dy || 4)}" fill="${ink}" text-anchor="${p.anchor || 'start'}" style="font: 600 12px var(--font-body)">${p.label}</text>` : ''}
      `;
    }).join('');

    const hubRingAnim = anim ? `style="transform-origin: ${J[0]}px ${J[1]}px; animation: sk-ring 3s ease-out infinite both"` : '';

    return `
      <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: wireframe globe with Jaipur connections">
        <circle cx="200" cy="200" r="${R}" fill="none" stroke="${ink}" stroke-width="2"></circle>
        <ellipse cx="200" cy="200" rx="${(R * Math.cos(30 * Math.PI / 180)).toFixed(1)}" ry="${R}" fill="none" stroke="${soft}" stroke-width="1.2"></ellipse>
        <ellipse cx="200" cy="200" rx="${(R * Math.cos(60 * Math.PI / 180)).toFixed(1)}" ry="${R}" fill="none" stroke="${soft}" stroke-width="1.2"></ellipse>
        <line x1="200" y1="50" x2="200" y2="350" stroke="${soft}" stroke-width="1.2"></line>
        ${parallels}
        ${linksHtml}
        <rect x="${J[0] - 7}" y="${J[1] - 7}" width="14" height="14" fill="${red}"></rect>
        <circle cx="${J[0]}" cy="${J[1]}" r="14" fill="none" stroke="${red}" stroke-width="1.5" ${hubRingAnim}></circle>
        <text x="266" y="190" fill="${ink}" style="font: 700 14px var(--font-body)">Jaipur</text>
      </svg>`;
  }

  if (kind === 'chip') {
    const r = rng(seed * 17 + 2);
    let tracesHtml = '';
    for (let i = 0; i < 7; i++) {
      const x = 122 + i * 26;
      tracesHtml += `<path d="M${x} 60V${20 + (i % 3) * 8}M${x} 220V${260 - (i % 3) * 8}" stroke="${ink}" stroke-width="1.5"></path>`;
    }
    for (let i = 0; i < 5; i++) {
      const y = 82 + i * 29;
      tracesHtml += `<path d="M100 ${y}H${40 + (i % 2) * 20}M300 ${y}H${360 - (i % 2) * 20}" stroke="${ink}" stroke-width="1.5"></path>`;
    }

    let cellsHtml = '';
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        const v = r();
        const cellFill = v < 0.12 ? red : v < 0.45 ? soft : 'none';
        cellsHtml += `<rect x="${116 + i * 29}" y="${76 + j * 33}" width="24" height="26" fill="${cellFill}" stroke="${ink}" stroke-width="1"></rect>`;
      }
    }

    return `
      <svg viewBox="0 0 400 280" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration: processor chip die">
        ${tracesHtml}
        <rect x="100" y="60" width="200" height="160" fill="${paper}" stroke="${ink}" stroke-width="2"></rect>
        ${cellsHtml}
      </svg>`;
  }

  return '';
}

/**
 * Renders the Interactive Bipartite Research Map
 */
export function renderResearchMapSvg(selectedAreaId, onSelectArea, onNavigateWork) {
  const ink = 'var(--color-bg)';
  const soft = 'var(--color-neutral-700)';
  const red = 'var(--color-accent-500)';
  const muted = 'var(--color-neutral-500)';

  const rows = AREAS.flatMap(a => WORKS.filter(w => w.area === a.id));
  const wy = {};
  rows.forEach((w, i) => {
    wy[w.id] = 44 + i * 27;
  });

  const ay = {};
  AREAS.forEach(a => {
    const ys = rows.filter(w => w.area === a.id).map(w => wy[w.id]);
    ay[a.id] = ys.reduce((s, v) => s + v, 0) / ys.length;
  });

  // Lines connecting theme nodes to works
  const linesHtml = rows.map(w => {
    const on = w.area === selectedAreaId;
    const y1 = ay[w.area];
    const y2 = wy[w.id];
    const animStyle = on ? `stroke-dasharray="6 6"; style="animation: sk-flow 1s linear infinite"` : '';
    return `<path d="M258 ${y1}C370 ${y1} 360 ${y2} 468 ${y2}" fill="none" stroke="${on ? red : soft}" stroke-width="${on ? 2 : 1}" ${animStyle}></path>`;
  }).join('');

  // Themes column (left)
  const themesHtml = AREAS.map(a => {
    const on = a.id === selectedAreaId;
    const y = ay[a.id];
    return `
      <g role="button" tabindex="0" class="map-theme-btn" data-area-id="${a.id}" aria-label="Theme ${a.no}: ${a.title}" style="cursor: pointer">
        <rect x="0" y="${y - 16}" width="268" height="32" fill="transparent"></rect>
        <text x="238" y="${y + 5}" text-anchor="end" fill="${on ? ink : muted}" style="font: 800 15px var(--font-body); letter-spacing: -0.01em;">${a.title}</text>
        <rect x="245" y="${y - 7}" width="14" height="14" fill="${on ? red : 'var(--color-text)'}" stroke="${on ? red : ink}" stroke-width="2"></rect>
      </g>`;
  }).join('');

  // Works column (right)
  const worksHtml = rows.map(w => {
    const on = w.area === selectedAreaId;
    const y = wy[w.id];
    return `
      <g role="link" tabindex="0" class="map-work-btn" data-href="${w.href}" aria-label="${w.kind}: ${w.label}" style="cursor: pointer">
        <rect x="462" y="${y - 12}" width="298" height="24" fill="transparent"></rect>
        <rect x="464" y="${y - 4}" width="8" height="8" fill="${on ? red : soft}"></rect>
        <text x="484" y="${y + 4.5}" fill="${on ? ink : muted}" style="font: ${on ? '700' : '400'} 13px var(--font-body)">${w.label}</text>
        <text x="756" y="${y + 4}" text-anchor="end" fill="${on ? 'var(--color-accent-400)' : soft}" style="font: 600 10px var(--font-body); letter-spacing: .1em">${w.kind.toUpperCase()}</text>
      </g>`;
  }).join('');

  return `
    <svg viewBox="0 0 760 480" width="100%" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Research map connecting five themes to sixteen projects and publications" style="display: block; overflow: visible">
      <text x="240" y="16" text-anchor="end" fill="${muted}" style="font: 700 11px var(--font-body); letter-spacing: .12em">THEMES</text>
      <text x="486" y="16" fill="${muted}" style="font: 700 11px var(--font-body); letter-spacing: .12em">PROJECTS &amp; PUBLICATIONS</text>
      ${linesHtml}
      ${themesHtml}
      ${worksHtml}
    </svg>`;
}
