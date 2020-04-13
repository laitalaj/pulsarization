import React from 'react';

const scale = frac => {
    const base = 1000;
    return Math.log(1 + (base - 1) * frac) / Math.log(base);
}

export default function CustomMarker(props) {
    const {cx, cy, fill, maxF0, payload} = props;
    const angle = Math.PI * scale(payload.f0 / maxF0);
    const length = 10;
    const x = Math.cos(angle) * length;
    const y = -Math.sin(angle) * length;
    const style = {
        stroke: fill,
        strokeWidth: 1,
    };
    return <>
        <circle cx={cx} cy={cy} r='2' fill={fill} />
        <line x1={cx} y1={cy} x2={cx + length} y2={cy} style={style} />
        <line x1={cx} y1={cy} x2={cx + x} y2={cy + y} style={style} />
    </>
}