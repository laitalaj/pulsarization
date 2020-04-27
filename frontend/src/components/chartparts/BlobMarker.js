import React from 'react';

export default function BlobMarker({cx, cy, xAxis, yAxis, payload}) {
    const padding = 5;
    const xRange = payload.xRange.map(xAxis.scale);
    const yRange = payload.yRange.map(yAxis.scale);
    return <ellipse
        cx={cx} cy={cy}
        rx={(xRange[1] - xRange[0])/2 + padding}
        ry={(yRange[0] - yRange[1])/2 + padding}
        fill='url(#blobGrad)'
    />
}