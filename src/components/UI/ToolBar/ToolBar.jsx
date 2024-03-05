import React from 'react';
import {Text} from '@gravity-ui/uikit';
import './ToolBar.scss';
import {useNavigate} from 'react-router-dom';

const ToolBar = ({className, children, arrow}) => {
    const navigate = useNavigate();


    return (
        <div className={`flex items-center justify-between bg-white ${className}`}>
            <div className="flex header-heading items-center ">
                <div onClick={() => navigate('/clients')} className="cursor-pointer">
                    {arrow}
                </div>
                <Text variant="header-2" className="font-bold text-2xl">
                    Клиенты
                </Text>
            </div>
            <div className="header-btns">{children}</div>
        </div>
    );
};

export default ToolBar;
