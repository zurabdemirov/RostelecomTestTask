import React, {useEffect, useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';

import SelectTypeTablePage from './containers/SelectTypeTablePage'
import TablePage from './containers/TablePage'
import {useDispatch} from "react-redux";
import {getUsers} from "./Redux/userReducer";

const DEFAULT_QUERY = {
    rows: 32,
    id: '{number|1000}',
    firstName: '{firstName}',
    delay: 3,
    lastName: '{lastName}',
    email: '{email}',
    phone: '{phone|(xxx)xxx-xx-xx}',
    address: '{addressObject}',
    description: '{lorem|32}',
}

function App() {
    const dispatch = useDispatch()

    const [showTable, setShowTable] = useState(false)

    const handleGetUsers = (rows, delay) => {
        const query = {...DEFAULT_QUERY, rows, delay}
        dispatch(getUsers(query))
        setShowTable(true)
    }

    const handleClickBack = () => {
        setShowTable(false)
    }

    return (
        <div className="App">
            <Router>
                <div className="container">
                    {showTable
                        ? (
                            <TablePage
                                onClickBack={handleClickBack}
                            />
                        )
                        : <SelectTypeTablePage getUsers={handleGetUsers}/>
                    }
                </div>
            </Router>
        </div>
    );
}

export default App;
