import React from 'react';

import AngleLegend from './chartparts/AngleLegend';
import { LegendWrapper } from './styled';

export default function PulsarLegend({maxFrequency}) {
    return <LegendWrapper>
        <AngleLegend maxFrequency={maxFrequency} fill='white'/>
    </LegendWrapper>
}