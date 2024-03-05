import React, {useEffect, useState} from 'react';
import {Button, Modal, Text} from '@gravity-ui/uikit';
import ActionBox from '../UI/ActionBox/ActionBox';
import FormCreate from '../UI/FormCreate/FormCreate';
import './UserInfo.scss';
import {locale, dateFormatOptions} from '../../config';
import {updateClientAction} from "../../store/clientReducer";
import {useDispatch} from "react-redux";

const UserInfo = ({client}) => {
    const [isFormActionBoxOpen, setFormActionBoxOpen] = useState(false);
    const dispatch = useDispatch();
    const toggleFormActionBox = (toOpen) => {
        setFormActionBoxOpen(toOpen);
    };
    const [changedClient, setChangedClient] = useState()
    useEffect(()=>{
        setChangedClient({
            firstName: client?.firstName,
            lastName: client?.lastName,
            gender: client?.gender,
            phone: client?.phone,
            email: client?.email,
            birthDate: client?.birthDate,
            address: client?.address,
        })
    }, [client])
    return client ? (
        <div className="user-info box p-4 box-width-one-third">
            <div className="container">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200/1">
                    <div className="heading">
                        <Text variant="subheader-3">{`${client.firstName} ${client.lastName}`}</Text>
                    </div>
                    <Button
                        size="l"
                        className="bg-info"
                        onClick={() => {
                            toggleFormActionBox(true);
                        }}
                    >
                        Изменить
                    </Button>
                    <Modal
                        open={isFormActionBoxOpen}
                        onClose={() => {
                            toggleFormActionBox(false);
                        }}
                    >
                        <ActionBox
                            heading="Изменить данные"
                            buttons={[
                                {
                                    text: "Отменить",
                                    classList: "ml-4",
                                    view: "flat",
                                    onCLick: () => toggleFormActionBox(false)
                                },
                                {
                                    text: "Добавить",
                                    classList: "ml-4",
                                    view: "action",
                                    onCLick: () => {
                                        if(!(client?.id)) {
                                            return;
                                        }
                                        dispatch(updateClientAction({clientId: client.id, clientObj: changedClient}));
                                        toggleFormActionBox(false);
                                        setChangedClient({
                                            firstName: client?.firstName,
                                            lastName: client?.lastName,
                                            gender: client?.gender,
                                            phone: client?.phone,
                                            email: client?.email,
                                            birthDate: client?.birthDate,
                                            address: client?.address,
                                        })
                                    }
                                },
                            ]}
                            closeForm={() => {
                                toggleFormActionBox(false);
                            }}
                        >
                            <div className="flex gap-3 mt-3">
                                {changedClient && <FormCreate client={changedClient} setClient={setChangedClient} id={client?.id}/>}
                            </div>
                        </ActionBox>
                    </Modal>
                </div>
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex gap-4 justify-between">
                        <Text variant="body-1" className="text-black/[0.5]">
                            Пол
                        </Text>
                        <Text variant="body-2">
                            {client.gender == 0
                                ? 'Мужской'
                                : client.gender == 1
                                  ? 'Женский'
                                  : 'Не указан'}
                        </Text>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <Text variant="body-1" className="text-black/[0.5]">
                            Дата рождения
                        </Text>
                        <Text variant="body-2">
                            {new Date(client.birthDate).toLocaleDateString(
                                locale,
                                dateFormatOptions,
                            ) || ''}
                        </Text>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <Text variant="body-1" className="text-black/[0.5]">
                            Номер телефона
                        </Text>
                        <Text variant="body-2">{client.phone || 'Не указан'}</Text>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <Text variant="body-1" className="text-black/[0.5]">
                            Почта
                        </Text>
                        <Text variant="body-2">{client.email || 'Не указан'}</Text>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <Text variant="body-1" className="text-black/[0.5]">
                            Адрес
                        </Text>
                        <Text variant="body-2">{client.address || 'Не указан'}</Text>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div
            className="box"
            style={{
                width: '100%',
                minHeight: '200px',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p>Loading</p>
        </div> //TODO: preloader
    );
};

export default UserInfo;
