import React, { useState } from 'react';
import Switch from 'react-switch';

import { mediumGray, ToggleText } from '../styled';

export default function TableToggle({tableOn, onChange}) {
    return <Switch
        width={80}
        checked={tableOn}
        onChange={onChange}
        uncheckedIcon={<ToggleText side='right'>Chart</ToggleText>}
        checkedIcon={<ToggleText side='left'>Table</ToggleText>}
        onColor={mediumGray}
        offColor={mediumGray}
    />;
}
