import React from 'react';

import AngleLegend from './chartparts/AngleLegend';
import ColorLegend from './chartparts/ColorLegend';
import LengthLegend from './chartparts/LengthLegend';
import { LegendWrapper } from './styled';

export default function PulsarLegend({maxFrequency, maxDistance}) {
    return <LegendWrapper>
        <LengthLegend maxDistance={maxDistance} fill='white' />
        <AngleLegend maxFrequency={maxFrequency} fill='white'/>
        <ColorLegend />
    </LegendWrapper>
}