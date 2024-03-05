import React from 'react';
import {Button, Icon, Text} from '@gravity-ui/uikit';
import {Xmark} from '@gravity-ui/icons';
import './ActionBox.scss';

const ActionBox = ({
                       heading,
                       closeForm,
                       children,
                       btnCancel,
                       btnDelete,
                       btnAction,
                       confirm,
                       cancel,
                       buttons
                   }) => {
    return (
        <div className="action-box p-8">
            <div className="flex items-start justify-between gap-x-5">
                <Text variant="subheader-2">{heading}</Text>
                <div className="cursor-pointer" onClick={closeForm}>
                    <Icon size={13} data={Xmark}/>
                </div>
            </div>
            {children}
            <div className="btns flex justify-end mt-4">
                {
                    buttons ?
                        buttons.map((button, index) => (
                            <Button view={button.view || "normal"} size="l" className={button.classList}
                                    onClick={() => button.onCLick()} key={index}>
                                {button.text}
                            </Button>
                        )) :
                        (
                            <>
                                <Button view="flat" size="l" className="ml-4" onClick={closeForm}>
                                    {btnCancel}
                                </Button>
                                <Button className="bg-red ml-4" size="l">
                                    {btnDelete}
                                </Button>
                                <Button view="action" size="l" onClick={confirm}>
                                    {btnAction}
                                </Button>
                            </>
                        )
                }
            </div>
        </div>
    );
};

export default ActionBox;
