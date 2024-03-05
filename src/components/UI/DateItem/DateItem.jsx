import React, {useState} from 'react';
import {Button, Icon, Modal, Text, TextInput} from '@gravity-ui/uikit';
import {Clock, Pencil, TrashBin} from '@gravity-ui/icons';
import ActionBox from '../ActionBox/ActionBox';
import {DatePicker} from '@gravity-ui/date-components';
import {locale, dateFormatOptions, timezone} from '../../../config';
import {addDate, deleteDate, updateDateAction} from "../../../store/clientReducer";
import {useDispatch} from "react-redux";
import {dateTimeParse} from "@gravity-ui/date-utils";

const DateItem = ({date}) => {
    const dispatch = useDispatch();
    const [isFormActionBoxOpen, setFormActionBoxOpen] = useState(false);

    const toggleEditForm = (toOpen) => {
        setFormActionBoxOpen(toOpen);
    };

    const [changedDate, setChangedDate] = useState({
        name: date.name,
        date: date.date,
        clientId: date.clientId,
    });

    return (
        <div className=" py-4 flex items-center justify-between border-b border-neutral-200/1">
            <div className="date">
                <Text variant="subheader-2">{date.name}</Text>
                <div className="time flex items-center text-black/[0.7] gap-1">
                    <Icon size={12} data={Clock}></Icon>
                    <Text variant="body-1">
                        {new Date(date.date).toLocaleDateString(locale, {
                            ...dateFormatOptions,
                            year: undefined,
                        })}
                    </Text>
                </div>
            </div>
            <div className="btns flex gap-2">
                <Button
                    view="outlined-info"
                    size="l"
                    onClick={() => {
                        toggleEditForm(true);
                    }}
                >
                    <Icon data={Pencil} size={18} />
                </Button>
                <Button view="normal" size="l"
                        onClick={()=> dispatch(deleteDate(date?.id))}
                >
                    <Icon data={TrashBin} size={18} />
                </Button>
            </div>
            <Modal
                open={isFormActionBoxOpen}
                onClose={() => {
                    toggleEditForm(false);
                }}
            >
                <ActionBox
                    heading="Изменить важную дату"
                    btnCancel="Отменить"
                    btnAction="Добавить"
                    closeForm={() => {
                        toggleEditForm(false);
                    }}
                    buttons={[
                        {
                            text: "Отменить",
                            classList: "ml-4",
                            view: "flat",
                            onCLick: () => toggleEditForm(false)
                        },
                        {
                            text: "Добавить",
                            classList: "ml-4",
                            view: "action",
                            onCLick: () => {
                                if(!(changedDate.clientId && changedDate.date && changedDate.name)) {
                                    return;
                                }
                                dispatch(updateDateAction({dateId: date.id, dateObj: changedDate}));
                                toggleEditForm(false);
                                setChangedDate({
                                    name: '',
                                    date: '',
                                    clientId: '',
                                })
                            }
                        },
                    ]}

                >
                    <div className="flex gap-3 mt-3">
                        <TextInput type="text" label="Текст" size="l" className="my-6 input"
                                   value={changedDate.name}
                                   onChange={(e) => {
                                       setChangedDate({...changedDate, name: e?.target?.value});
                                   }}
                        />
                        <DatePicker label="Дата"
                                    className="w-full my-6 "
                                    size="l"
                                    format={"DD.MM.YYYY"}
                                    defaultValue={dateTimeParse(changedDate.date)}
                                    onUpdate={(value) => {
                                        setChangedDate({...changedDate, date: new Date(value._timestamp).toISOString()});
                                    }}
                        />
                    </div>
                </ActionBox>
            </Modal>
        </div>
    );
};

export default DateItem;
