import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {createClient, getClientById, getClients, removeClient, updateClient} from "../data/api/clientAPI"
import {createDate, removeDate, updateDate} from "../data/api/dateAPI";
import {toast} from "react-toastify";
import {createComment} from "../data/api/commentAPI";

const initialState = {
    clients: [],
    status: 'idle',
    error: null
  }

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientAdded: {
          reducer(state, action) {
            state.clients.push(action.payload)
          }
        },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchClients.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchClients.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.clients = action.payload;
        })
        .addCase(fetchClients.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(fetchClientById.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchClientById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.clients = action.payload;
        })
        .addCase(fetchClientById.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(addDate.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(deleteDate.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(updateDateAction.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(updateClientAction.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(addClient.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(deleteClient.fulfilled, (state, action) => {
            state.status = 'idle';
        })
    }
  })

export default clientsSlice.reducer;

export const selectAllClients = state => state.clients

export const selectClientById = (state, id) => state.clients.clients.find((client) => client.id == id)

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    return await getClients();
});


export const fetchClientById = createAsyncThunk('clients/fetchClientById', async (id) => {
    const data = await getClientById(id);
    let dataArray = [];
    dataArray.push(data);
    return dataArray;
});
export const addDate = createAsyncThunk('clients/addDate', async (newDate) => {
    try{
        const result = await createDate(newDate);
        toast.success("Дата добавлена!")
        return result;
    }
    catch(e){
        toast.error('Что-то пошло не так')
    }
});
export const deleteDate = createAsyncThunk('clients/deleteDate', async (dateId) => {
    try{
        const result = await removeDate(dateId);
        toast.success("Дата удалена!")
        return result;
    }
    catch(e){
        toast.error('Что-то пошло не так')
    }
});
export const updateDateAction = createAsyncThunk('clients/updateDateAction', async ({dateId, dateObj}) => {
    try{
        const result = await updateDate(dateId, dateObj);
        toast.success("Дата обновлена!")
        return result;
    }
    catch(e){
        toast.error('Что-то пошло не так')
    }
});
export const addComment = createAsyncThunk('clients/addComment', async (newComment) => {
    try{
        const result = await createComment(newComment);
        toast.success("Комментарий добавлен!")
        return result;
    }
    catch(e){
        toast.error('Что-то пошло не так')
    }
});
export const updateClientAction = createAsyncThunk('clients/updateClientAction', async ({clientId, clientObj}) => {
    try{
        const result = await updateClient(clientId, clientObj);
        toast.success("Данные обновлены!")
        return result;
    }
    catch(e){
        toast.error('Что-то пошло не так')
    }
});
export const addClient = createAsyncThunk('clients/addClient', async (clientObj) => {
    try{
        const result = await createClient(clientObj);
        toast.success("Клиент добавлен!")
        return result;
    }
    catch(e){
        toast.error('Что-то пошло не так')
    }
});
export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientId) => {
    try{
        const result = await removeClient(clientId);
        toast.success("Клиент удален!")
        return result;
    }
    catch(e){
        toast.error('Что-то пошло не так')
    }
});