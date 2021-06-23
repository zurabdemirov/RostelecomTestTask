import React from "react";
import "./DisplayingUserData.css";

export const DisplayingUserData = (props) => {
    const{displayingUserData} = props

    return(
        <div className="box">
            <div><h4>User id:</h4>{displayingUserData.id}</div>
            <div><h4>User firstName:</h4>{displayingUserData.firstName}</div>
            <div><h4>User lastName:</h4>{displayingUserData.lastName}</div>
            <div><h4>User email:</h4>{displayingUserData.email}</div>
            <div><h4>User phone:</h4>{displayingUserData.phone}</div>
        </div>
    )
}
