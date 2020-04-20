import React from 'react';

import { invScale } from '../../utils';
import { Text, LegendSvg } from '../styled';
import { maxLength, lineWidth, lineOpacity, dotRadius, freqScale } from './CustomMarker';

export default function AngleLegend({maxFrequency, fill}) {
    const angles = [0, Math.PI / 4, Math.PI / 2,  3*Math.PI / 4, Math.PI];
    const scale = 1.4;
    const lineLength = Math.ceil(maxLength * scale);
    const svgWidth = (lineLength + 20) * 2;
    const svgHeight = lineLength + 20;
    const cx = svgWidth / 2;
    const cy = lineLength + 15;

    const items = angles.map(angle => {
        return {
            x: Math.cos(angle)*lineLength,
            y: -Math.sin(angle)*lineLength,
            val: invScale(angle / Math.PI, freqScale) * maxFrequency,
        };
    });
    return <>
        <Text>Pulse Frequency (Hz)</Text>
        <LegendSvg width={svgWidth} height={svgHeight}>
            {
                items.map((item, i) => <React.Fragment key={i}>
                    <line
                        x1={cx}
                        y1={cy}
                        x2={cx + item.x}
                        y2={cy + item.y}
                        stroke={fill}
                        strokeWidth={lineWidth}
                        strokeOpacity={lineOpacity}
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
            <circle cx={cx} cy={cy} r={Math.ceil(dotRadius * scale)} fill={fill} />
        </LegendSvg>
    </>;
}