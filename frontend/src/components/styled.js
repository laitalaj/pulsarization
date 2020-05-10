import Slider from 'react-compound-slider';
import BaseTable from 'react-base-table';
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
    justify-content: flex-end;
`

export const LegendWrapper = styled(Wrapper)`
    flex: 0 1 auto;
    margin-right: 20px;
`

export const fontFamily = '"Droid Sans Mono", monospace';

export const Title = styled.h1`
    color: white;
    font-family: ${fontFamily};
`

export const Text = styled.p`
    color: white;
    font-family: ${fontFamily};
`

export const LegendSvg = styled.svg`
    font-family: ${fontFamily};
    font-size: 11px;
    fill: white;
`

export const mediumGray = '#a1a1a1';
const sliderSize = '100%';
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

export const VerticalSpacer = styled.div`
    height: ${sliderTotalHeight};
`

const sliderRailHeight = 10;
const sliderRailMargin = 20;
const sliderRailBorder = 1;

export const BaseRail = styled.div`
    position: absolute;
    cursor: pointer;
    border-radius: 5px;
    border: ${sliderRailBorder}px solid white;
`

export const HorizontalRail = styled(BaseRail)`
    width: 100%;
    height: ${sliderRailHeight}px;
    margin-top: ${sliderRailMargin}px;
`

export const VerticalRail = styled(BaseRail)`
    width: ${sliderRailHeight}px;
    height: 100%;
    margin-left: ${sliderRailMargin}px;
`

const handleWidthPx = 20;
const handleHeightPx = 20;
const handleMargin = 15;

export const HandleGrab = styled.div`
    position: absolute;
    z-index: 2;
    border: 0px;
    border-radius: ${Math.min(handleWidthPx, handleHeightPx)}px;
    text-align: center;
    cursor: pointer;
    background-color: white;
`

export const HorizontalHandleGrab = styled(HandleGrab)`
    left: ${props => props.percent}%;
    width: ${handleWidthPx}px;
    height: ${handleHeightPx}px;
    margin-left: ${-handleWidthPx / 2}px;
    margin-top: ${handleMargin}px;
`

export const VerticalHandleGrab = styled(HandleGrab)`
    top: ${props => props.percent}%;
    width: ${handleHeightPx}px;
    height: ${handleWidthPx}px;
    margin-top: ${-handleWidthPx / 2}px;
    margin-left: ${handleMargin}px;
`

export const HandleText = styled.div`
    font-family: ${fontFamily};
    font-size: 10px;
    color: white;
`

export const HorizontalHandleText = styled(HandleText)`
    margin-left: -50%;
    margin-top: 27px;
`

export const VerticalHandleText = styled(HandleText)`
    margin-left: -67px;
`

export const TrackFill = styled.div`
    position: absolute;
    z-index: 1;
    background-color: ${mediumGray};
    border-radius: 5px;
    cursor: pointer;
`

export const HorizontalTrackFill = styled(TrackFill)`
    height: ${sliderRailHeight}px;
    left: ${props => props.sourcePercent}%;
    width: ${props => props.targetPercent - props.sourcePercent}%;
    margin-top: ${sliderRailMargin+sliderRailBorder}px;
`

export const VerticalTrackFill = styled(TrackFill)`
    width: ${sliderRailHeight}px;
    top: ${props => props.sourcePercent}%;
    height: ${props => props.targetPercent - props.sourcePercent}%;
    margin-left: ${sliderRailMargin+sliderRailBorder}px;
`

export const ToggleText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 12px;
    font-family: ${fontFamily};
    color: white;
    padding-${props => props.side}: 4px;
`

export const StyledTable = styled(BaseTable)`
    margin-left: ${props => -props.width / 2}px;
    margin-top: ${props => -props.height / props.heightMultiplier}px;
    color: white;
    font-family: ${fontFamily};
    background-color: black;
    scrollbar-color: white;
    & .BaseTable__header-row {
        background-color: ${mediumGray};
    }
    & .BaseTable__row {
        background-color: black;
    }
`
