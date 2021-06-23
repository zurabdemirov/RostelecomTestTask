import React, {useState} from "react";
import shortid from 'shortid';
import "./TableComponent.css";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export const TableComponent = (props) => {
    const {
        tableDataArray, filtration, sortingDirection,
        getTableRow, setFilterData, filterData} = props

    const [fieldData, setFieldData] = useState('')

    const Arrow = () => {
        return (
            sortingDirection ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>
        )
    }

    const fieldSortData = (field) => {
        filtration(field)
        setFieldData(field)
    }
    const handleChangeFilter = (type, event) => {
        setFilterData({
            ...filterData,
            [type]: event.target.value
        })
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <th>
                    <input value={filterData.id} type="text" onChange={(event) => handleChangeFilter('id', event)}/>
                    <div onClick={() => (fieldSortData('id'))}>
                        ID
                        {fieldData === 'id' ? <Arrow/> : null}
                    </div>
                </th>
                <th>
                    <input value={filterData.firstName} type="text" onChange={(event) => handleChangeFilter('firstName', event)}/>
                    <div onClick={() => (fieldSortData('firsName'))}>
                        First Name
                        {fieldData === 'firsName' ? <Arrow/> : null}
                    </div>
                </th>
                <th>
                    <input value={filterData.lastName} type="text" onChange={(event) => handleChangeFilter('lastName', event)}/>
                    <div onClick={() => (fieldSortData('lastName'))}>
                        Last Name
                        {fieldData === 'lastName' ? <Arrow/> : null}
                    </div>
                </th>
                <th>
                    <input value={filterData.email} type="text" onChange={(event) => handleChangeFilter('email', event)}/>
                    <div onClick={() => (fieldSortData('email'))}>
                        Email
                        {fieldData === 'email' ? <Arrow/> : null}
                    </div>
                </th>
                <th>
                    <input value={filterData.phone} type="text" onChange={(event) => handleChangeFilter('phone', event)}/>
                    <div onClick={() => (fieldSortData('phone'))}>
                        Phone
                        {fieldData === 'phone' ? <Arrow/> : null}
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
                {tableDataArray.map((element) => (
                    <tr key={shortid.generate()} onClick={() => (getTableRow(element))}>
                        <td>{element.id}</td>
                        <td>{element.firstName}</td>
                        <td>{element.lastName}</td>
                        <td>{element.email}</td>
                        <td>{element.phone}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}
