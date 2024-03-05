import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from '@gravity-ui/uikit';
import {DatePicker} from '@gravity-ui/date-components';
import DateItem from '../UI/DateItem/DateItem';
import ActionBox from '../UI/ActionBox/ActionBox';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addDate} from "../../store/clientReducer";

const Dates = ({client}) => {
    const dispatch = useDispatch();

    const [isAddDateModalOpen, setAddDateModalOpen] = useState(false);

    const toggleAddDateModal = (toOpen) => {
        setAddDateModalOpen(toOpen);
    };

    const {id} = useParams();
    const dates = client?.dates;

    const [newDate, setNewDate] = useState({
        name: '',
        date: '',
        clientId: id,
    });
    return (
        <div className="box dates p-4 box-width-one-third">
            <div className="container">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200/1">
                    <div className="heading">
                        <Text variant="subheader-3">Важные даты</Text>
                    </div>
                    <Button
                        view="action"
                        size="l"
                        onClick={() => {
                            toggleAddDateModal(true);
                        }}
                    >
                        Добавить
                    </Button>
                    <Modal
                        open={isAddDateModalOpen}
                        onClose={() => {
                            toggleAddDateModal(false);
                        }}
                    >
                        <ActionBox
                            heading="Добавить важную дату"
                            buttons={[
                                {
                                    text: "Отменить",
                                    classList: "ml-4",
                                    view: "flat",
                                    onCLick: () => toggleAddDateModal(false)
                                },
                                {
                                    text: "Добавить",
                                    classList: "ml-4",
                                    view: "action",
                                    onCLick: () => {
                                        if(!(newDate.clientId && newDate.date && newDate.name)) {
                                            return;
                                        }
                                        dispatch(addDate(newDate));
                                        toggleAddDateModal(false);
                                        setNewDate({
                                            name: '',
                                            date: '',
                                            clientId: id,
                                        })
                                    }
                                },
                            ]}
                            closeForm={()=>toggleAddDateModal(false)}
                        >
                            <div className="flex gap-3 mt-3">
                                <TextInput
                                    label="Название"
                                    size="l"
                                    className="my-6 input"
                                    value={newDate.name}
                                    onChange={(e) => {
                                        setNewDate({...newDate, name: e?.target?.value});
                                    }}
                                />
                                <DatePicker
                                    label="Дата события"
                                    className="w-full my-6 "
                                    size="l"
                                    value={newDate.value}
                                    format={"DD.MM.YYYY"}
                                    onUpdate={(value) => {
                                        setNewDate({...newDate, date: new Date(value._timestamp).toISOString()});
                                    }}
                                />
                            </div>
                        </ActionBox>
                    </Modal>
                </div>
                {dates ? (
                    dates?.map((date) => <DateItem date={date} key={`date-${date.id}`} />)
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
            </div>
        </div>
    );
};

export default Dates;
