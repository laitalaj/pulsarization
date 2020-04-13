import React, { useState } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

import { usePulsars, useExtremes } from '../api';
import CustomTooltip from './chartparts/CustomTooltip';
import CustomMarker from './chartparts/CustomMarker';
import { Text, Wrapper } from './styled';

export default function PulsarChart() {
    const [fields, setFields] = useState(['psrj', 'raj', 'decj', 'f0']);
    const [filters, setFilters] = useState([]);
    const [pulsars, pulsarsLoading] = usePulsars(fields, filters);

    const [maxFields, setMaxFields] = useState(['f0']);
    const [maximums, maximumsLoading] = useExtremes('max', maxFields);

    return <Wrapper>
        {   pulsarsLoading || maximumsLoading ?
            <Text>Loading...</Text>
            : <ScatterChart
                width={800}
                height={500}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type='number' dataKey='raj' name='Right Ascension' />
                <YAxis type='number' dataKey='decj' name='Declination' />
                <Tooltip content={CustomTooltip} />
                <Scatter name='Pulsars' data={pulsars} fill='white' shape={<CustomMarker maxF0={maximums.f0} />} />
            </ScatterChart>
        }
    </Wrapper>
}