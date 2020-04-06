import React, { useState } from 'react';
import { usePulsars } from '../api';

export default function PulsarList() {
    const [fields, setFields] = useState(['psrj', 'f0']);
    const [filters, setFilters] = useState([{ field: 'psrj', op: '!=', value: 'null' }]);
    const [pulsars, loading] = usePulsars(fields, filters);
    return <table>
        <thead>
            <tr>
                <th colSpan='2'>Pulsars{loading ? ': Loading...' : ''}</th>
            </tr>
            {loading ? null : <tr><th>J name</th><th>Frequency (Hz)</th></tr>}
        </thead>
        <tbody>
            {
                pulsars.map(
                    p => <tr key={p.psrj}>
                        <td align='left'>{p.psrj}</td>
                        <td align='right'>{p.f0}</td>
                    </tr>
                )
            }
        </tbody>
    </table>
};
