import arrayMove from 'array-move';
import React, {useState} from "react";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import "./TableComponent.css";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export const tableHeaders = [
    {
        type: "id",
        label: "ID"
    },
    {
        type: "firstName",
        label: "First Name"
    },
    {
        type: "lastName",
        label: "Last Name"
    },
    {
        type: "email",
        label: "Email"
    },
    {
        type: "phone",
        label: "Phone"
    },
    {
        type: "delete",
        label: "Delete"
    },
];

const SortableItem = SortableElement(({user, getTableRow, handleDeleteRow}) =>
    <tr onClick={() => (getTableRow(user))}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
            <button onClick={handleDeleteRow(user.id)}>Delete</button>
        </td>
    </tr>
);

const SortableBody = SortableContainer(({tableDataArray, getTableRow, handleDeleteRow}) => {
    return (
        <tbody>
            {tableDataArray.map((user, index) => (
                <SortableItem
                    key={user.id}
                    index={index}
                    user={user}
                    getTableRow={getTableRow}
                    handleDeleteRow={handleDeleteRow}
                />
            ))
            }
        </tbody>
    );
});

export const TableComponent = (props) => {
    const {
        tableDataArray, filtration, sortingDirection,
        getTableRow, setFilterData, filterData, onDelete, setListData} = props

    const [fieldData, setFieldData] = useState('')

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
    const handleDeleteRow = (id) => () => {
        onDelete(id);
    };

    const onSortEnd = ({oldIndex, newIndex}) => {
        setListData(arrayMove(tableDataArray, oldIndex, newIndex));
    };

    return (
        <table className="table">
            <thead>
            <tr>
                {tableHeaders.map(tableHeader => (
                    <th key={tableHeader.type}>
                        {tableHeader.type !== 'delete' && (
                            <input
                                value={filterData[tableHeader.type]}
                                type={tableHeader.type === "id" ? "number" : "text"}
                                onChange={(event) => handleChangeFilter(tableHeader.type, event)}
                            />
                        )}
                        <div className="thBox" onClick={() => (fieldSortData(tableHeader.type))}>
                            <div>{tableHeader.label}</div>
                            {tableHeader.type === 'delete'
                                ? null
                                : fieldData === tableHeader.type && sortingDirection
                                    ? <ArrowDownwardIcon fontSize={"small"}/>
                                    : <ArrowUpwardIcon fontSize={"small"}/>
                            }
                        </div>
                    </th>
                ))}
            </tr>
            </thead>
            <SortableBody
                tableDataArray={tableDataArray}
                getTableRow={getTableRow}
                handleDeleteRow={handleDeleteRow}
                onSortEnd={onSortEnd}
            />
        </table>
    )
}
