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

const defaultLength = 15;
export const minLength = 8;
export const maxLength = 25;
export const lineWidth = 2;
export const lineOpacity = .7;
export const dotRadius = 2;
const minRadius = 1.5;
const maxRadius = 4;
export const freqScale = 1000;
export const lengthScale = 25;

export default function CustomMarker({cx, cy, fill, maximums, minimums, payload}) {
    const angle = Math.PI * scale(payload.f0 / maximums.f0, freqScale);
    const lineLength = defaultLength;
    const radius = minRadius + (maxRadius - minRadius)
        * (1 - scale((payload.dist_dm - minimums.dist_dm) / (maximums.dist_dm - minimums.dist_dm), lengthScale));
    const x = Math.cos(angle) * lineLength;
    const y = -Math.sin(angle) * lineLength;
    const [clr0, clr1] = getColors(payload.types, fill);

    return <>
        <line x1={cx} y1={cy} x2={cx + lineLength} y2={cy} stroke={clr0} strokeWidth={lineWidth} strokeOpacity={lineOpacity} />
        <line x1={cx} y1={cy} x2={cx + x} y2={cy + y} stroke={clr1} strokeWidth={lineWidth} strokeOpacity={lineOpacity} />
        <circle cx={cx} cy={cy} r={radius} fill={fill} />
    </>
}