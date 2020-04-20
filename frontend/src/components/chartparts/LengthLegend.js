import React from 'react';

import { invScale } from '../../utils';
import { Text, LegendSvg } from '../styled';
import { minLength, maxLength, lineWidth, lineOpacity, lengthScale } from './CustomMarker';

export default function LengthLegend({maxDistance, fill}) {
    const lengthCount = 5;
    const lengths = [...Array(lengthCount).keys()].map(
        i => minLength + i / (lengthCount - 1) * (maxLength - minLength)
    );
    const entryStart = 15;
    const entrySize = 15;
    const svgWidth = maxLength + 30;
    const svgHeight = entrySize * lengthCount + entryStart;

    return <>
        <Text>Pulsar Distance (kpc)</Text>
        <LegendSvg width={svgWidth} height={svgHeight}>
            {
                lengths.map((l, i) => {
                    const y = entryStart + i * entrySize;
                    return <React.Fragment key={i}>
                        <line
                            x1={0}
                            y1={y}
                            x2={l}
                            y2={y}
                            stroke={fill}
                            strokeWidth={lineWidth}
                            strokeOpacity={lineOpacity}
                        />
                        <text x={l + 2} y={y} dominantBaseline='middle'>
                            {(invScale(1 - (l - minLength) / (maxLength - minLength), lengthScale)*maxDistance).toFixed(2)}
                        </text>
                    </React.Fragment>
                })
            }
        </LegendSvg>
    </>;
}