/** @param {number} scrollTop @param {number} scrollHeight @param {number} clientHeight */
export function getScrollProgress(scrollTop, scrollHeight, clientHeight) {
  const distance = scrollHeight - clientHeight;
  if (!Number.isFinite(distance) || !Number.isFinite(scrollTop) || distance <= 0) return 0;
  return Math.round(Math.min(1, Math.max(0, scrollTop / distance)) * 100);
}
