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
            sortingDirection ? <ArrowDownwardIcon fontSize={"small"}/> : <ArrowUpwardIcon fontSize={"small"}/>
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
                    <input value={filterData.id} type="number" onChange={(event) => handleChangeFilter('id', event)}/>
                    <div className="thBox" onClick={() => (fieldSortData('id'))}>
                        <div>ID</div>
                        {fieldData === 'id' ? <Arrow/> : <Arrow/>}
                    </div>
                </th>
                <th>
                    <input value={filterData.firstName} type="text" onChange={(event) => handleChangeFilter('firstName', event)}/>
                    <div className="thBox" onClick={() => (fieldSortData('firsName'))}>
                        <div>First Name</div>
                        {fieldData === 'firsName' ? <Arrow/> : <Arrow/>}
                    </div>
                </th>
                <th>
                    <input value={filterData.lastName} type="text" onChange={(event) => handleChangeFilter('lastName', event)}/>
                    <div className="thBox" onClick={() => (fieldSortData('lastName'))}>
                        <div>Last Name</div>
                        {fieldData === 'lastName' ? <Arrow/> : <Arrow/>}
                    </div>
                </th>
                <th>
                    <input value={filterData.email} type="text" onChange={(event) => handleChangeFilter('email', event)}/>
                    <div className="thBox" onClick={() => (fieldSortData('email'))}>
                        <div>Email</div>
                        {fieldData === 'email' ? <Arrow/> : <Arrow/>}
                    </div>
                </th>
                <th>
                    <input value={filterData.phone} type="text" onChange={(event) => handleChangeFilter('phone', event)}/>
                    <div className="thBox" onClick={() => (fieldSortData('phone'))}>
                        <div>Phone</div>
                        {fieldData === 'phone' ? <Arrow/> : <Arrow/>}
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
