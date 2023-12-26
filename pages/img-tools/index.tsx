
import React, { useRef, useState } from 'react';
import './style/index.scss';

const HEIGHT = 400;

function ImageTools() {
    const [imgUrl, setImgUrl] = useState('');

    const imgCanvas = useRef(null);

    const getColorMode = (rgbaData: any[], _idx: number) => {
        let r = rgbaData[_idx], g = rgbaData[_idx], b = rgbaData[_idx];
        // 白色为1
        return r === 255 && g === 255 && b === 255 ? 1 : 0;
    }



    const isEdge = (rgbaData: any[], index: number, width: number): boolean => {
        const top = getColorMode(rgbaData, index - (4 * width));
        const bottom = getColorMode(rgbaData, index + (4 * width));
        const left = getColorMode(rgbaData, index - 4);
        const right = getColorMode(rgbaData, index + 4);
        const current = getColorMode(rgbaData, index);
        return ((bottom ^ current) | (left ^ current) | (right ^ current) | (top ^ current)) > 0
    }

    const renderPixel = (rgbaData: any[], _idx: number) => {
        if (_idx < 0) return;
        rgbaData[_idx] = 3;
        rgbaData[_idx + 1] = 216;
        rgbaData[_idx + 2] = 144;
        rgbaData[_idx + 3] = 255;
    }

    const renderTimes4 = (rgbaData: any[], _idx: number, width: number) => {
        renderPixel(rgbaData, _idx - (4 * width));
        renderPixel(rgbaData, _idx + (4 * width));
        renderPixel(rgbaData, _idx - 4);
        renderPixel(rgbaData, _idx + 4);
    }

    const analyzeImage = () => {
        if (!imgCanvas.current || !imgUrl) return;
        const ctx = imgCanvas.current.getContext('2d');
        const imgEl = new Image();
        imgEl.src = imgUrl;
        imgEl.crossOrigin = 'anonymous';
        imgEl.onload = () => {
            const scale = imgEl.naturalHeight / HEIGHT;
            const renderWidth = imgEl.naturalWidth / scale;
            imgCanvas.current.width = renderWidth;
            imgCanvas.current.height = HEIGHT;
            ctx.drawImage(imgEl, 0, 0, imgEl.naturalWidth, imgEl.naturalHeight, 0, 0, renderWidth, HEIGHT);
            const imgData = ctx.getImageData(0, 0, imgCanvas.current.width, imgCanvas.current.height);
            const rgbaData = imgData.data;
            console.log(rgbaData);
            const edgeList = [];
            for (let i = 0; i < rgbaData.length; i = i + 4) {
                if (isEdge(rgbaData, i, imgCanvas.current.width)) {
                    const order = i / 4;
                    edgeList.push([Math.floor(order / renderWidth), order % renderWidth]);
                    // console.log('有白色区域');
                    // rgbaData[i] = 255;
                    // rgbaData[i + 1] = 255;
                    // rgbaData[i + 2] = 255;
                    // rgbaData[i + 3] = 255;
                } else {
                    // rgbaData[i] = 0;
                    // rgbaData[i + 1] = 0;
                    // rgbaData[i + 2] = 0;
                    // rgbaData[i + 3] = 255;
                }
            }
            // ctx.putImageData(imgData, 0, 0);
            console.log(edgeList, 'edgeList')
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "red";
            ctx.moveTo(edgeList[0][1], edgeList[0][0]);
            for (let j = 1; j < edgeList.length; j = j+1) {
                const item = edgeList[j];
                ctx.lineTo(item[1], item[0]);
                ctx.stroke()
            }
        }
    }

    return (
        <div className='img-tools'>
            <div>
                <input type="file" placeholder='请上传图片' accept='image/jpeg,image/png' onChange={e => setImgUrl(URL.createObjectURL(e.target.files[0]))}/>
            </div>
            <div className='action-bar'>
                <button onClick={() => setImgUrl('')}>清除图片</button>
                <button onClick={analyzeImage}>分析图片</button>
            </div>
            <div className='result'>
                <div>
                    <div>原图：</div>
                    {imgUrl && <img src={imgUrl} height={400} />}
                </div>
                <div>
                    <div>Canvas：</div>
                    <canvas ref={imgCanvas} height={400} />
                </div>
                </div>
        </div>
    )
}

export default ImageTools;