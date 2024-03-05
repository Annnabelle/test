import React, {useState} from 'react';
import {Icon, Label, Pagination, Table, Text} from '@gravity-ui/uikit';
import {useNavigate} from 'react-router-dom';
import {MapPinPlus, PersonWorker} from '@gravity-ui/icons';
import ToolBar from '../UI/ToolBar/ToolBar';
import {dateFormatOptions, locale} from '../../config';

const HistoryTable = Table;

const columns = [
    {id: 'id', name: '№'},
    {id: 'type', name: 'Тип'},
    {id: 'accountNumber', name: 'Номер счета'},
    {id: 'date', name: 'Дата'},
    {id: 'status', name: 'Статус'},
    {id: 'invoiceAmount', name: 'Сумма счета'},
    {id: 'paid', name: 'Оплачено'},
    {id: 'debt', name: 'Долг'},
];

const HistoryPage = ({visits}) => {
    const formatMoney = (amount) => Intl.NumberFormat(locale).format(amount);

    const prepareData = (visits) => {
        if (!visits){
            return;
        }
        return visits.map((visit) => {
            return {
                id: visit.id,
                type:
                    visit.type === 'visit' ? (
                        <Label icon={<Icon size={13} data={MapPinPlus} />} theme="info">
                            Посещение
                        </Label>
                    ) : (
                        <Label icon={<Icon size={13} data={MapPinPlus} />} theme="info">
                            Доставка
                        </Label>
                    ),
                accountNumber: <Text variant="body-1">{visit.billNumber}</Text>,
                date: (
                    <div className="flex items-center">
                        <Icon size={13} data={MapPinPlus} />
                        <Text variant="body-1">
                            {new Date(visit.date).toLocaleDateString(locale, {
                                ...dateFormatOptions,
                                year: undefined,
                            })}
                        </Text>
                    </div>
                ),
                status: (
                    <Label theme={visit.debt > 0 ? 'danger' : 'success'}>
                        {visit.debt > 0 ? 'Долг' : 'Оплачен'}
                    </Label>
                ),
                invoiceAmount: <Text variant="body-1">{`${formatMoney(visit.amount)} сум`}</Text>,
                paid: <Text variant="body-1">{`${formatMoney(visit.paid)} сум`}</Text>,
                debt:
                    visit.debt > 0 ? (
                        <Text
                            variant="body-1"
                            className={`text-red-500`}
                        >{`${formatMoney(visit.debt)} сум`}</Text>
                    ) : (
                        ' '
                    ),
            };
        });
    };

    const [data, setData] = useState(prepareData(visits));
    const navigate = useNavigate();

    return (
        <div className="box text-black w-full">
            <div className="p-4">
                <ToolBar className="table-header"></ToolBar>
                {data?.length ? (
                    <HistoryTable data={data} columns={columns} />
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
                )}
                <Pagination page={1} pageSize={100} total={1000} className="m-4 justify-end" />
            </div>
        </div>
    );
};

export default HistoryPage;
