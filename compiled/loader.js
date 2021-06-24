import { jsx as _jsx } from "react/jsx-runtime";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as App } from "@providers/app-provider/provider";
import { Routes } from "./routes";
import { SnackbarProvider } from "notistack";
import { toJS } from "mobx";
import "./app.css";
const target = document.getElementById("root");
if (target) {
    ReactDom.render(_jsx(BrowserRouter, { children: _jsx(SnackbarProvider, { children: _jsx(App, { children: _jsx(Routes, {}, void 0) }, void 0) }, void 0) }, void 0), target);
}
window.mobxJson = (data) => {
    let v = toJS(data);
    if (Array.isArray(v)) {
        v = v.map(item => toJS(item));
    }
    console.log(v);
};
export default {};
