import React from 'react';
import { AutoResizer } from 'react-base-table'
import 'react-base-table/styles.css'

import { StyledTable, Wrapper } from './styled';

const createColumn = (key, title, extra={}) => {
    return { key, dataKey: key, title, width: 1000, align: 'right', ...extra };
}

const columns = [
    createColumn('psrj', 'J name', {align: 'left'}),
    createColumn('raj', 'Right ascension'),
    createColumn('decj', 'Declination'),
    createColumn('dist_dm', 'Distance (kpc)'),
    createColumn('f0', 'Pulse frequency (Hz)'),
    createColumn('types', 'Pulsar types', {align: 'left'}),
]

export default function PulsarTable({pulsars}) {
    const widthMultiplier = .85;
    const heightMultiplier = .95;
    return <Wrapper style={{width: '100%'}}>
        <AutoResizer>
            {({ width, height }) => <StyledTable
                rowKey='psrj'
                width={width*widthMultiplier}
                widthMultiplier={widthMultiplier}
                height={height*heightMultiplier}
                heightMultiplier={heightMultiplier}
                columns={columns}
                data={pulsars}
            />}
        </AutoResizer>
    </Wrapper>;
};
