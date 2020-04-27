import React from 'react';

const scale = (frac, base) => {
    return Math.log(1 + (base - 1) * frac) / Math.log(base);
}

export const typeToColor = {
    'RRAT': '#00b100',
    'RRAT(?)': '#7aae7d',
    'XINS': '#0062ba',
    'AXP': '#d6007e',
    'AXP(?)': '#cc91b3',
    'HE': '#ff5800',
    'NRAD': '#fbff00',
};

const getColors = (types, defaultColor) => {
    if (types.length == 0) {
        return [defaultColor, defaultColor];
    }
    if (types.length == 1) {
        const clr = typeToColor[types[0]];
        return [clr, clr];
    }
    if (types.length > 2) {
        console.warn(`More than 2 types: ${types}`)
    }
    return [typeToColor[types[0]], typeToColor[types[1]]]
}

export const minRadius = 5;
export const maxRadius = 12;
export const lineWidth = 2;
export const lineOpacity = .7;
export const dotRadius = 2;
export const freqScale = 1000;
export const radiusScale = 25;

export default function CustomMarker({cx, cy, fill, maximums, minimums, payload}) {
    const startAngle = 3*Math.PI / 2;
    const angle = 2 * Math.PI * scale(payload.f0 / maximums.f0, freqScale);
    const arcRadius = minRadius + (maxRadius - minRadius)
        * (1 - scale((payload.dist_dm - minimums.dist_dm) / (maximums.dist_dm - minimums.dist_dm), radiusScale));
    const x = Math.cos(startAngle + angle) * arcRadius;
    const y = -Math.sin(startAngle + angle) * arcRadius;
    const [clr0, clr1] = getColors(payload.types, fill);

    return <>
        <line x1={cx} y1={cy} x2={cx} y2={cy + arcRadius} stroke={clr0} strokeWidth={lineWidth} strokeOpacity={lineOpacity} />
        <path
            d={`M ${cx} ${cy + arcRadius} A ${arcRadius} ${arcRadius} 0 ${angle > Math.PI ? '1' : '0'} 0 ${cx + x} ${cy + y}`}
            fillOpacity={0}
            stroke={clr0}
            strokeWidth={lineWidth}
            strokeOpacity={lineOpacity}
        />
        <circle cx={cx} cy={cy} r={dotRadius} fill={clr1} />
    </>
}