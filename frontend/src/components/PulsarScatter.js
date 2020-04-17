import React, { useState } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import CustomTooltip from './chartparts/CustomTooltip';
import CustomMarker from './chartparts/CustomMarker';
import ChartBrush from './chartparts/ChartBrush';

export default function PulsarScatter({pulsars, maximums, minimums, shownArea, onBrush}) {
    const [brushing, setBrushing] = useState(false);
    const [point1, setPoint1] = useState({x: 0, chartX:0, y: 0, chartY: 0});
    const [point2, setPoint2] = useState({x: 0, chartX:0, y: 0, chartY: 0});

    return <ResponsiveContainer width='85%' height='85%'>
        <ScatterChart
            data={pulsars}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
            onMouseDown={e => {
                setPoint1({x: e.xValue, y: e.yValue, chartX: e.chartX, chartY: e.chartY});
                setPoint2({x: e.xValue, y: e.yValue, chartX: e.chartX, chartY: e.chartY});
                setBrushing(true);
            }}
            onMouseMove={e => {
                if(brushing) setPoint2({x: e.xValue, y: e.yValue, chartX: e.chartX, chartY: e.chartY});
            }}
            onMouseUp={e => {
                const area = {
                    bottomLeft: {
                        x: point1.x < e.xValue ? point1.x : e.xValue,
                        y: point1.y < e.yValue ? point1.y : e.yValue,
                    },
                    topRight: {
                        x: point1.x >= e.xValue ? point1.x : e.xValue,
                        y: point1.y >= e.yValue ? point1.y : e.yValue,
                    },
                };
                setBrushing(false);
                onBrush(area);
            }}
        >
            {ChartBrush({brushing, point1, point2}) /* For some reason doing <ChartBrush /> results in the element not rendering :shrug: */}
            <CartesianGrid />
            <XAxis
                type='number'
                dataKey='raj'
                domain={[shownArea.bottomLeft.x, shownArea.topRight.x]}
                tickFormatter={t => t.toFixed(3)}
                name='Right Ascension'
            />
            <YAxis
                type='number'
                dataKey='decj'
                domain={[shownArea.bottomLeft.y, shownArea.topRight.y]}
                tickFormatter={t => t.toFixed(3)}
                name='Declination'
            />
            <Tooltip content={CustomTooltip} />
            <Scatter name='Pulsars' fill='white' isAnimationActive={false} shape={<CustomMarker maximums={maximums} minimums={minimums} />} />
        </ScatterChart>
    </ResponsiveContainer>
}
