// @flow
import React from 'react';
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask
} from 'react-native-svg';

type Props = { percentComplete: number };


const MoneyMeter = ({ percentComplete }: Props) => {
    const rotation = (1.72 * percentComplete) - 86;
    return (
        <Svg height={100} width={200}>
            <Circle
                cx={100}
                cy={100}
                r={85}
                strokeWidth={6}
                stroke='#dc552b'
                fill='#eeeec2'
            />
            <G rotation={rotation} origin='100, 100'>
                <ClipPath id='clip'>
                    <Rect
                        x={100}
                        height={200}
                        width={200}
                    />
                </ClipPath>
                <Circle
                    cx={100}
                    cy={100}
                    r={85}
                    strokeWidth={6}
                    stroke='#fea488'
                    fill='#fdfffb'
                    clipPath='url(#clip)'
                />
                <Path
                    d='M 100 100 L 100 0'
                    strokeWidth={2}
                    stroke='#020202'
                />
                <Path
                    d='M 100 0 L 95 5'
                    strokeWidth={2}
                    stroke='#020202'
                />
                <Path
                    d='M 100 0 L 105 5'
                    strokeWidth={2}
                    stroke='#020202'
                />
            </G>
        </Svg>);
};

export default MoneyMeter;