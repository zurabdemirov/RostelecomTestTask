import React from "react";
import {Button} from "@material-ui/core";

function SelectTypeTablePage({getUsers}) {

    const handleClick = (type) => {
        let rows = 32;
        let delay = 0
        if (type === 'large'){
            rows = 1000;
            delay = 3;
        }
        return getUsers(rows, delay)
    }

    return (
        <div className="SelectTypeTablePage">
            <Button onClick={() => handleClick('small')}>Маленький объем данных</Button>
            <Button onClick={() => handleClick('large')}>Большой объем данных</Button>
        </div>
    );
}

export default SelectTypeTablePage;
