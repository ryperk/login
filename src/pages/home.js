import React, { useState, useEffect } from "react";
import Table from "../components/table";


const Home = () => {

    const [getUsers, setUsers] = useState([]);

    useEffect(() => {

        function Users() {
            fetch('http://localhost:3001/user/list')
                .then(response => response.json())
                .then(data => { setUsers(data.result) })

        }
        Users();

    }, []);

    return (
        <>
            <p>Users :</p>
            <Table header={['First Name','Last Name','Email']} data={getUsers}/>
        </>
    )
}
export default Home

