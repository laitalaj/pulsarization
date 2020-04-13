import React from 'react';

const scale = (frac, base) => {
    return Math.log(1 + (base - 1) * frac) / Math.log(base);
}

const typeToColor = {
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

const minLength = 10;
const maxLength = 25;
const lineWidth = 2;
const lineOpacity = .7;

export default function CustomMarker(props) {
    const {cx, cy, fill, maximums, minimums, payload} = props;
    const angle = Math.PI * scale(payload.f0 / maximums.f0, 1000);
    const length = minLength + (maxLength - minLength)
        * scale(1 - (payload.dist_dm - minimums.dist_dm) / (maximums.dist_dm - minimums.dist_dm), 50_000_000_000_000);
    const x = Math.cos(angle) * length;
    const y = -Math.sin(angle) * length;
    const [clr0, clr1] = getColors(payload.types, fill);
    return <>
        <line x1={cx} y1={cy} x2={cx + length} y2={cy} stroke={clr0} strokeWidth={lineWidth} strokeOpacity={lineOpacity} />
        <line x1={cx} y1={cy} x2={cx + x} y2={cy + y} stroke={clr1} strokeWidth={lineWidth} strokeOpacity={lineOpacity} />
        <circle cx={cx} cy={cy} r='2' fill={fill} />
    </>
}