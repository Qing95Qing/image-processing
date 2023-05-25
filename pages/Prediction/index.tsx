import React, { Fragment, useEffect, useRef, useState, useMemo } from 'react';
import './style/index.css';

const PANEL_SIZE = 400;

function Prediction() {
  const inputRef = useRef(null);
  const pressRef = useRef(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    getCanvasContext();
  }, []);

  function getCanvasContext() {
    if (!canvasRef.current) {
      return '';
    }
    contextRef.current = canvasRef.current.getContext('2d');
  }

  const handleImageChange = () => {
    const ctx = contextRef.current;
    if (ctx && inputRef.current?.files?.length > 0) {
      const imgEl = new Image();
      imgEl.src = URL.createObjectURL(inputRef.current.files[0]);
      imgEl.onload = () => {
        console.log(imgEl.naturalWidth, imgEl.naturalHeight);
        ctx.drawImage(
          imgEl,
          0,
          0,
          imgEl.naturalWidth,
          imgEl.naturalHeight,
          0,
          0,
          PANEL_SIZE,
          PANEL_SIZE
        );
      };
    }
  };

  const handleMouseDown = (e) => {
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

  const handleMouseMove = (e) => {
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

  const handleMouseUp = (e) => {
    const ctx = contextRef.current;
    if (pressRef.current && ctx) {
      pressRef.current = false;
      ctx.closePath();
    }
  }

  return (
    <div className="pred-container">
      <input
        type="file"
        id="picPicker"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageChange}
        ref={inputRef}
      />
      <div style={{ margin: '40px 100px' }}>
        <canvas
          id="img-canvas"
          width={PANEL_SIZE}
          height={PANEL_SIZE}
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: '1px solid green'}}
        />
      </div>
    </div>
  );
}

export default Prediction;
