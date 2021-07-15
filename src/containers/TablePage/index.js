import React, { useState} from "react";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../../components/shared/Loader/Loader";
import {TableComponent} from "../../components/TableComponent/TableComponent";
import {DisplayingUserData} from "../../components/TableComponent/DisplayingUserData/DisplayingUserData";
import Pagination from "../../components/Pagination";
import {AddTableRow} from "../../components/TableComponent/AddTableRow/AddTableRow";

import "./tablePage.css";
import {setUsers} from "../../Redux/userReducer";

function TablePage({onClickBack, query}) {
    const userList = useSelector(state =>  state.users.data)
    const isLoading = useSelector(state => state.users.isLoading)
    const dispatch = useDispatch()

    const [listData, setListData] = useState([])
    const [pressedElem, setPressedElem] = useState('')
    const [filterData, setFilterData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [sortingDirection, setSortingDirection] = useState(true);
    const [displayingUserData, setDisplayingUserData] = useState('');

    const handleAddTableRow = (newRow) => {
        dispatch(setUsers([newRow, ...userList]))
        setListData([newRow, ...listData]);
    }

    const filtration = (pressedItem, isLocal) => {
        const copyStateArray = listData.slice()
        let sortData;
        if (!sortingDirection || pressedElem !== pressedItem) {
            sortData = copyStateArray.sort((a, b) => a[pressedItem] > b[pressedItem] ? -1 : 1)
        } else {
            sortData = copyStateArray.sort((a, b) => a[pressedItem] > b[pressedItem] ? 1 : -1)
        }
        if (!isLocal) {
            setListData(sortData)
            setPressedElem(pressedItem)
            setSortingDirection(pressedElem !== pressedItem || !sortingDirection)
        } else {
            return sortData
        }
    }

    const getTableRow = (row) => {
        setDisplayingUserData(row)
    }

    const handleChangePage = (data) => {
        setListData(data)
    }

    const getFilteredList = (data) => {
        let filteredList = [...data]
        Object.keys(filterData).map(item => {
            if (filterData[item] !== '') {
                filteredList = filteredList.filter(elem => {
                    return String(elem[item]).toLocaleLowerCase().indexOf(filterData[item].toLocaleLowerCase()) !== -1
                })
            }
        })
        return filteredList
    }

    const handleDelete = (id) => {
        const newList = userList.filter(user => user.id !== id);
        dispatch(setUsers(newList))
        const newListData = listData.filter(user => user.id !== id);
        setListData(newListData);
    }

    return (
        <div className="TablePage">
            {isLoading
                ? (
                    <div className="TableLoader">
                        <Loader/>
                    </div>
                ) : (
                    <div className="tableBodyContainer">
                        <Button onClick={onClickBack}>назад</Button>
                        <AddTableRow addTableRow={handleAddTableRow}/>
                        <TableComponent
                            filterData={filterData}
                            setFilterData={setFilterData}
                            tableDataArray={getFilteredList(listData)}
                            filtration={filtration}
                            sortingDirection={sortingDirection}
                            getTableRow={getTableRow}
                            onDelete={handleDelete}
                        />
                        <div className="tableFooterContainer">
                            <DisplayingUserData displayingUserData={displayingUserData}/>
                            <Pagination items={getFilteredList(userList)} onChangePage={handleChangePage}/>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default TablePage;
