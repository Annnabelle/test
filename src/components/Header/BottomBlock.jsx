import React from 'react';
import {
    CircleDollar,
    CopyCheckXmark,
    Cubes3Overlap,
    House,
    PersonMagnifier,
    Persons,
    PlugConnection,
    SquareListUl,
    Wrench,
} from '@gravity-ui/icons';
import './BottomBlock.scss';
import {Button, Icon} from '@gravity-ui/uikit';

const links = [
    {
        id: 1,
        href: './',
        linkTo: 'Главная',
        icon: House,
    },
    {
        id: 2,
        href: './dishes',
        linkTo: 'Блюда',
        icon: Cubes3Overlap,
    },
    {
        id: 3,
        href: './stock',
        linkTo: 'Скад',
        icon: SquareListUl,
    },
    {
        id: 4,
        href: './finance',
        linkTo: 'Финансы',
        icon: CircleDollar,
    },
    {
        id: 5,
        href: './staff',
        linkTo: 'Персонал',
        icon: Persons,
    },
    {
        id: 6,
        href: './isntegrations',
        linkTo: 'Интеграции',
        icon: PlugConnection,
    },
    {
        id: 7,
        href: './subscription',
        linkTo: 'Подписка',
        icon: CopyCheckXmark,
    },
    {
        id: 8,
        href: './settings',
        linkTo: 'Настройки',
        icon: Wrench,
    },
    {
        id: 9,
        href: '/clients',
        linkTo: 'Клиенты',
        icon: PersonMagnifier,
        selected: true,
    },
];

const BottomBlock = () => {
    return (
        <div className="bg-white text-black font-black">
            <div className="container">
                <nav className="nav">
                    {links.map((item) => (
                        <Button
                            className="btn-link"
                            key={item.id}
                            href={item.href}
                            size="l"
                            selected={item.selected}
                        >
                            <Icon size={16} data={item.icon} />
                            {item.linkTo}
                        </Button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default BottomBlock;
