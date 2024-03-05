import {API_BASE_URL} from "../../config";

export const getClients = async (params) => {
    const response = await fetch(`${API_BASE_URL}/clients?_embed=comments&_embed=dates&_embed=visits`);
    return await response.json();
}

export const getClientById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}?_embed=comments&_embed=dates&_embed=visits`);
    return await response.json();
}


export const createClient = async (clientObj) => {
    if(!(clientObj.firstName && clientObj.lastName)){
        return false;
    }
    const response = await fetch(`${API_BASE_URL}/clients/`,{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(clientObj),
    });
    return await response.json();
}
export const updateClient = async (clientId, clientObj) => {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}`,{
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(clientObj),

    });
    return await response.json();
}
export const removeClient = async (clientId) => {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}`,{
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
    });
    return await response.json();
}
