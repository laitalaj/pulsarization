import React from 'react';

const scale = (frac, base) => {
    return Math.log(1 + (base - 1) * frac) / Math.log(base);
}

const minLength = 10;
const maxLength = 25;

export default function CustomMarker(props) {
    const {cx, cy, fill, maximums, minimums, payload} = props;
    const angle = Math.PI * scale(payload.f0 / maximums.f0, 1000);
    const length = minLength + (maxLength - minLength)
        * scale(1 - (payload.dist_dm - minimums.dist_dm) / (maximums.dist_dm - minimums.dist_dm), 50_000_000_000_000);
    const x = Math.cos(angle) * length;
    const y = -Math.sin(angle) * length;
    const style = {
        stroke: fill,
        strokeWidth: 1,
        strokeOpacity: .75,
    };
    return <>
        <circle cx={cx} cy={cy} r='2' fill={fill} />
        <line x1={cx} y1={cy} x2={cx + length} y2={cy} style={style} />
        <line x1={cx} y1={cy} x2={cx + x} y2={cy + y} style={style} />
    </>
}