import React from 'react';

import { invScale } from '../../utils';
import { Text, LegendSvg } from '../styled';
import { minRadius, maxRadius, lineWidth, lineOpacity, radiusScale } from './CustomMarker';

export default function LengthLegend({maxDistance, fill}) {
    const lengthCount = 5;
    const lengths = [...Array(lengthCount).keys()].reverse().map(
        i => minRadius + i / (lengthCount - 1) * (maxRadius - minRadius)
    );
    const entryStart = 15;
    const entrySize = 33;
    const svgWidth = entrySize * lengthCount + entryStart;
    const svgHeight = maxRadius + 15;

    return <>
        <Text>Pulsar Distance (kpc)</Text>
        <LegendSvg width={svgWidth} height={svgHeight}>
            {
                lengths.map((l, i) => {
                    const x = entryStart + i * entrySize;
                    return <React.Fragment key={i}>
                        <line
                            x1={x}
                            y1={0}
                            x2={x}
                            y2={l}
                            stroke={fill}
                            strokeWidth={lineWidth}
                            strokeOpacity={lineOpacity}
                        />
                        <text x={x} y={l + 2} dominantBaseline='hanging' textAnchor='middle'>
                            {(invScale(1 - (l - minRadius) / (maxRadius - minRadius), radiusScale)*maxDistance).toFixed(1)}
                        </text>
                    </React.Fragment>
                })
            }
        </LegendSvg>
    </>;
}