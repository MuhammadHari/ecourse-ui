import { jsx as _jsx } from "react/jsx-runtime";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import { createElement, useCallback, useEffect, useState, } from "react";
import { providerWrapperFactory } from "./provider-wrapper-factory";
import { useQuery } from "@root/models";
import voca from "voca";
import { observer } from "mobx-react";
function formUtils(schema, resolver) {
    const [formSchema, setFormSchema] = useState(schema);
    const form = useForm({
        // @ts-ignore
        resolver: yupResolver(object(formSchema)),
    });
    const setFormValue = (value) => {
        Object.keys(value).forEach((key) => {
            form.setValue(key, value[key]);
        });
    };
    const handler = form.handleSubmit(resolver);
    const provider = useCallback((props) => createElement(FormProvider, {
        ...props,
        ...form,
    }), []);
    return {
        form,
        handler,
        provider,
        setFormValue,
        updateSchema: setFormSchema,
    };
}
export function mutationServiceFactory({ schema, mutation: preDefinedMutation }) {
    return ({ initialValue = {}, mutation = preDefinedMutation, injectInput = {}, inputParser, }) => {
        const [mutateKey, setMutateKey] = useState(mutation);
        const { data, setQuery, loading } = useQuery();
        const resultKey = voca(mutateKey)
            .replaceAll("mutate", "")
            .camelCase()
            .value();
        const getData = () => {
            if (!data) {
                return undefined;
            }
            return data[resultKey];
        };
        const resolver = useCallback(async (data) => {
            let args = {
                ...data,
                ...injectInput,
            };
            if (inputParser) {
                args = await inputParser(args);
            }
            return setQuery((model) => model[mutateKey](args));
        }, [injectInput, mutateKey]);
        const utils = formUtils(schema, resolver);
        useEffect(() => {
            Object.keys(initialValue).length && utils.setFormValue(initialValue);
        }, [initialValue]);
        return {
            ...utils,
            loading,
            updateMutation: setMutateKey,
            resolver,
            result: getData(),
        };
    };
}
export function mutationServiceProvider(option, getPreoptions) {
    const service = mutationServiceFactory(option);
    const { wrapper, useProvider, Provider } = providerWrapperFactory(() => {
        const options = getPreoptions();
        return service(options);
    }, () => true);
    const Wrapper = (Component) => {
        const FormContainer = observer((props) => {
            const { provider: Provider } = useProvider();
            return (_jsx(Provider, { children: _jsx(Component, Object.assign({}, props), void 0) }, void 0));
        });
        return wrapper(FormContainer);
    };
    return {
        wrapper: Wrapper,
        useProvider,
        Provider,
    };
}
