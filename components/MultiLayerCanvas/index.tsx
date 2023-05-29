import React from 'react';
import ImageCanvas from '../ImageCanvas';
import DrawCanvas from '../DrawCanvas';

interface Props extends React.CanvasHTMLAttributes<Element> {
    imageUrl: string;
}

function MultiLayerCanvas({ imageUrl, height, width }) {
  return (
    <div className="canvas-container">
      <ImageCanvas className="image-canvas" imageUrl={imageUrl} height={height} width={width} />
      <DrawCanvas className="draw-canvas" isDrawingMode={true} width={width} height={height} />
    </div>
  );
}

export default MultiLayerCanvas;
