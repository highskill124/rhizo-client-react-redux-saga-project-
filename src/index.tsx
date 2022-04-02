import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import './index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { configureStore } from './store/Store';
import muiTheme from './settings/material-ui-theme';
import { theme } from './style-guide/Theme';
import { requestMenuList } from './store/state/MenuState';
import { GlobalStyle } from './ui-kit/core/GlobalStyle';
import FlashMessageProvider from './page/common/UIFlashMessage';

const { Store, Persistor } = configureStore();

// Store.dispatch(requestMenuList());

ReactDOM.render(
    // <React.StrictMode>
    <Provider store={Store}>
        {/* <PersistGate persistor={Persistor}> */}
        <MUIThemeProvider theme={muiTheme}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <App />
            </ThemeProvider>
        </MUIThemeProvider>
        {/* </PersistGate> */}
    </Provider>,
    // </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
