import React from 'react';

export default function ScatterSvgDefinitions() {
    return <defs>
        <radialGradient id='blobGrad' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
            <stop offset='0%' style={{stopColor: 'white', stopOpacity:1}} />
            <stop offset='100%' style={{stopColor: 'white', stopOpacity:0}} />
        </radialGradient>
        <pattern id="blobPattern" width="16" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke='white' strokeWidth='3' />
        </pattern>
    </defs>
}