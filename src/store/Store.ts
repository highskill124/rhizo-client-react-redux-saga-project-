import { applyMiddleware, createStore, compose, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';
import { SagaWatcher } from './saga/SagaWatcher';
import { RootReducer } from './state/RootReducer';
import { setTransform } from './transform/Transform';

// const initialState = {};
const middlewares: Array<Middleware> = [];
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['navigation'],
    stateReconciler: hardSet,
    transforms: [setTransform],
};

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
}

middlewares.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middlewares));
const persistedReducer = persistReducer(persistConfig, RootReducer());

export const configureStore = () => {
    // const Store = createStore(persistedReducer, compose(...enhancers));
    const Store = createStore(RootReducer(), compose(...enhancers));
    sagaMiddleware.run(SagaWatcher);
    const Persistor = persistStore(Store);

    if (process.env.NODE_ENV !== 'production') {
        (window as any).Store = Store;
    }

    return { Store, Persistor };
};
