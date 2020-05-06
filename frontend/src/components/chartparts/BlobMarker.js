import React from 'react';

function BlobCorner(
    {id, corner, left, right, width, height, tx, ty, r}
    ) {
    const cornerArc = `M 0 ${height}`
        + `A ${width} ${height} 0 0 1 ${width} 0`;
    const cornerFill = cornerArc
        + `V ${height}`
        + `H ${-width}`;
    const clipPathId = `clipper-${id}`;
    const innerTransform = `translate(${tx},${ty}) rotate(${r})`
    return <g transform={`translate(${tx},${ty})`}>
        <clipPath id={clipPathId} transform={innerTransform}>
            <path d={cornerFill} />
        </clipPath>
        <rect
            x='0' y='0'
            width={width} height={height}
            fill='url(#blobPattern)'
            clipPath={corner ? null : `url(#${clipPathId})`}
        />
        {corner
            ? left && right
                ? null
                : <line
                    x1={0}
                    y1={0}
                    x2={left ? 0 : width}
                    y2={right ? 0 : height}
                    stroke='white'
                    strokeWidth='3'
                    transform={innerTransform}
                />
            : <path transform={innerTransform} d={cornerArc} fillOpacity='0' stroke='white' strokeWidth='3' />
        }
        {corner}
    </g>
}

export default function BlobMarker({cx, cy, xAxis, yAxis, payload}) {
    const id = `blob-${cx}-${cy}`;
    const padding = 1;
    const translateDampening = 0;
    const xRange = payload.xRange.map(xAxis.scale);
    const yRange = payload.yRange.map(yAxis.scale);
    const rx = (xRange[1] - xRange[0])/2 + padding;
    const ry = (yRange[0] - yRange[1])/2 + padding;
    const n = payload.neighbors;
    return <g transform={`translate(${xRange[0]},${yRange[1]})`}>
        <BlobCorner
            id={`${id}-topleft`}
            corner={n.top || n.left}
            left={n.top}
            right={n.left}
            width={rx}
            height={ry}
            tx={0}
            ty={0}
            r={0}
        />
        <BlobCorner
            id={`${id}-topright`}
            corner={n.top || n.right}
            left={n.right}
            right={n.top}
            width={ry}
            height={rx}
            tx={rx - translateDampening}
            ty={0}
            r={90}
        />
        <BlobCorner
            id={`${id}-bottomleft`}
            corner={n.bottom || n.left}
            left={n.left}
            right={n.bottom}
            width={ry}
            height={rx}
            tx={0}
            ty={ry - translateDampening}
            r={-90}
        />
        <BlobCorner
            id={`${id}-bottomright`}
            corner={n.bottom || n.right}
            left={n.bottom}
            right={n.right}
            width={rx}
            height={ry}
            tx={rx - translateDampening}
            ty={ry - translateDampening}
            r={180}
        />
    </g>
}