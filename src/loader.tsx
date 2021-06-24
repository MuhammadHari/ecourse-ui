import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as App } from "@providers/app-provider/provider";
import { Routes } from "./routes";
import { SnackbarProvider } from "notistack";
import { toJS } from "mobx";
import "./app.css";

const target = document.getElementById("root");
if (target) {
  ReactDom.render(
    <BrowserRouter>
      <SnackbarProvider>
        <App>
          <Routes />
        </App>
      </SnackbarProvider>
    </BrowserRouter>,
    target
  );
}

window.mobxJson = (data: any) =>{
  let v = toJS(data);
  if (Array.isArray(v)){
    v = v.map(item=>toJS(item));
  }
  console.log(v);
};

declare global {
  interface Window {
    mobxJson(data: any): void;
  }
}

export default {};
