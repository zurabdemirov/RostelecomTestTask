import React, {useState} from 'react';
import "./AddTableRow.css"

export const AddTableRow = (props) => {
    const {addList} = props

    const [click,setClick] = useState(false)
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const objectNewUser = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
    }

    const eddElementThUser = (event) => {
        if (event.target.id === 'id') {
            setId(event.target.value);
        } else if (event.target.id === 'firstName') {
            setFirstName(event.target.value);
        } else if (event.target.id === 'lastName') {
            setLastName(event.target.value);
        } else if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else if (event.target.id === 'phone') {
            setPhone(event.target.value);
        }
    }

    return (
        <>
            {click
                ? <>
                    <table className="tableAdd">
                        <thead>
                        <tr>
                            <th>
                                <input id={'id'} value={id} type="number" onChange={eddElementThUser}/>
                                <div>id</div>
                            </th>
                            <th>
                                <input id={'firstName'} type="text" onChange={eddElementThUser}/>
                                <div>firstName</div>
                            </th>
                            <th>
                                <input id={'lastName'} type="text" onChange={eddElementThUser}/>
                                <div>lastName</div>
                            </th>
                            <th>
                                <input id={'email'} type="text" onChange={eddElementThUser}/>
                                <div>email</div>
                            </th>
                            <th>
                                <input id={'phone'} type="text" onChange={eddElementThUser}/>
                                <div>phone</div>
                            </th>
                        </tr>
                        </thead>
                    </table>
                    <div className="tableAddBoxButton">
                        <button onClick={() => (addList(objectNewUser))}>добавить в таблицу</button>
                    </div>
                </>
                :   <div className="tableAddBoxButton">
                <button onClick={() => (setClick(true))}>добавить</button>
                </div>
            }
        </>
    )
}