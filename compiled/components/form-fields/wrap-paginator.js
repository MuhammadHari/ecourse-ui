import { jsx as _jsx } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { PaginatorProvider, usePaginator } from "@hooks/use-paginator";
export const WrapPaginator = ({ Component, ...options }) => {
    const Node = observer((props) => {
        const ctx = usePaginator(options);
        return (_jsx(PaginatorProvider.Provider, Object.assign({ value: ctx }, { children: _jsx(Component, Object.assign({}, props), void 0) }), void 0));
    });
    return Node;
};
