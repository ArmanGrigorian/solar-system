/**
 * Takes a base64 image and draws a 10x10 coordinate grid over it.
 * Resizes the image so its maximum dimension is 1024px to save on AI tokens and ensure consistent scale.
 * 
 * @param base64 - The original base64 encoded image string.
 * @returns A promise that resolves to the new annotated base64 image string.
 */

export async function drawGridOnImage(base64: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions (max 1024px)
      const MAX_DIMENSION = 1024;
      let width = img.width;
      let height = img.height;
      
      if (width > height && width > MAX_DIMENSION) {
        height = Math.round(height * (MAX_DIMENSION / width));
        width = MAX_DIMENSION;
      } else if (height > MAX_DIMENSION) {
        width = Math.round(width * (MAX_DIMENSION / height));
        height = MAX_DIMENSION;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Failed to get 2d context'));
      }

      // Draw original image
      ctx.drawImage(img, 0, 0, width, height);

      // Setup Grid Style
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)'; // Bright red, semi-transparent
      ctx.lineWidth = 2;
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const gridSize = 10;
      
      // Draw Grid
      for (let i = 0; i <= gridSize; i++) {
        const percent = i / gridSize;
        const x = width * percent;
        const y = height * percent;
        const label = percent.toFixed(1);

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Draw Labels at the edges
        if (i > 0 && i < gridSize) {
          // X-axis label (top and bottom)
          ctx.fillText(label, x, 15);
          ctx.fillText(label, x, height - 15);
          
          // Y-axis label (left and right)
          ctx.fillText(label, 20, y);
          ctx.fillText(label, width - 20, y);
        }
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      resolve(dataUrl.split(',')[1]);
    };
    img.onerror = () => reject(new Error('Failed to load image for grid overlay'));
    
    if (!base64.startsWith('data:')) {
      img.src = `data:image/jpeg;base64,${base64}`;
    } else {
      img.src = base64;
    }
  });
}
