import {configureStore} from '@reduxjs/toolkit';
import {personalReducer} from './reducers/personal_data_reducers'
const rootReducer = {
    person: personalReducer,
    
}
export const store = configureStore({
    reducer: rootReducer,
})