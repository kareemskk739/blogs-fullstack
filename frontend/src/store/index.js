import { configureStore} from "@reduxjs/toolkit"

import { persistStore, persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import myReducer from '../mySlice'

import authReducer from '../authSlice'

import adminreducer from '../AdminSlice'


const persistConfig={
    key:'root',
    storage
}
const persistedDataReducer=persistReducer(persistConfig,myReducer)
const persistedAuthReducer=persistReducer(persistConfig,authReducer)
const persistedAdminReducer=persistReducer(persistConfig,adminreducer)
const myStore=configureStore({
    reducer:{
        myReducer:persistedDataReducer,
        authReducer:persistedAuthReducer,
        adminreducer:persistedAdminReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
}
    
)

export const persistedStore =persistStore(myStore)
export default myStore