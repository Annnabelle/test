import React, {useEffect, useState} from 'react';
import {Button, Icon, Modal, Pagination, Table, Text, withTableSelection} from '@gravity-ui/uikit';
import {Plus, TrashBin} from '@gravity-ui/icons';
import {useNavigate} from 'react-router-dom';
import ToolBar from '../UI/ToolBar/ToolBar';
import FormCreate from '../UI/FormCreate/FormCreate';
import ActionBox from '../UI/ActionBox/ActionBox';
import './index.scss';
import {locale, dateFormatOptions} from './../../config';
import {addClient, updateClientAction} from "../../store/clientReducer";
import {useDispatch} from "react-redux";

const ClientsTable = withTableSelection(Table);

const columns = [
    {id: 'id', name: '№'},
    {id: 'fullName', name: 'Имя Фамилия'},
    {id: 'gender', name: 'Пол'},
    {id: 'email', name: 'Почта'},
    {id: 'phone', name: 'Телефон'},
    {id: 'birthDate', name: 'День рождения'},
];

const ClientsTableBlock = ({clients}) => {
    const [selectedIds, setSelectedIds] = useState([1]);
    const dispatch = useDispatch();
    const prepareData = (clients) => {
        return clients.map((client) => {
            return {
                id: client.id,
                fullName: <Text variant="body-1">{`${client.firstName} ${client.lastName}`}</Text>,
                gender: (
                    <Text variant="body-1">
                        {client.gender == 0
                            ? 'Мужской'
                            : client.gender == 1
                              ? 'Женский'
                              : 'Не указан'}
                    </Text>
                ),
                email: <Text variant="body-1">{client.email || 'Не указан'}</Text>,
                phone: <Text variant="body-1">{client.phone || 'Не указан'}</Text>,
                birthDate: (
                    <Text variant="body-1">
                        {new Date(client.birthDate).toLocaleDateString(locale, dateFormatOptions) ||
                            ''}
                    </Text>
                ),
            };
        });
    };
    const [data, setData] = useState(prepareData(clients.clients));


    const [isFormActionBoxOpen, setFormActionBoxOpen] = useState(false);
    const [isDeleteActionBoxOpen, setDeleteActionBoxOpen] = useState(false);
    const navigate = useNavigate();

    const toggleFormActionBox = (toOpen) => {
        setFormActionBoxOpen(toOpen);
    };

    const toggleDeleteActionBox = (toOpen) => {
        setDeleteActionBoxOpen(toOpen);
    };

    const onRowClick = (row) => {
        navigate(`/client/${row?.id}`);
    };

    const [newClient, setNewClient] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        email: '',
        birthDate: '',
        address: '',
    })

    return (
        <>
            <ToolBar className="table-header">
                <Button view="outlined-info" size="l" className="mr-4">
                    Export
                </Button>
                <Button
                    view="normal"
                    size="l"
                    className="mr-4"
                    onClick={() => toggleDeleteActionBox(true)}
                >
                    <Icon data={TrashBin} size={18} />
                    Delete
                </Button>
                <Modal open={isDeleteActionBoxOpen} onClose={() => toggleDeleteActionBox(false)}>
                    <ActionBox
                        heading="Вы действительно хотите удалить данного клиента?"
                        btnCancel="Отменить"
                        btnDelete="Удалить"
                        closeForm={() => toggleDeleteActionBox(false)}
                    />
                </Modal>
                <Button
                    view="action"
                    size="l"
                    className="mr-4"
                    onClick={() => toggleFormActionBox(true)}
                >
                    <Icon data={Plus} size={18} />
                    Add
                </Button>
                <Modal open={isFormActionBoxOpen} onClose={() => toggleFormActionBox(false)}>
                    <ActionBox
                        heading="Add client"
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
                                    dispatch(addClient(newClient));
                                    toggleFormActionBox(false);
                                    setNewClient({
                                        firstName: '',
                                        lastName: '',
                                        gender: '',
                                        phone: '',
                                        email: '',
                                        birthDate: '',
                                        address: '',
                                    })
                                }
                            },
                        ]}
                        closeForm={() => toggleFormActionBox(false)}
                    >
                        <div className="flex gap-3 mt-3">
                            <FormCreate client={newClient} setClient={setNewClient} />
                        </div>
                    </ActionBox>
                </Modal>
            </ToolBar>
            <ClientsTable
                data={data}
                columns={columns}
                selectedIds={selectedIds}
                onRowClick={onRowClick}
                onSelectionChange={setSelectedIds}
            />
            <Pagination page={1} pageSize={100} total={1000} className="m-4 justify-end" />
        </>
    );
};

export default ClientsTableBlock;
