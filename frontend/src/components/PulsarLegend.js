import React from 'react';

import AngleLegend from './chartparts/AngleLegend';
import ColorLegend from './chartparts/ColorLegend';
import LengthLegend from './chartparts/LengthLegend';
import FilterSlider from './chartparts/FilterSlider';
import TableToggle from './chartparts/TableToggle';
import { LegendWrapper } from './styled';

export default function PulsarLegend(
    {maxFrequency, maxDistance, shownTypes, tableOn, onTableToggle, onFreqFilter, onDistFilter, onTypeFilter}
    ) {
    return <LegendWrapper>
        <TableToggle tableOn={tableOn} onChange={onTableToggle} />
        <LengthLegend maxDistance={maxDistance} fill='white' />
        <FilterSlider domain={[0, maxDistance]} values={[0, maxDistance]} onChange={onDistFilter}/>
        <AngleLegend maxFrequency={maxFrequency} fill='white'/>
        <FilterSlider domain={[0, maxFrequency]} values={[0, maxFrequency]} onChange={onFreqFilter}/>
        <ColorLegend shownTypes={shownTypes} onTypeClick={onTypeFilter} />
        <div style={{flex: 1}} />
    </LegendWrapper>
}