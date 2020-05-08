import React from 'react';

const getCornerArc = (width, height) => `M 0 ${height}`
    + `A ${width} ${height} 0 0 1 ${width} 0`;

const getCornerArea = (width, height) => getCornerArc(width, height)
    + `V ${height}`
    + `H ${-width}`;

const getCornerTransform = (tx, ty, r)  => `translate(${tx*2},${ty*2}) rotate(${r})`

function BlobCornerLine(
    {left, right, width, height, tx, ty, r}
) {
    const strokeColor = 'white';
    const strokeWidth = 3;
    const transform = getCornerTransform(tx, ty, r);
    return left || right
        ? left && right
            ? null
            : <line
                x1={0}
                y1={0}
                x2={left ? 0 : width}
                y2={right ? 0 : height}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                transform={transform}
            />
        : <path
            transform={transform}
            d={getCornerArc(width, height)}
            fill='none'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
        />;
}

function BlobCornerArea(
    {left, right, width, height, tx, ty, r}
) {
    const overflow = 5
    return left || right
        ? <rect x={tx} y={ty} width={width+overflow} height={height+overflow} />
        : <path d={getCornerArea(width, height)} transform={getCornerTransform(tx, ty, r)} />
}

export default function BlobMarker({cx, cy, xAxis, yAxis, payload}) {
    const clipPathId = `blob-${cx}-${cy}-clip`;
    const padding = 1;
    const xRange = payload.xRange.map(xAxis.scale);
    const yRange = payload.yRange.map(yAxis.scale);
    const rx = (xRange[1] - xRange[0])/2 + padding;
    const ry = (yRange[0] - yRange[1])/2 + padding;
    const n = payload.neighbors;
    const corners = [
        {left: n.top, right: n.left, width: rx, height: ry, tx: 0, ty: 0, r: 0},
        {left: n.right, right: n.top, width: ry, height: rx, tx: rx, ty: 0, r: 90},
        {left: n.left, right: n.bottom, width: ry, height: rx, tx: 0, ty: ry, r: -90},
        {left: n.bottom, right: n.right, width: rx, height: ry, tx: rx, ty: ry, r: 180},
    ]
    return <g transform={`translate(${xRange[0]},${yRange[1]})`}>
        <clipPath id={clipPathId}>
            {corners.map((c, i) => <BlobCornerArea key={i} {...c} />)}
        </clipPath>
        <rect
            x='0' y='0'
            width={rx*2} height={ry*2}
            fill='url(#blobPattern)'
            clipPath={`url(#${clipPathId})`}
        />
        {corners.map((c, i) => <BlobCornerLine key={i} {...c} />)}
    </g>
}