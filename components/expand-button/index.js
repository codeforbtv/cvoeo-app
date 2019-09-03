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

const ExpandButton = ({size = 40}: { size: number }) => (

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
            points={`${((size * 1.25) / 2) - (size / 5)},${((size * 1.25) / 2) - (size / 5)} ${(size * 1.25) / 2},${(size * 1.25) / 2} ${((size * 1.25) / 2) + (size / 5)},${((size * 1.25) / 2) - (size / 5)}`}
            fill='none'
            stroke='black'
            strokeWidth='4'
        />

    </Svg>
);

export default ExpandButton;