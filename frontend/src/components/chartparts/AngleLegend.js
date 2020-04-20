import React from 'react';

import { Text, LegendSvg } from '../styled';

const invScale = (scale, base) => (Math.pow(base, scale) - 1) / (base - 1);

export default function AngleLegend({maxFrequency, fill}) {
    const angles = [0, Math.PI / 4, Math.PI / 2,  3*Math.PI / 4, Math.PI];
    const lineLength = 40;
    const svgWidth = (lineLength + 20) * 2;
    const svgHeight = lineLength + 20;
    const cx = svgWidth / 2;
    const cy = lineLength + 15;

    const items = angles.map(angle => {
        return {
            x: Math.cos(angle)*lineLength,
            y: -Math.sin(angle)*lineLength,
            val: invScale(angle / Math.PI, 1000) * maxFrequency,
        };
    });
    return <>
        <Text>Pulse Frequency</Text>
        <LegendSvg width={svgWidth} height={svgHeight}>
            {
                items.map((item, i) => <React.Fragment key={i}>
                    <line
                        x1={cx}
                        y1={cy}
                        x2={cx + item.x}
                        y2={cy + item.y}
                        stroke={fill}
                        strokeWidth={2}
                        strokeOpacity={1}
                    />
                    <text
                        x={cx + item.x}
                        y={cy + item.y - 2}
                        textAnchor='middle'
                    >
                        {item.val.toFixed(2)}
                    </text>
                </React.Fragment>)
            }
            <circle cx={cx} cy={cy} r='2' fill={fill} />
        </LegendSvg>
    </>;
}