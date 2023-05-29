import React, { useEffect, useRef, useState } from 'react';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isDrawingMode: boolean;
}

interface Result {
  getContext: () => CanvasRenderingContext2D;
  onMouseDown: React.MouseEventHandler;
  onMouseMove: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
}

function useDrawUtils({ canvasRef, isDrawingMode }: Props): Result {
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
  }, []);

  const checkIsDrawing = () => {
    return pressRef.current && isDrawingMode;
  };

  const getOffsetXY = (e: React.MouseEvent) => {
    const { nativeEvent } = e;
    return [nativeEvent.offsetX, nativeEvent.offsetY];
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const ctx = contextRef.current;
    if (!ctx) {
      return;
    }
    pressRef.current = true;
    const [x, y] = getOffsetXY(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#4285F4';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const ctx = contextRef.current;
    if (!checkIsDrawing() || !ctx) {
      return;
    }
    const [x, y] = getOffsetXY(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const onMouseUp = (e: React.MouseEvent) => {
    const ctx = contextRef.current;
    if (ctx && checkIsDrawing()) {
      ctx.closePath();
      pressRef.current = false;
    }
  };

  const saveImage = () => {
    const ctx = contextRef.current;
    if (ctx) {
      
    }
  }

  const getContext = () => {
    return contextRef.current;
  }

  return {
    getContext,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}

export default useDrawUtils;
