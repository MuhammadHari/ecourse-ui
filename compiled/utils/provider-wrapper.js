import { jsx as _jsx } from "react/jsx-runtime";
export const ProviderWrapper = (Provider, Children) => {
    const Wrap = (props) => {
        return (_jsx(Provider, { children: _jsx(Children, Object.assign({}, props), void 0) }, void 0));
    };
    return Wrap;
};
