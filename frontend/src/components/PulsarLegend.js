import React from 'react';

import AngleLegend from './chartparts/AngleLegend';
import ColorLegend from './chartparts/ColorLegend';
import LengthLegend from './chartparts/LengthLegend';
import FilterSlider from './chartparts/FilterSlider';
import { LegendWrapper } from './styled';

export default function PulsarLegend(
    {maxFrequency, maxDistance, shownTypes, onFreqFilter, onDistFilter, onTypeFilter}
    ) {
    return <LegendWrapper>
        <LengthLegend maxDistance={maxDistance} fill='white' />
        <FilterSlider domain={[0, maxDistance]} values={[0, maxDistance]} onChange={onDistFilter}/>
        <AngleLegend maxFrequency={maxFrequency} fill='white'/>
        <FilterSlider domain={[0, maxFrequency]} values={[0, maxFrequency]} onChange={onFreqFilter}/>
        <ColorLegend shownTypes={shownTypes} onTypeClick={onTypeFilter} />
    </LegendWrapper>
}