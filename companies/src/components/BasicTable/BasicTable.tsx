import React from 'react';
import {
    Button,
    Paper,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {ICompamyInfo} from "../../types/types";
import {getCurrentRows} from "../../redux/reducers/tableReducer";
import {useAppSelector, useAppAction} from "../../hooks/hooks";
import RemoveIcon from '@mui/icons-material/Remove';
import {Editable} from "../Editable/Editable";
import {useGetInfoByINNMutation} from "../../services/companyService";

export const BasicTable: React.FC = () => {
    const rows: ICompamyInfo[] = useAppSelector(getCurrentRows);
    const {fillRow, removeRow, changeAddress} = useAppAction();
    const [getInfoByINN, _] = useGetInfoByINNMutation();

    const onClick = async (INN: string) => {
        const result = await getInfoByINN(INN);
        //@ts-ignore
        const info = result.data.suggestions[0];
        const newRow: ICompamyInfo = {
            name: info.value,
            address: info.data.address.value,
            INN: INN,
            OGRN: info.data.ogrn,
            //Информация о дате регистрации не приходит, поэтому поставлю текущую дату
            date: new Date()
        }
        fillRow(newRow);
    }

    return (
        //просто обертка над стандартными тегами
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="companies">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{
                            width: '19%'
                        }}>ИНН</TableCell>
                        <TableCell sx={{
                            width: '19%'
                        }}>Наименование</TableCell>
                        <TableCell sx={{
                            width: '19%'
                        }}>Адрес</TableCell>
                        <TableCell sx={{
                            width: '19%'
                        }}>ОГРН</TableCell>
                        <TableCell sx={{
                            width: '18%'
                        }}>Дата регистрации</TableCell>
                        <TableCell sx={{
                            width: '6%'
                        }}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>
                                {row.INN}
                                <Button
                                    sx={{ml: 2}}
                                    variant='outlined'
                                    size="small"
                                    onClick={() => onClick(row.INN)}
                                >
                                    Загрузить
                                </Button>
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <Editable text={row.address}>
                                    <TextField
                                        variant='standard'
                                        autoFocus={true}
                                        value={row.address}
                                        onChange={(e) => {
                                            changeAddress({
                                                newAddress: e.target.value,
                                                company: row
                                            })
                                        }}
                                    />
                                </Editable>
                            </TableCell>
                            <TableCell>{row.OGRN}</TableCell>
                            <TableCell>{row.date.toString()}</TableCell>
                            <TableCell>
                                <Button onClick={() => removeRow(row)}><RemoveIcon/></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}