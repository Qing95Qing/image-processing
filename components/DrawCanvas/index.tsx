import React, { useEffect, useRef, useState } from 'react';
import useDrawUtils from './hooks/useDrawUtils';

interface CanvasProps extends React.CanvasHTMLAttributes<Element> {
    isDrawingMode: boolean;
}

function DrawCanvas({ isDrawingMode, height, width, ...rest }): React.ReactElement<CanvasProps> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    getContext,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  } = useDrawUtils({ canvasRef, isDrawingMode });

  const clear = () => {
    const ctx = getContext();
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const imageUrl = canvas.toDataURL('image/jpeg');
    }
  }

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      {...rest}
    />
  );
}

export default DrawCanvas;
