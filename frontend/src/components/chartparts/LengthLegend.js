import React from 'react';

import { invScale } from '../../utils';
import { Text, LegendSvg } from '../styled';
import { minRadius, maxRadius, lineWidth, lineOpacity, radiusScale } from './CustomMarker';

export default function LengthLegend({maxDistance, fill}) {
    const lengthCount = 5;
    const lengths = [...Array(lengthCount).keys()].map(
        i => minRadius + i / (lengthCount - 1) * (maxRadius - minRadius)
    );
    const entryStart = 15;
    const entrySize = 15;
    const svgWidth = maxRadius + 30;
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
                            {(invScale(1 - (l - minRadius) / (maxRadius - minRadius), radiusScale)*maxDistance).toFixed(2)}
                        </text>
                    </React.Fragment>
                })
            }
        </LegendSvg>
    </>;
}