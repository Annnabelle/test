import React, {useEffect} from 'react';
import {Icon, Select, TextInput} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import {DatePicker} from '@gravity-ui/date-components';
import ClientsTableBlock from '../components/ClientsTableBlock';
import './ClientListPage.scss';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllClients, fetchClients} from '../store/clientReducer';

const ClientListPage = () => {
    const dispatch = useDispatch();
    const clients = useSelector(selectAllClients);
    const clientsStatus = useSelector((state) => state.clients.status);
    useEffect(() => {
        if (clientsStatus === 'idle') {
            dispatch(fetchClients());
        }
    }, [clientsStatus, dispatch]);
    return (
        <div className="clients-page">
            <div className="container">
                <div className="box">
                    <div className="p-4 flex justify-between">
                        <div className="search-input">
                            <TextInput
                                placeholder="Номер телефона"
                                size="l"
                                rightContent={<Icon className="pr-2" size="20" data={Magnifier} />}
                            />
                        </div>
                        <div className="select-input">
                            <Select
                                width="max"
                                placeholder="Любой пол"
                                size="l"
                                options={[
                                    {value: '1', content: 'Женский'},
                                    {value: '0', content: 'Мужской'},
                                ]}
                            ></Select>
                        </div>
                        <div className="select-input">
                            <DatePicker className="w-full" size="l" />
                        </div>
                    </div>
                </div>
                <div className="box text-black m-5">
                    <div className="p-4">
                        {clientsStatus === 'succeeded' ? (
                            <ClientsTableBlock clients={clients} />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <p>Loading</p>
                            </div> //TODO: preloader
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ClientListPage;
