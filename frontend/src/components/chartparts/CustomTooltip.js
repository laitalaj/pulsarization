import React from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

// https://github.com/recharts/recharts/issues/275
export default function CustomTooltip(props) {
  if (!props.active) {
    return null
  }

  const newPayload = [
    {
      name: 'J Name',
      value: props.payload[0].payload.psrj,
    },
    ...props.payload,
    {
      name: 'Pulse Frequency',
      value: props.payload[0].payload.f0,
    }
  ];

  return <DefaultTooltipContent {...props} payload={newPayload} />;
};