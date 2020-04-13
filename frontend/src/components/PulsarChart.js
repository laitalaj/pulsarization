import React, { useState } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import { usePulsars, useExtremes } from '../api';
import CustomTooltip from './chartparts/CustomTooltip';
import CustomMarker from './chartparts/CustomMarker';
import { Text, Wrapper } from './styled';

export default function PulsarChart() {
    const [fields, setFields] = useState(['psrj', 'raj', 'decj', 'f0', 'dist_dm']);
    const [filters, setFilters] = useState([
        { field: 'decj', op: '!=', value: 'null' },
        { field: 'raj', op: '!=', value: 'null' },
        { field: 'dist_dm', op: '!=', value: 'null' },
    ]);
    const [pulsars, pulsarsLoading] = usePulsars(fields, filters);

    const [maxFields, setMaxFields] = useState(['f0', 'dist_dm']);
    const [maximums, maximumsLoading] = useExtremes('max', maxFields);
    const [minFields, setMinFields] = useState(['dist_dm']);
    const [minimums, minimumsLoading] = useExtremes('min', minFields);

    return <Wrapper>
        {   pulsarsLoading || maximumsLoading || minimumsLoading ?
            <Text>Loading...</Text>
            : <ResponsiveContainer width='80%' height='80%'>
                <ScatterChart
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type='number' dataKey='raj' name='Right Ascension' />
                    <YAxis type='number' dataKey='decj' name='Declination' />
                    <Tooltip content={CustomTooltip} />
                    <Scatter name='Pulsars' data={pulsars} fill='white' shape={<CustomMarker maximums={maximums} minimums={minimums} />} />
                </ScatterChart>
            </ResponsiveContainer>
        }
    </Wrapper>
}