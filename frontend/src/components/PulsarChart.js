import React, { useState, useEffect } from 'react';

import { usePulsars, useExtremes } from '../api';
import { blobify } from '../utils';
import { Text, HorizontalWrapper, Wrapper } from './styled';
import FilterSlider from './chartparts/FilterSlider';
import PulsarScatter from './PulsarScatter';
import PulsarLegend from './PulsarLegend';
import { typeToColor } from './chartparts/CustomMarker';

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
            return {
                ...p,
                types: p.types.map(t => t.name),
                itemType: 'pulsar',
            }
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
    const [freqRange, setFreqRange] = useState([0, 1000]);
    const [distRange, setDistRange] = useState([0, 100]);
    const [shownTypes, setShownTypes] = useState([...Object.keys(typeToColor), undefined]);
    useEffect(() => {
        setFreqRange([freqRange[0], maximums.f0]);
        setDistRange([distRange[0], maximums.dist_dm]);
    }, [maximums]);

    const [filteredPulsars, setFilteredPulsars] = useState([]);
    const [blobs, setBlobs] = useState([]);
    useEffect(() => {
        const filtered = mappedPulsars
            .filter(p => {
                return p.raj > shownArea.bottomLeft.x && p.raj < shownArea.topRight.x
                    && p.decj > shownArea.bottomLeft.y && p.decj < shownArea.topRight.y;
            })
            .filter(p => p.f0 >= freqRange[0] && p.f0 <= freqRange[1])
            .filter(p => p.dist_dm >= distRange[0] && p.dist_dm <= distRange[1])
            .filter(p => {
                if(p.types.length == 0) return shownTypes.includes(undefined);
                return p.types.reduce((acc, t) => acc || shownTypes.includes(t), false);
            });
        const blobified = blobify(filtered, shownArea);
        setFilteredPulsars(blobified.pulsars);
        setBlobs(blobified.blobs);
    }, [mappedPulsars, shownArea, freqRange, distRange, shownTypes]);

    return <HorizontalWrapper>
        <FilterSlider
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
                    blobs={blobs}
                    maximums={maximums}
                    minimums={minimums}
                    shownArea={shownArea}
                    onBrush={setShownArea}
                  />
            }
            <FilterSlider
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
        {maximumsLoading
            ? null
            : <PulsarLegend
                maxDistance={maximums.dist_dm} maxFrequency={maximums.f0}
                shownTypes={shownTypes}
                onFreqFilter={values => setFreqRange(values)}
                onDistFilter={values => setDistRange(values)}
                onTypeFilter={t => shownTypes.includes(t)
                    ? setShownTypes(shownTypes.filter(typ => typ !== t))
                    : setShownTypes([...shownTypes, t])
                }
              />
        }
    </HorizontalWrapper>
}
