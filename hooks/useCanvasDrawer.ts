import React, { useEffect, useRef } from 'react';

interface Props {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

interface Result {
  canvasCtx: React.RefObject<CanvasRenderingContext2D | null>;
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
}

function useCanvasDrawer({ canvasRef }: Props): Result {
  const pressRef = useRef<boolean>(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        contextRef.current = ctx;
        return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  });

  const onMouseDown = (e: MouseEvent) => {
    pressRef.current = true;
    const ctx = contextRef.current;
    if (!ctx) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#4285F4';
  };

  const onMouseMove = (e: MouseEvent) => {
    const ctx = contextRef.current;
    if (!pressRef.current || !ctx) {
      return false;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const onMouseUp = (e: MouseEvent) => {
    const ctx = contextRef.current;
    if (pressRef.current && ctx) {
      pressRef.current = false;
      ctx.closePath();
    }
  }

  
  return { canvasCtx: contextRef, onMouseDown, onMouseMove, onMouseUp };
}

export default useCanvasDrawer;