import React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table'
import 'react-base-table/styles.css'

import { Wrapper } from './styled';

const createColumn = (key, title, extra={}) => {
    return { key, dataKey: key, title, width: 1000, align: 'right', ...extra };
}

const columns = [
    createColumn('psrj', 'J name', {align: 'left'}),
    createColumn('raj', 'Right ascension'),
    createColumn('decj', 'Declination'),
    createColumn('dist_dm', 'Distance (kpc)'),
    createColumn('f0', 'Pulse frequency (Hz)'),
    createColumn('types', 'Pulsar types'),
]

export default function PulsarTable({pulsars}) {
    return <Wrapper style={{width: '100%'}}><AutoResizer>
        {({ width, height }) => <BaseTable
            style={{marginLeft: -width*.4, marginTop: -height}}
            rowKey='psrj'
            width={width*.8}
            height={height*.9}
            columns={columns}
            data={pulsars}
        />}
    </AutoResizer></Wrapper>;
};
