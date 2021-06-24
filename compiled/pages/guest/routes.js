import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./home/home";
import { SignUp } from "./register/sign-up";
import { SignIn } from "./login/sign-in";
export const Routes = () => {
    return (_jsxs(Switch, { children: [_jsx(Route, { exact: true, path: "/sign-in", component: SignIn }, void 0),
            _jsx(Route, { exact: true, path: "/sign-up", component: SignUp }, void 0),
            _jsx(Route, { exact: true, path: "/home", component: Home }, void 0),
            _jsx(Route, { path: "*", component: () => _jsx(Redirect, { to: "/home" }, void 0) }, void 0)] }, void 0));
};
