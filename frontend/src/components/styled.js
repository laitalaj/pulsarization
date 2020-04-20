import Slider from 'react-compound-slider';
import styled from 'styled-components';

export const Content = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: black;
`

export const HorizontalWrapper = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const Wrapper = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const LegendWrapper = styled(Wrapper)`
    flex: 0 1 auto;
    margin-right: 20px;
`

export const Title = styled.h1`
    color: white;
`

export const Text = styled.p`
    color: white;
`

export const LegendSvg = styled.svg`
    font-family: Roboto;
    font-size: 11px;
    fill: white;
`

const sliderSize = '80%';
const sliderTotalHeight = '60px';

export const BaseSlider = styled(Slider)`
    position: relative;
`

export const HorizontalSlider = styled(BaseSlider)`
    width: ${sliderSize};
    height: ${sliderTotalHeight};
`

export const VerticalSlider = styled(BaseSlider)`
    width: ${sliderTotalHeight};
    height: ${sliderSize};
    margin-left: 40px;
`

const sliderRailHeight = '10px';
const sliderRailMargin = '20px';

export const BaseRail = styled.div`
    position: absolute;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid white;
`

export const HorizontalRail = styled(BaseRail)`
    width: 100%;
    height: ${sliderRailHeight};
    margin-top: ${sliderRailMargin};
`

export const VerticalRail = styled(BaseRail)`
    width: ${sliderRailHeight};
    height: 100%;
    margin-left: ${sliderRailMargin};
`

const handleWidthPx = 14;
const handleHeightPx = 30;

export const HandleGrab = styled.div`
    position: absolute;
    z-index: 2;
    border: 0px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    background-color: white;
`

export const HorizontalHandleGrab = styled(HandleGrab)`
    left: ${props => props.percent}%;
    width: ${handleWidthPx}px;
    height: ${handleHeightPx}px;
    margin-left: ${-handleWidthPx / 2}px;
    margin-top: 10px;
`

export const VerticalHandleGrab = styled(HandleGrab)`
    top: ${props => props.percent}%;
    width: ${handleHeightPx}px;
    height: ${handleWidthPx}px;
    margin-top: ${-handleWidthPx / 2}px;
    margin-left: 10px;
`

export const HandleText = styled.div`
    font-family: Roboto;
    font-size: 11px;
    color: white;
`

export const HorizontalHandleText = styled(HandleText)`
    margin-top: 35px;
`

export const VerticalHandleText = styled(HandleText)`
    margin-left: -65px;
`

export const TrackFill = styled.div`
    position: absolute;
    z-index: 1;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
`

export const HorizontalTrackFill = styled(TrackFill)`
    height: ${sliderRailHeight};
    left: ${props => props.sourcePercent}%;
    width: ${props => props.targetPercent - props.sourcePercent}%;
    margin-top: ${sliderRailMargin};
`

export const VerticalTrackFill = styled(TrackFill)`
    width: ${sliderRailHeight};
    top: ${props => props.sourcePercent}%;
    height: ${props => props.targetPercent - props.sourcePercent}%;
    margin-left: ${sliderRailMargin};
`
