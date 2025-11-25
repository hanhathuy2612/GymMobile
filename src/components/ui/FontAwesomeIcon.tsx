import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ComponentProps } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type FontAwesomeIconProps = {
    name: ComponentProps<typeof FontAwesome5>['name'];
    size?: number;
    color: string;
    style?: StyleProp<ViewStyle>;
    weight?: ComponentProps<typeof FontAwesome5>['weight'];
}

export function FontAwesomeIcon({ name, size = 24, color, style, weight = 'regular' }: FontAwesomeIconProps) {
    return (
        <FontAwesome5
            name={name}
            size={size}
            color={color}
            style={style}
            weight={weight}
        />
    );
}