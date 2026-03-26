import { LayoutStyle, TemplateType } from './store';

export const EXPORT_SIZE = 2160;

export async function exportToCanvas(
  template: TemplateType,
  images: (string | null)[],
  style: LayoutStyle
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = EXPORT_SIZE;
  canvas.height = EXPORT_SIZE;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, EXPORT_SIZE, EXPORT_SIZE);

  const scale = EXPORT_SIZE / 400; // Assuming 400px is our base UI size for calculations
  const spacing = style.spacing * scale;
  const borderWidth = style.borderWidth * scale;
  const cornerRadius = style.cornerRadius * scale;

  const drawImage = async (imgUrl: string | null, x: number, y: number, w: number, h: number) => {
    if (!imgUrl) {
      ctx.fillStyle = '#f3e2ff';
      roundRect(ctx, x, y, w, h, cornerRadius);
      ctx.fill();
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imgUrl;
    });

    ctx.save();
    roundRect(ctx, x, y, w, h, cornerRadius);
    ctx.clip();

    // Object-fit: cover logic
    const imgAspect = img.width / img.height;
    const targetAspect = w / h;
    let drawW, drawH, drawX, drawY;

    if (imgAspect > targetAspect) {
      drawH = h;
      drawW = h * imgAspect;
      drawX = x - (drawW - w) / 2;
      drawY = y;
    } else {
      drawW = w;
      drawH = w / imgAspect;
      drawX = x;
      drawY = y - (drawH - h) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  };

  const contentSize = EXPORT_SIZE - spacing * 2;
  const startX = spacing;
  const startY = spacing;

  if (template === '3-image') {
    // 3-Image Layout: 1 Large Left, 2 Small Right
    const largeW = (contentSize - borderWidth) * (2 / 3);
    const smallW = contentSize - largeW - borderWidth;
    const smallH = (contentSize - borderWidth) / 2;

    await drawImage(images[0], startX, startY, largeW, contentSize);
    await drawImage(images[1], startX + largeW + borderWidth, startY, smallW, smallH);
    await drawImage(images[2], startX + largeW + borderWidth, startY + smallH + borderWidth, smallW, smallH);
  } else {
    // 4-Image Layout: 2x2 Grid
    const itemSize = (contentSize - borderWidth) / 2;
    await drawImage(images[0], startX, startY, itemSize, itemSize);
    await drawImage(images[1], startX + itemSize + borderWidth, startY, itemSize, itemSize);
    await drawImage(images[2], startX, startY + itemSize + borderWidth, itemSize, itemSize);
    await drawImage(images[3], startX + itemSize + borderWidth, startY + itemSize + borderWidth, itemSize, itemSize);
  }

  return canvas.toDataURL('image/png');
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}
