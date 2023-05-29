import React, { useEffect, useRef } from 'react';

interface CanvasProps extends React.CanvasHTMLAttributes<Element> {
    imageUrl?: string;
}

function ImageCanvas({ imageUrl, height, width, ...rest }): React.ReactElement<CanvasProps> {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      contextRef.current = canvas.getContext('2d');
    }
  }, []);

  useEffect(() => {
    if (imageUrl) {
      addImage(imageUrl);
    } else {
      removeImage();
    }
  }, [imageUrl]);

  function addImage(imageUrl: string) {
    const ctx = contextRef.current;
    if (ctx && imageUrl) {
      const imgEl = new Image();
      imgEl.src = imageUrl;
      imgEl.onload = () => {
        ctx.drawImage(
          imgEl,
          0,
          0,
          imgEl.naturalWidth,
          imgEl.naturalHeight,
          0,
          0,
          width,
          height
        );
      };
    }
  }

  function removeImage() {
    const ctx = contextRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      {...rest}
    />
  );
}

export default ImageCanvas;
