import {API_BASE_URL} from "../../config";

export const getComments = async (params) => {
    const response = await fetch(`${API_BASE_URL}/comments`);
    return await response.json();
}

export const getCommentsByClientId = async (clientId) => {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`);
    return await response.json();
}

export const createComment = async (commentObj) => {
    if(!(commentObj.clientId && commentObj.text)){
        return false;
    }
    commentObj.date = new Date().toISOString();
    const response = await fetch(`${API_BASE_URL}/comments/`,{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(commentObj),
    });
    return await response.json();
}