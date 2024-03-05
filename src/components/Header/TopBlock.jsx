import React, {useState} from 'react';
import {Bell, BellDot, CircleFill} from '@gravity-ui/icons';
import {Icon, Label, Select, Text, UserLabel} from '@gravity-ui/uikit';
import logo from '../../assets/images/logo.png';
import LanguageSwitcher from '../UI/LanguageSwitcher/LanguageSwitcher';
import avatar from '../../assets/images/UserAvatar.png';
import './TopBlock.scss';

const TopBlock = () => {
    const [notification, setNotification] = useState(false);
    const hasNotification = () => {
        setNotification(true);
    };
    return (
        <div className="bg-[#4C4C4C] text-white font-black">
            <div className="container">
                <div className="top-block">
                    <div className="top-block-items">
                        <div className="logo">
                            <img src={logo} alt="logo" onClick={hasNotification} />
                        </div>
                        <Select
                            placeholder="Ресторан 1"
                            className="select-menu"
                            options={[
                                {value: 'val_1', content: 'Ресторан 1'},
                                {value: 'val_2', content: 'Ресторан 2'},
                                {value: 'val_3', content: 'Ресторан 3'},
                                {value: 'val_4', content: 'Ресторан 4'},
                            ]}
                        />
                    </div>
                    <div className="top-block-items flex gap-4">
                        <div className="text flex gap-0.5">
                            <Text variant="body-1" className="font-normal text-white/[0.5]">
                                Ресторан:
                            </Text>
                            <Text variant="body-1" className="font-normal text-white">
                                Название ресторана
                            </Text>
                        </div>
                        <Label theme="success" icon={<Icon size={10} data={CircleFill} />}>
                            Последняя синхронизация: меньше 1 минуты назад в 14:25
                        </Label>
                    </div>
                    <div className="top-block-items flex gap-4">
                        <div className="notification">
                            {!notification ? (
                                <Icon size={16} data={Bell} />
                            ) : (
                                <Icon size={16} data={BellDot} />
                            )}
                        </div>
                        <div className="languages">
                            <LanguageSwitcher />
                        </div>
                        <div className="user">
                            <UserLabel avatar={avatar} type="person" children="userName" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBlock;
