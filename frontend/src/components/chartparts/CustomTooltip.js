import React from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

// https://github.com/recharts/recharts/issues/275
export default function CustomTooltip(props) {
  if (!props.active) {
    return null
  }

  const data = props.payload[0].payload;
  var newPayload;
  if(data.itemType === 'pulsar') {
    newPayload = [
        {
        name: 'J Name',
        value: data.psrj,
        },
        ...props.payload,
        {
        name: 'Types',
        value: data.types.join(', '),
        },
        {
        name: 'Pulse Frequency',
        value: data.f0,
        },
        {
        name: 'Distance',
        value: data.dist_dm,
        },
    ];
  } else {
    newPayload = [
        {
            name: 'Number of pulsars in the area',
            value: data.n,
        },
        {
            name: 'Right ascension',
            value: `${data.xRange[0].toFixed(3)} to ${data.xRange[1].toFixed(3)}`
        },
        {
            name: 'Declination',
            value: `${data.yRange[0].toFixed(3)} to ${data.yRange[1].toFixed(3)}`
        },
    ];
  }

  return <DefaultTooltipContent {...props} payload={newPayload} />;
};