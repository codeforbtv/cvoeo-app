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

const CollapseButton = ({size = 40}: { size: number }) => {
    const circleCenter = ((size * 1.25) / 2);
   return  (

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
                points={`${circleCenter - (size / 5)},${circleCenter} ${circleCenter},${circleCenter - (size / 5)} ${circleCenter + (size / 5)},${circleCenter}`}
                fill='none'
                stroke='black'
                strokeWidth='4'
            />

        </Svg>
    );
}

export default CollapseButton;