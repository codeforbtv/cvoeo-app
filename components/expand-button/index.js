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

const ExpandButton = ({ size = 40 }: { size: number }) => {
    const circleCenter = ((size * 1.25) / 2);
    const circleFifth = (size / 5);

    return (

        <Svg
            width={size}
            height={size}
        >

            <Circle
                cx={(size * 1.2) / 2}
                cy={(size * 1.2) / 2}
                r={(size * 1.2) / 2}
                fill='#dddea8'
            />

            <Polyline
                // When size=40, points={'14,19 22,27 30,19'}
                points={`${circleCenter - circleFifth - 3},${circleCenter - circleFifth + 2} 
                         ${(size * 1.25) / 2 - 3},${(size * 1.25) / 2 + 2} 
                         ${circleCenter + circleFifth - 3},${circleCenter - circleFifth + 2}`}
                fill='none'
                stroke='#95964d'
                strokeWidth='4'
            />

        </Svg>
    )
};

export default ExpandButton;