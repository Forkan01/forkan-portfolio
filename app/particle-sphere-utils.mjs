export const SECTION_COLORS = [
  [40, 104, 220], // About
  [116, 79, 207], // Projects
  [13, 143, 112], // Skills
  [190, 116, 15], // Experience
  [204, 59, 83], // Contact
];

/** @param {number} count */
export function createSpherePoints(count) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({length: count}, (_, i) => {
    const y = 1 - 2 * (i + 0.5) / count;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    return { x: radius * Math.cos(i * goldenAngle), y, z: radius * Math.sin(i * goldenAngle) };
  });
}

/** @param {{x:number,y:number,z:number}[]} points */
export function createSphereEdges(points) {
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i], b = points[j];
      if ((a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2 < 0.35**2) edges.push([i,j]);
    }
  }
  return edges;
}

/** @param {number} scrollTop @param {number} scrollHeight @param {number} viewport */
export function scrollFraction(scrollTop, scrollHeight, viewport) {
  const distance = scrollHeight - viewport;
  return Number.isFinite(scrollTop) && Number.isFinite(distance) && distance > 0
    ? Math.min(1, Math.max(0, scrollTop / distance))
    : 0;
}

/** @param {number[]} sectionTops @param {number} activationY @param {boolean} atBottom */
export function activeSectionIndex(sectionTops, activationY, atBottom) {
  if (atBottom) return Math.max(0, sectionTops.length - 1);
  let active = 0;
  for (let i = 0; i < sectionTops.length; i++) {
    if (sectionTops[i] <= activationY) active = i;
  }
  return active;
}
