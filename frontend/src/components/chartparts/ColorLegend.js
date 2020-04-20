import React from 'react';

import { Text, LegendSvg } from '../styled';
import { typeToColor } from './CustomMarker';

export default function ColorLegend() {
    const entryCount = Object.keys(typeToColor).length
    const entryStart = 10;
    const entrySize = 15;
    const rectSize = 9;
    const svgWidth = 60;
    const svgHeight = entrySize * entryCount + entryStart;
    return <>
        <Text>Pulsar Type</Text>
        <LegendSvg width={svgWidth} height={svgHeight}>
            {
                Object.entries(typeToColor)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((entry, i) => <React.Fragment key={i}>
                        <rect
                            x={0}
                            y={entryStart+i*entrySize - rectSize}
                            width={rectSize}
                            height={rectSize}
                            fill={entry[1]}
                        />
                        <text x={rectSize + 4} y={entryStart+i*entrySize}>
                            {entry[0]}
                        </text>
                    </React.Fragment>)
            }
        </LegendSvg>
    </>
}