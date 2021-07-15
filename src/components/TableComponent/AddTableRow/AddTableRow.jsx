import React, {useState} from 'react';
import { tableHeaders } from '../TableComponent'
import "./AddTableRow.css"

export const AddTableRow = (props) => {
    const {addTableRow} = props;

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fields, setFields] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const isAddTableRowDisabled = Object.keys(fields).find(elem => fields[elem] === '');

    const handleShowForm = () => {
        setIsFormVisible(true);
    };

    const handleHideForm = () => {
        setIsFormVisible(false);
    };

    const handleFieldsChange = (type) => (event) => {
        setFields({
            ...fields,
            [type]: event.target.value
        })
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return re.test(String(phone).toLowerCase());
    };

    const handleAddTableRow = () => {
        if (typeof fields.firstName !== "string") {
            return setErrorMessage('First Name должен быть строкой')
        }
        if (typeof fields.lastName !== "string") {
            return setErrorMessage('Last Name должен быть строкой')
        }
        if (!validateEmail(fields.email)) {
            return setErrorMessage('Не корректный Email')
        }
        if (!validatePhone(fields.phone)) {
            return setErrorMessage('Не корректный Phone')
        }

        setErrorMessage('');
        setFields({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
        handleHideForm();
        addTableRow(fields);
    };

    return (
        <>
            {isFormVisible
                ? <>
                    <table className="tableAdd">
                        <thead>
                        <tr>
                            {tableHeaders.map(tableHeader => tableHeader.type !== 'delete' && (
                                <th key={tableHeader.type}>
                                    <input
                                        id={tableHeader.type}
                                        value={fields[tableHeader.type]}
                                        type={tableHeader.type === "id" ? "number" : "text"}
                                        onChange={handleFieldsChange(tableHeader.type)}
                                    />
                                    <div>{tableHeader.label}</div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                    </table>
                    <div className="error">{errorMessage}</div>
                    <div className="buttonContainer">
                        <div className="tableAddBoxButton">
                            <button
                                onClick={handleAddTableRow}
                                disabled={isAddTableRowDisabled}
                            >
                                Добавить в таблицу
                            </button>
                        </div>
                        <div className="tableAddBoxButton">
                            <button onClick={handleHideForm}>Скрыть</button>
                        </div>
                    </div>
                </>
                : (
                    <div className="tableAddBoxButton">
                        <button onClick={handleShowForm}>Добавить</button>
                    </div>
                )
            }
        </>
    )
}