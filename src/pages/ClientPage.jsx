import React, {useState, useEffect} from 'react';
import {ArrowToggle, Button, Modal, Tabs} from '@gravity-ui/uikit';
import ToolBar from '../components/UI/ToolBar/ToolBar';
import Comments from '../components/Comments/Comments';
import Dates from '../components/ListOfDates/ListOfDates';
import UserInfo from '../components/UserInfo/UserInfo';
import TotalCount from '../components/TotalCount/TotalCount';
import ActionBox from '../components/UI/ActionBox/ActionBox';
import HistoryPage from '../components/HistoryTable/HistoryTable';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectClientById,
    selectAllClients,
    fetchClients,
    fetchClientById,
    updateClientAction,
    deleteClient,
} from '../store/clientReducer';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const client = useSelector((state) => selectClientById(state, id));
    const clientsStatus = useSelector((state) => state.clients.status);
    useEffect(() => {
        if (clientsStatus === 'idle') {
            dispatch(fetchClients());
        }
    }, [clientsStatus, dispatch]);

    const [isDeleteActionBoxOpen, setDeleteActionBoxOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('client-cards');

    const toggleDeleteActionBox = (toOpen) => {
        setDeleteActionBoxOpen(toOpen);
    };

    console.log(client);
    return (
        <div className="client-page">
            <ToastContainer />
            <div className="container">
                <ToolBar
                    className="p-4 rounded-2xl mt-10"
                    arrow={<ArrowToggle direction="left" size={30} className="text-black/[0.5]" />}
                >
                    <Button
                        size="l"
                        className="mr-4 bg-red"
                        onClick={() => toggleDeleteActionBox(true)}
                    >
                        Удалить
                    </Button>
                    <Modal
                        open={isDeleteActionBoxOpen}
                        onClose={() => toggleDeleteActionBox(false)}
                    >
                        <ActionBox
                            heading="Вы действительно хотите удалить данного клиента?"
                            buttons={[
                                {
                                    text: 'Отменить',
                                    classList: 'ml-4',
                                    view: 'flat',
                                    onCLick: () => toggleDeleteActionBox(false),
                                },
                                {
                                    text: 'Удалить',
                                    classList: 'bg-red ml-4',
                                    view: '',
                                    onCLick: () => {
                                        dispatch(deleteClient(client.id));
                                        toggleDeleteActionBox(false);
                                        navigate('/clients');
                                    },
                                },
                            ]}
                            closeForm={() => toggleDeleteActionBox(false)}
                        />
                    </Modal>
                    <Button
                        view="action"
                        size="l"
                        className="mr-4"
                        onClick={() => {
                            navigate('/clients');
                        }}
                    >
                        Готово
                    </Button>
                </ToolBar>
                <Tabs
                    activeTab={activeTab}
                    onSelectTab={(tabId) => {
                        setActiveTab(tabId);
                    }}
                    size="xl"
                    items={[
                        {id: 'client-cards', title: 'Данные о клиенте'},
                        {id: 'client-history', title: 'История посещений'},
                    ]}
                />
                <div
                    className={`flex-wrap items-start gap-5 py-5 client-cards-container ${activeTab === 'client-cards' ? 'flex' : 'hidden'}`}
                >
                    <div className="flex flex-col gap-5 cards-column">
                        <UserInfo client={client} />
                        <TotalCount visits={client?.visits} />
                    </div>
                    <div className="flex flex-col gap-5 cards-column">
                        <Comments client={client} clientStatus={clientsStatus} />
                    </div>
                    <div className="flex flex-col gap-5 cards-column">
                        <Dates client={client} />
                    </div>
                </div>
                <div
                    className={`flex-wrap items-start gap-5 p-5 client-cards-container ${activeTab === 'client-history' ? 'flex' : 'hidden'}`}
                >
                    {client ? (
                        <HistoryPage visits={client?.visits} />
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
    );
};

export default ClientPage;
