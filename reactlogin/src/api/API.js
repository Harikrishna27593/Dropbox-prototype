const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        //Mode:'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const dosignup = (payload) =>
    fetch(`${api}/users/dosignup`, {
        method: 'POST',
        //Mode:'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doprofile = (payload) =>
    fetch(`${api}/users/profile`, {
        method: 'POST',
        //Mode:'cors',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

///////////////////////////////////////////////////////////////////////////////////

export const getImages = () =>
    fetch(`${api}/users/getimg`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const getDetails = () =>
    fetch(`${api}/users/getdetails`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const uploadFile = (payload) =>
    fetch(`${api}/users/upload`, {
        method: 'POST',
        //Mode:'cors',
        body: payload,
       // credentials:'include',
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });


export const Logout = () =>
    fetch(`${api}/users/logout`, {
        method: 'POST',
        //Mode:'cors',
        //credentials:'include',
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });


export const showActivity = () =>
    fetch(`${api}/users/showActivity`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });







