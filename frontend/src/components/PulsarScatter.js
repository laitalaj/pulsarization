import React, { useState } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import BlobMarker from './chartparts/BlobMarker';
import CustomTooltip from './chartparts/CustomTooltip';
import CustomMarker from './chartparts/CustomMarker';
import ChartBrush from './chartparts/ChartBrush';

export default function PulsarScatter({pulsars, blobs, maximums, shownArea, onBrush}) {
    const minBrush = 5;
    const [brushing, setBrushing] = useState(false);
    const [point1, setPoint1] = useState({x: 0, chartX:0, y: 0, chartY: 0});
    const [point2, setPoint2] = useState({x: 0, chartX:0, y: 0, chartY: 0});

    return <ResponsiveContainer width='85%' height='85%'>
        <ScatterChart
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
                setBrushing(false);
                if(Math.abs(point1.chartX - point2.chartX) < minBrush
                    && Math.abs(point1.chartY - point2.chartY) < minBrush) {
                    return;
                }
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
                onBrush(area);
            }}
        >
            {ChartBrush({brushing, point1, point2}) /* For some reason doing <ChartBrush /> results in the element not rendering :shrug: */}
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
            <Scatter
                name='Pulsars'
                data={pulsars}
                fill='white'
                isAnimationActive={false}
                shape={<CustomMarker maximums={maximums} />}
            />
            <Scatter
                name='Blobs'
                data={blobs.map(blob => {
                    return {
                        raj: (blob.x[0] + blob.x[1]) / 2,
                        decj: (blob.y[0] + blob.y[1]) / 2,
                        xRange: blob.x,
                        yRange: blob.y,
                        n: blob.n,
                        neighbors: blob.neighbors,
                        itemType: 'blob',
                    }
                })}
                fill='white'
                isAnimationActive={false}
                shape={BlobMarker}
            />
        </ScatterChart>
    </ResponsiveContainer>
}
