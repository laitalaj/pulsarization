import React from 'react';
import {Rail, Handles, Tracks} from 'react-compound-slider';
import {
    HorizontalSlider, HorizontalRail, HorizontalHandleGrab, HorizontalHandleText, HorizontalTrackFill,
    VerticalSlider, VerticalRail, VerticalHandleGrab, VerticalHandleText, VerticalTrackFill,
} from '../styled';

function Handle({
    vertical,
    handle: {id, value, percent},
    getHandleProps
}) {
    const GrabElem = vertical ? VerticalHandleGrab : HorizontalHandleGrab;
    const TextElem = vertical ? VerticalHandleText : HorizontalHandleText;
    return <GrabElem percent={percent} {...getHandleProps(id)}>
        <TextElem>{value.toFixed(3)}</TextElem>
    </GrabElem>
}

function Track({vertical, source, target, getTrackProps}) {
    const Elem = vertical ? VerticalTrackFill : HorizontalTrackFill;
    return <Elem
        sourcePercent={source.percent}
        targetPercent={target.percent}
        {...getTrackProps()}
    />
}

export default function FilterSlider({domain, values, vertical, onChange}) {
    const SliderElem = vertical ? VerticalSlider : HorizontalSlider;
    return <SliderElem
        vertical={vertical}
        reversed={vertical}
        domain={domain}
        values={values}
        step={.05}
        mode={3}
        onSlideEnd={onChange}
    >
        <Rail>{
            ({getRailProps}) => vertical ? <VerticalRail {...getRailProps()} /> : <HorizontalRail {...getRailProps()} />
        }</Rail>
        <Handles>{
            ({handles, getHandleProps}) => (
                <div className='slider-handles'>
                    {handles.map(handle => (
                        <Handle
                            key={handle.id}
                            vertical={vertical}
                            handle={handle}
                            getHandleProps={getHandleProps}
                        />
                    ))}
                </div>
            )
        }</Handles>
        <Tracks left={false} right={false}>{
            ({tracks, getTrackProps}) => (
                <div className='slider-tracks'>
                    {tracks.map(({id, source, target}) => (
                        <Track
                            key={id}
                            vertical={vertical}
                            source={source}
                            target={target}
                            getTrackProps={getTrackProps}
                        />
                    ))}
                </div>
            )
        }</Tracks>
    </SliderElem>
}