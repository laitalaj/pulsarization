import React from 'react';

import { Text, LegendSvg } from '../styled';
import { typeToColor } from './CustomMarker';

export default function ColorLegend({shownTypes, onTypeClick}) {
    const entryCount = Object.keys(typeToColor).length
    const entryStart = 10;
    const entrySize = 15;
    const rectSize = 9;
    const svgWidth = 70;
    const svgHeight = entrySize * (entryCount + 1) + entryStart;
    return <>
        <Text>Pulsar Type</Text>
        <LegendSvg width={svgWidth} height={svgHeight}>
            {
                [...Object.entries(typeToColor)
                    .sort((a, b) => a[0].localeCompare(b[0])),
                    [undefined, 'white']
                ].map((entry, i) => <g
                        key={i}
                        cursor='pointer'
                        onClick={() => onTypeClick(entry[0])}
                    >
                        <rect
                            x={0}
                            y={entryStart+i*entrySize - rectSize}
                            width={rectSize}
                            height={rectSize}
                            fill={entry[1]}
                        />
                        <text
                            x={rectSize + 4}
                            y={entryStart+i*entrySize}
                            fill={shownTypes.includes(entry[0]) ? 'white' : 'gray'}
                            >
                            {entry[0] == undefined ? 'No type set' : entry[0]}
                        </text>
                    </g>)
            }
        </LegendSvg>
    </>
}