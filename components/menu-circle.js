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

const MenuCircle = () => (
    <Svg height={300} width={300}>
        <Circle
            cx={150}
            cy={150}
            r={150}
            fill='#04a0c6'
        />
        <Circle
            cx={150}
            cy={150}
            r={30}
            fill='#ffffff'
        />
    </Svg>
);

export default MenuCircle;