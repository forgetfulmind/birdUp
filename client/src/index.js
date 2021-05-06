import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import applicationStore from "./framework/redux/ApplicationStore"


ReactDOM.render(
    <Provider store={applicationStore}>
    <App />
    </Provider>,
document.getElementById("root")
);


//if(dev team want app to work offline){change to .register()}
serviceWorker.unregister()