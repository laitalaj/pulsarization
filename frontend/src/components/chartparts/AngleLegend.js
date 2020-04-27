import React from 'react';

import { invScale } from '../../utils';
import { Text, LegendSvg } from '../styled';
import { startAngle, maxRadius, lineWidth, lineOpacity, dotRadius, freqScale } from './CustomMarker';

export default function AngleLegend({maxFrequency, fill}) {
    const angles = [...Array(8).keys()].map(i => i * Math.PI / 4);

    const scale = 1.8;
    const spokeSize = 1.3;
    const radius = Math.ceil(maxRadius * scale);
    const svgWidth = (radius + 40) * 2;
    const svgHeight = (radius + 20) * 2;
    const cx = svgWidth / 2;
    const cy = radius + 15;

    const items = angles.map(angle => {
        return {
            x: Math.cos(startAngle + angle)*radius,
            y: -Math.sin(startAngle + angle)*radius,
            val: invScale(angle / (2*Math.PI), freqScale) * maxFrequency,
        };
    });
    return <>
        <Text>Pulse Frequency (Hz)</Text>
        <LegendSvg width={svgWidth} height={svgHeight}>
            <path
                d={`M ${cx + items[0].x} ${cy + items[0].y} A ${radius} ${radius} 0 1 0 ${cx + items[7].x} ${cy + items[7].y}`}
                fillOpacity={0}
                stroke={fill}
                strokeWidth={lineWidth}
                strokeOpacity={lineOpacity}
            />
            {
                items.map((item, i) => {
                    var anchor;
                    if(Math.abs(item.x) < 0.001) {
                        anchor = 'middle';
                    } else if(item.x < 0) {
                        anchor = 'end';
                    } else {
                        anchor = 'start';
                    }

                    var baseline;
                    if(Math.abs(item.y) < 0.001) {
                        baseline = 'middle';
                    } else if(item.y < 0) {
                        baseline = 'baseline';
                    } else {
                        baseline = 'hanging';
                    }

                    const x2 = cx + item.x * spokeSize;
                    const y2 = cy + item.y * spokeSize;
                    return <React.Fragment key={i}>
                        <line
                            x1={cx}
                            y1={cy}
                            x2={x2}
                            y2={y2}
                            stroke={i == 0 ? fill : 'gray'}
                            strokeWidth={lineWidth}
                            strokeOpacity={i == 0 ? lineOpacity : lineOpacity / 3}
                        />
                        <text
                            x={x2}
                            y={y2}
                            textAnchor={anchor}
                            dominantBaseline={baseline}
                        >
                            {item.val.toFixed(2)}
                        </text>
                    </React.Fragment>;
                })
            }
            <circle cx={cx} cy={cy} r={Math.ceil(dotRadius * scale)} fill={fill} />
        </LegendSvg>
    </>;
}