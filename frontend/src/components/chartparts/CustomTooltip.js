import React from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

// https://github.com/recharts/recharts/issues/275
export default function CustomTooltip(props) {
  if (!props.active) {
    return null
  }

  const data = props.payload[0].payload;
  const newPayload = [
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

  return <DefaultTooltipContent {...props} payload={newPayload} />;
};