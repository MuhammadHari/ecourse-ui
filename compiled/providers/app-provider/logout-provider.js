import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useToggle } from "@hooks/use-toggle";
import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Typography, } from "@material-ui/core";
import { useQuery } from "@root/models";
import { LoadingButton } from "@components/loading-button";
import { useEffect } from "react";
import { observer } from "mobx-react";
const Context = React.createContext(null);
export function useLogout() {
    return React.useContext(Context);
}
export const LogoutProvider = observer(({ children, handler: cb }) => {
    const [openDialog, { force }] = useToggle();
    const ctx = {
        openDialog: force(true),
        closeDialog: force(true),
        doLogout: () => alert("doit"),
    };
    const { setQuery, data, loading } = useQuery();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (data && data["logout"]) {
            window.location.reload();
        }
    }, [data]);
    const handler = () => {
        setQuery((q) => q.mutateLogout());
    };
    return (_jsxs(Context.Provider, Object.assign({ value: ctx }, { children: [children, _jsxs(Dialog, Object.assign({ open: openDialog }, { children: [_jsx(DialogTitle, { children: "Konfirmasi logout" }, void 0),
                    _jsxs(DialogContent, { children: [_jsx(Typography, { children: "Apakah anda yakin untuk keluar ?" }, void 0),
                            _jsxs(ButtonGroup, { children: [_jsx(Button, Object.assign({ disabled: loading, onClick: force(false) }, { children: "Tidak" }), void 0),
                                    _jsx(LoadingButton, Object.assign({ onClick: handler, loading: loading, icon: _jsx(_Fragment, {}, void 0) }, { children: "Ya" }), void 0)] }, void 0)] }, void 0)] }), void 0)] }), void 0));
});
