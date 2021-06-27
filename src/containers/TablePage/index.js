import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import axios from "axios";
import {Loader} from "../../components/shared/Loader/Loader";
import {TableComponent} from "../../components/TableComponent/TableComponent";
import {DisplayingUserData} from "../../components/TableComponent/DisplayingUserData/DisplayingUserData";
import Pagination from "../../components/Pagination";

import "./tablePage.css";
import {Add} from "@material-ui/icons";
import {AddTableRow} from "../../components/TableComponent/AddTableRow/AddTableRow";

const BASE_URL = 'http://www.filltext.com/?'

function TablePage({onClickBack, query}) {
    const [list, setList] = useState([])
    const [listData, setListData] = useState([])
    const [pressedElem, setPressedElem] = useState('')
    const [filterData, setFilterData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })
    const [loading, setLoading] = useState(false)
    const [sortingDirection, setSortingDirection] = useState(true);
    const [displayingUserData, setDisplayingUserData] = useState('');

    const formatQuery = (obj) => {
        return Object.keys(obj).map((k) => {
            return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
        }).join('&')
    }

    const getList = async () => {
        setLoading(true)
        const {data} = await axios.get(`${BASE_URL}${formatQuery(query)}`)
        setList(data || [])
        setLoading(false)
    }

    const addList = (odj) => {
        const arrResult = [...list];
        arrResult.unshift(odj);
        // console.log('1',list)
        setList(arrResult)
        // console.log('2',list)
    }


    useEffect(() => {
        getList(query)
    }, [])

    const filtration = (pressedItem, isLocal) => {
        const copyStateArray = listData.concat()
        let sortData;
        if (sortingDirection) {
            sortData = copyStateArray.sort((a, b) => a[pressedItem] > b[pressedItem] ? 1 : -1)
        } else {
            sortData = copyStateArray.reverse((a, b) => a[pressedItem] > b[pressedItem] ? 1 : -1)
        }
        if (!isLocal) {
            setListData(sortData)
            setPressedElem(pressedItem)
            setSortingDirection(!sortingDirection)
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

    return (
        <div className="TablePage">
            {loading
                ? <div className="TableLoader">
                    <Loader/>
                </div>
                : <div className="tableBodyContainer">
                    <Button onClick={onClickBack}>назад</Button>
                    <AddTableRow addList={addList}/>
                    <TableComponent
                        filterData={filterData}
                        setFilterData={setFilterData}
                        tableDataArray={getFilteredList(listData)}
                        filtration={filtration}
                        sortingDirection={sortingDirection}
                        getTableRow={getTableRow}
                    />
                    <div className="tableFooterContainer">
                        <DisplayingUserData displayingUserData={displayingUserData}/>
                        <Pagination items={getFilteredList(list)} onChangePage={handleChangePage}/>
                    </div>
                </div>
            }
        </div>
    )
};

export default TablePage;
