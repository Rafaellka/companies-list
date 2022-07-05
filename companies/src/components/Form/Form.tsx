import React from 'react';
import {useForm, Controller, FieldValues} from "react-hook-form";
import {Button, Input, TextField} from "@mui/material";
import './Form.css';
import {useAppAction, useAppSelector} from "../../hooks/hooks";
import {ICompamyInfo} from "../../types/types";
import {getCurrentRows} from "../../redux/reducers/tableReducer";

interface IFormProps {
    close: () => void;
}

export const Form: React.FC<IFormProps> = ({close}) => {
    const {addNewRow} = useAppAction();
    const rows = useAppSelector(getCurrentRows);
    const {
        control,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data: FieldValues) => {
        const sameRow = rows.find(row => data.INN === row.INN);
        if (!sameRow) addNewRow(data as ICompamyInfo);
        reset();
        close();
    }

    return (
        <form
            className='container'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div style={{fontSize: '1.1em'}}>Введите информацию об организации</div>
            <Controller
                render={({field, fieldState: {error}}) => (
                    <>
                        <TextField
                            variant="standard"
                            label="ИНН"
                            autoComplete="off"
                            {...field}
                        />
                        {error && <div className='error'>{error.message}</div>}
                    </>
                )}
                name="INN"
                control={control}
                defaultValue=""
                rules={{required: 'Поле обязательно к заполнению'}}
            />
            <Controller
                render={({field, fieldState: {error}}) =>
                    <>
                        <TextField
                            variant="standard"
                            label="Наименование"
                            autoComplete="off"
                            {...field}
                        />
                        {error && <div className='error'>{error.message}</div>}
                    </>
                }
                name="name"
                control={control}
                defaultValue=""
            />
            <Controller
                render={({field, fieldState: {error}}) => (
                    <>
                        <TextField
                            variant="standard"
                            label="Адрес"
                            autoComplete="off"
                            {...field}
                        />
                        {error && <div className='error'>{error.message}</div>}
                    </>
                )}
                name="address"
                control={control}
                defaultValue=""
            />
            <Controller
                render={({field, fieldState: {error}}) => (
                    <>
                        <TextField
                            variant="standard"
                            label="ОГРН"
                            autoComplete="off"
                            {...field}
                        />
                        {error && <div className='error'>{error.message}</div>}
                    </>
                )}
                name="OGRN"
                control={control}
                defaultValue=""
            />
            <Controller
                render={({field}) => (
                    <Input
                        type="date"
                        {...field}
                    />
                )}
                name="date"
                control={control}
                defaultValue=""
            />
            <Button type="submit" variant="outlined" color='primary'>Отправить</Button>
        </form>
    );
};
