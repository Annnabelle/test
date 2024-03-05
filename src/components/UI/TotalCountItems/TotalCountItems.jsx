import React from 'react';
import {Text} from '@gravity-ui/uikit';

const TotalCountItem = ({label, value, color, subVariant, className}) => {
    return (
        <div className={`flex flex-col ${className} my-1`}>
            <Text variant="caption-2">{label}</Text>
            <Text variant={`${subVariant}`} color={`${color}`}>
                {value}
            </Text>
        </div>
    );
};

export default TotalCountItem;
