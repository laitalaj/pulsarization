import React, { useState } from 'react';
import Switch from 'react-switch';

import { ToggleText } from '../styled';

export default function TableToggle({tableOn, onChange}) {
    return <Switch
        width={80}
        checked={tableOn}
        onChange={onChange}
        uncheckedIcon={<ToggleText side='right'>Chart</ToggleText>}
        checkedIcon={<ToggleText side='left'>Table</ToggleText>}
        onColor='#a1a1a1'
        offColor='#a1a1a1'
    />;
}
