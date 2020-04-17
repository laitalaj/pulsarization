import React from 'react';

export default function ChartBrush({brushing, point1, point2}) {
    if(!brushing) return null;

    const x = Math.min(point1.chartX, point2.chartX);
    const y = Math.min(point1.chartY, point2.chartY);
    const w = Math.abs(point1.chartX - point2.chartX);
    const h = Math.abs(point1.chartY - point2.chartY);
    return <rect x={x} y={y} width={w} height={h} stroke='white' />;
}