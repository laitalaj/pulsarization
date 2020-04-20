import React, { useState, useEffect } from 'react';

import { usePulsars, useExtremes } from '../api';
import { Text, HorizontalWrapper, Wrapper } from './styled';
import BrushSlider from './chartparts/BrushSlider';
import PulsarScatter from './PulsarScatter';
import PulsarLegend from './PulsarLegend';

export default function PulsarChart() {
    const [fields, setFields] = useState(['psrj', 'raj', 'decj', 'f0', 'dist_dm', 'types']);
    const [filters, setFilters] = useState([
        { field: 'decj', op: '!=', value: 'null' },
        { field: 'raj', op: '!=', value: 'null' },
        { field: 'dist_dm', op: '!=', value: 'null' },
    ]);
    const [pulsars, pulsarsLoading] = usePulsars(fields, filters);
    const [mappedPulsars, setMappedPulsars] = useState([]);

    useEffect(() => {
        const mapped = pulsars.map(p => {
            return {...p, types: p.types.map(t => t.name)}
        });
        setMappedPulsars(mapped);
    }, [pulsars]);

    const [maxFields, setMaxFields] = useState(['f0', 'dist_dm']);
    const [maximums, maximumsLoading] = useExtremes('max', maxFields);
    const [minFields, setMinFields] = useState(['dist_dm']);
    const [minimums, minimumsLoading] = useExtremes('min', minFields);

    const [shownArea, setShownArea] = useState({
        bottomLeft: { x: 0, y: -90 },
        topRight: { x: 24, y: 90 },
    });
    const [filteredPulsars, setFilteredPulsars] = useState([]);
    useEffect(() => {
        const filtered = mappedPulsars.filter(p => {
            return p.raj > shownArea.bottomLeft.x && p.raj < shownArea.topRight.x
                && p.decj > shownArea.bottomLeft.y && p.decj < shownArea.topRight.y;
        });
        setFilteredPulsars(filtered);
    }, [mappedPulsars, shownArea]);

    return <HorizontalWrapper>
        <BrushSlider
            vertical
            domain={[-90, 90]}
            values={[shownArea.bottomLeft.y, shownArea.topRight.y]}
            onChange={(values) => setShownArea({
                bottomLeft: {
                    y: values[1],
                    x: shownArea.bottomLeft.x,
                },
                topRight: {
                    y: values[0],
                    x: shownArea.topRight.x,
                },
            })}
        />
        <Wrapper>
            {pulsarsLoading || maximumsLoading || minimumsLoading
                ? <Text>Loading...</Text>
                : <PulsarScatter
                    pulsars={filteredPulsars}
                    maximums={maximums}
                    minimums={minimums}
                    shownArea={shownArea}
                    onBrush={setShownArea}
                  />
            }
            <BrushSlider
                domain={[0, 24]}
                values={[shownArea.bottomLeft.x, shownArea.topRight.x]}
                onChange={(values) => setShownArea({
                    bottomLeft: {
                        x: values[0],
                        y: shownArea.bottomLeft.y,
                    },
                    topRight: {
                        x: values[1],
                        y: shownArea.topRight.y,
                    },
                })}
            />
        </Wrapper>
        {maximumsLoading ? null : <PulsarLegend maxFrequency={maximums['f0']} />}
    </HorizontalWrapper>
}
