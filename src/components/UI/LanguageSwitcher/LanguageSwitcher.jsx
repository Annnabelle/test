import React from 'react';
import {Select} from '@gravity-ui/uikit';
import './LangeagesSwitcher.scss';

const LanguageSwitcher = () => {
    return (
        <Select
            placeholder="English"
            className="select-lang"
            options={[
                {value: 'val_1', content: 'English'},
                {value: 'val_2', content: 'Russian'},
                {value: 'val_3', content: 'Uzbek'},
            ]}
        />
    );
};

export default LanguageSwitcher;
