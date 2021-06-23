import React, {useEffect, useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
// import {TableComponent} from "./components/TableComponent/TableComponent";
// import {Loader} from "./components/shared/Loader/Loader";
// import {DisplayingUserData} from "./components/TableComponent/DisplayingUserData/DisplayingUserData";

import SelectTypeTablePage from './containers/SelectTypeTablePage'
import TablePage from './containers/TablePage'

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
    const [showTable, setShowTable] = useState(false)
    const [query, setQuery] = useState(DEFAULT_QUERY)

    const handleClickType = (rows, delay) => {
        setShowTable(true)
        setQuery({...query, rows, delay})
    }

    const handleClickBack = () => {
        setShowTable(false)
        setQuery(DEFAULT_QUERY)
    }


    return (
        <div className="App">
            <Router>
                <div className="container">
                    {showTable
                        ? <TablePage
                            query={query}
                            onClickBack={handleClickBack}
                            />
                        : <SelectTypeTablePage onClick={handleClickType}/>
                    }
                </div>
            </Router>
        </div>
    );
}

export default App;
