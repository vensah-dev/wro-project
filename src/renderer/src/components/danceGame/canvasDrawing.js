// ============================================================
// CANVAS DRAWING
// ============================================================
import { SILHOUETTE_BONES } from './config';

export function drawGuideSilhouette(canvas, targetMove) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  if (!targetMove) return;

  const t = targetMove.target;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  SILHOUETTE_BONES.forEach(([a, b]) => {
    const pa = t[a], pb = t[b];
    ctx.beginPath();
    ctx.moveTo(pa.x * width, pa.y * height);
    ctx.lineTo(pb.x * width, pb.y * height);
    ctx.stroke();
  });

  ctx.fillStyle = '#ffd23f';
  Object.values(t).forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x * width, p.y * height, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  const midX = (t.leftShoulder.x + t.rightShoulder.x) / 2;
  const headY = t.leftShoulder.y - 0.14;
  ctx.beginPath();
  ctx.arc(midX * width, headY * height, height * 0.07, 0, Math.PI * 2);
  ctx.stroke();
}
