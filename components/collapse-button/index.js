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

const CollapseButton = ({ size = 40 }: { size: number }) => {
    const circleCenter = ((size * 1.25) / 2);
    const circleFifth = (size / 5);
    const hOffset = -3;
    const vOffset = 1;

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
                //When size=40, points={'14,26 22,18 30,26'}
                points={`${circleCenter - circleFifth + hOffset},${circleCenter + vOffset} 
                         ${circleCenter + hOffset},${circleCenter - circleFifth + vOffset} 
                         ${circleCenter + circleFifth + hOffset},${circleCenter + vOffset}`}
                fill='none'
                stroke='#95964d'
                strokeWidth='4'
            />

        </Svg>
    );
}

export default CollapseButton;