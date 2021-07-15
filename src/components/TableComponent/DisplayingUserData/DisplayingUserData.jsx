import React from "react";
import "./DisplayingUserData.css";

export const DisplayingUserData = (props) => {
    const{displayingUserData} = props

    return(
        <div className="box">
            <div>
                <h4>User id:</h4>
                <span>{displayingUserData.id}</span>
            </div>
            <div>
                <h4>User firstName:</h4>
                <span>{displayingUserData.firstName}</span>
            </div>
            <div>
                <h4>User lastName:</h4>
                <span>{displayingUserData.lastName}</span>
            </div>
            <div>
                <h4>User email:</h4>
                <span>{displayingUserData.email}</span>
            </div>
            <div>
                <h4>User phone:</h4>
                <span>{displayingUserData.phone}</span>
            </div>
        </div>
    )
}
