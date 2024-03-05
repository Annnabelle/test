import React from 'react';
import {Select, TextInput} from '@gravity-ui/uikit';
// import {Button, Icon, Select, Text, TextInput} from '@gravity-ui/uikit';
// import {Xmark} from '@gravity-ui/icons';
import {DatePicker} from '@gravity-ui/date-components';
// import './FormEdit.scss';

const FormEdit = () => {
    return (
        <Form className="form-body">
            <div className="inputs flex gap-4">
                <TextInput label="Имя" size="l" className="my-6 input" />
                <TextInput label="Фамилия" size="l" className="my-6 input" />
            </div>
            <div className="inputs flex gap-4">
                <Select label="Пол" size="l" width="max" placeholder="Выбрать" className="my-6">
                    <Option value="val_2">Женский</Option>
                    <Option value="val_3">Мужской</Option>
                </Select>
                <DatePicker label="Дата рождения" className="w-full my-6 " size="l" />
            </div>
            <div className="inputs flex gap-4">
                <TextInput label="Номер телефона" size="l" className="my-6 input" />
                <TextInput label="Почта" size="l" className="my-6 input" />
            </div>
            <div className="inputs">
                <TextInput label="Адрес" size="l" className="my-6 input" />
            </div>
        </Form>
    );
};

export default FormEdit;
