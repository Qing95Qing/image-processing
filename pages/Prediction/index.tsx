import React, { Fragment, useEffect, useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import './style/index.css';
import MultiLayerCanvas from '../../components/MultiLayerCanvas';

const PANE_SIZE = 400;

function Prediction() {
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef(null);

  const handleImageChange = () => {
    if (inputRef.current?.files?.length > 0) {
      const src = URL.createObjectURL(inputRef.current.files[0]);
      console.log(src, 'src')
      setImageUrl(src);
    }
  };

  return (
    <div className="pred-container">
      <div className="tool-bar">
        <input
          type="file"
          id="picPicker"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageChange}
          ref={inputRef}
        />
        <button className="op-button" onClick={() => setImageUrl('')}>
          清除图片
        </button>
        <button className="op-button" onClick={console.log}>
          保存图片
        </button>
      </div>
      <div className="canvas-pane">
        <MultiLayerCanvas
          imageUrl={imageUrl}
          width={PANE_SIZE}
          height={PANE_SIZE}
        />
      </div>
    </div>
  );
}

export default Prediction;
