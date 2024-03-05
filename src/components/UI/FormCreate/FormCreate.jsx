import React, {useState} from 'react';
import {Select, TextInput} from '@gravity-ui/uikit';
import {DatePicker} from '@gravity-ui/date-components';
import './FormCreate.scss';
import {dateTimeParse} from "@gravity-ui/date-utils";

const FormCreate = ({client,setClient}) => {
    return (
        <>
            <form className="form-body">
                <div className="inputs flex gap-4">
                    <TextInput
                        type="text"
                        value={client.firstName}
                        onChange={(e) => setClient({...client, firstName: e.target.value})}
                        label="Имя"
                        size="l"
                        className="my-6 input"
                    />
                    <TextInput
                        type="text"
                        value={client.lastName}
                        onChange={(e) => setClient({...client, lastName: e.target.value})}
                        label="Фамилия"
                        size="l"
                        className="my-6 input"
                    />
                </div>
                <div className="inputs flex gap-4">
                    <Select
                        defaultValue={['Мужской']}
                        onUpdate={(e) =>{
                            setClient({...client, gender: e[0]})
                        }}
                        label="Пол"
                        size="l"
                        width="max"
                        placeholder="Выбрать"
                        className="my-6"
                    >
                        <Option value="1">Женский</Option>
                        <Option value="0">Мужской</Option>
                    </Select>
                    <DatePicker
                        format={"DD.MM.YYYY"}
                        defaultValue={dateTimeParse(client.birthDate)}
                        onUpdate={(value) => setClient({...client, birthDate: new Date(value._timestamp).toISOString()})}
                        label="Дата рождения"
                        cl
                        assName="w-full my-6 "
                        size="l"
                    />
                </div>
                <div className="inputs flex gap-4">
                    <TextInput
                        type="phone"
                        value={client.phone}
                        onChange={(e) => setClient({...client, phone: e.target.value})}
                        label="Номер телефона"
                        size="l"
                        className="my-6 input"
                    />
                    <TextInput
                        type="email"
                        value={client.email}
                        onChange={(e) => setClient({...client, email: e.target.value})}
                        label="Почта"
                        size="l"
                        className="my-6 input"
                    />
                </div>
                <div className="inputs">
                    <TextInput
                        type="text"
                        value={client.address}
                        onChange={(e) => setClient({...client, address: e.target.value})}
                        label="Адрес"
                        size="l"
                        className="my-6 input"
                    />
                </div>
            </form>
        </>
    );
};

export default FormCreate;
