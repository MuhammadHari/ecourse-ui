import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { observer } from "mobx-react";
export function providerWrapperFactory(useProviderValue, useShouldRenderChild) {
    const Context = createContext(null);
    const Provider = observer(({ children }) => {
        const ctx = useProviderValue();
        const renderChild = useShouldRenderChild ? useShouldRenderChild(ctx) : true;
        return (_jsx(Context.Provider, Object.assign({ value: ctx }, { children: renderChild ? children : null }), void 0));
    });
    const useProvider = () => {
        return useContext(Context);
    };
    const wrapper = (Comp) => {
        return (p) => {
            return (_jsx(Provider, { children: _jsx(Comp, Object.assign({}, p), void 0) }, void 0));
        };
    };
    return { Provider, useProvider, wrapper };
}
