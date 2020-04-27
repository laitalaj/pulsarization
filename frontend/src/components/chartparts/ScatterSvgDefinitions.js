import React from 'react';

export default function ScatterSvgDefinitions() {
    return <defs>
        <radialGradient id='blobGrad' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
            <stop offset='0%' style={{stopColor: 'white', stopOpacity:1}} />
            <stop offset='100%' style={{stopColor: 'white', stopOpacity:0}} />
        </radialGradient>
    </defs>
}