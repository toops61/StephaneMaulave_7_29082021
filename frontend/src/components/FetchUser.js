import React, { useState, useEffect } from "react";

export default function FetchUser() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let userLogged = [];

    useEffect(() => {
        const id = (JSON.parse(localStorage.getItem('user'))).id;
        const token = (JSON.parse(localStorage.getItem('user'))).token;
        const url = 'http://localhost:4200/user/' + id;
        //let loginUser = {};

        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        };
        fetch(url, request)
            .then((response) => {
                if (response.ok) {
                    return response.json();

                }
                throw response;
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    if (loading) return "Loading...";
    if (error) return "Error!";
    return (
        <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}

/* export default class FetchUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }
} */