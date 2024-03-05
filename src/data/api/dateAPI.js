import {API_BASE_URL} from "../../config";


export const createDate = async (dateObj) => {
    if(!(dateObj.clientId && dateObj.date && dateObj.name)){
        return false;
    }
    const response = await fetch(`${API_BASE_URL}/dates/`,{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(dateObj),
    });
    return await response.json();
}
export const removeDate = async (dateId) => {
    const response = await fetch(`${API_BASE_URL}/dates/${dateId}`,{
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
    });
    return await response.json();
}
export const updateDate = async (dateId, dateObj) => {
    const response = await fetch(`${API_BASE_URL}/dates/${dateId}`,{
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(dateObj),

    });
    return await response.json();
}