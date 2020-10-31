import {createAction, createReducer} from '@reduxjs/toolkit';


export const updateAll = createAction("UPDATE_ALL")
export const updatePerson = createAction("UPDATE_PERSON")
export const updateLar = createAction("UPDATE_LAR")
export const updateSaude = createAction("UPDATE_SAUDE")
export const updateTarefas = createAction("UPDATE_TAREFAS")
export const updateMoradores = createAction("UPDATE_MORADORES")
export const requestStarted = createAction("REQUEST_STARTED");
export const requestSuccess = createAction("REQUEST_SUCCESS");
export const requestFailure = createAction("REQUEST_FAILURE");
export const resetPerson = createAction("RESET_PERSON");

const initialState = {
       empty:true,   
       personal:{

           nome: null,
           sobrenome: null,
           idade: null,
           administrador: null,
           sexo: null,
           saude:null,
           
        }, 
        saude:{
            alergias:null,
            plano:null,
            temPlano:null,
            restricoesAlimentares:null,
            contato:[],
        },    
        lar:{
            nome:null,
            id: null,
        },
        moradores:[],
        tarefas:[],
        fetching:{

            isFetching:false,
            FetchError:false,
            FetchSuccess:false,    
        }    
    
}

export const personalReducer = createReducer(initialState,{
    [updateAll]: (state, action) => {
        
        return state
    },
    [updatePerson] : (state, action) => {
        state.personal = action.payload
        state.empty=false
    
        return state
    },
    [updateLar] : (state, action) => {
        state.lar = action.payload
        return state
    },
    [updateTarefas] : (state, action) => {
        state.tarefas = action.payload
        return state
    },
    [updateSaude] : (state, action) => {
        state.saude = action.payload
        return state
    },
    [updateMoradores] : (state, action) =>{
        state.moradores = action.payload
        return state
    },
    [requestStarted]: (state,action) => {
        state.fetching.isFetching= true
        state.fetching.FetchError = false
        state.fetching.FetchSuccess = true 
        return state
    },
    [requestSuccess ]: (state, action) => {
        state.fetching.FetchError = false
        state.fetching.FetchSuccess = true 
        state.fetching.isFetching = false
        return state
    },
    [requestFailure ]: (state,action) => {
        state.fetching.FetchError = true
        state.fetching.FetchSuccess = false 
        state.fetching.isFetching = false
        return state
    },
    [resetPerson]: (state, action) => {
        state = initialState
        return state
    }
})