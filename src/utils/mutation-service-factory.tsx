/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { RootStoreBaseMutations } from "@root-model";
import { AnySchema } from "yup";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import {
  ComponentType,
  createElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { providerWrapperFactory } from "./provider-wrapper-factory";
import { useQuery } from "@root/models";
import voca from "voca";
import { observer } from "mobx-react";
import RootModel = Application.RootModel;

export type Options<
  T,
  MutateKey extends RootStoreBaseMutations,
  Input extends Record<string, any> = any
> = {
  mutation: MutateKey;
  schema:
    | Partial<Record<string, any>>
    | Partial<Record<keyof Input | keyof T, any>>;
};

type FormUtils<In> = {
  form: UseFormReturn<any>;
  handler(e: any): any;
  provider: ComponentType<any>;
  setFormValue(v: Partial<In>): void;
  updateSchema(schema: Record<string, AnySchema>): void;
};
function formUtils<In>(
  schema: Options<any, any>["schema"],
  resolver: (data: any) => void
): FormUtils<In> {
  const [formSchema, setFormSchema] = useState<typeof schema>(schema);
  const form = useForm({
    // @ts-ignore
    resolver: yupResolver(object(formSchema)),
  });
  const setFormValue = (value: Partial<In>) => {
    Object.keys(value).forEach((key) => {
      form.setValue(key, value[key as keyof In]);
    });
  };

  const handler = form.handleSubmit(resolver);
  const provider = useCallback(
    (props: any) =>
      createElement(FormProvider, {
        ...props,
        ...form,
      }),
    []
  );
  return {
    form,
    handler,
    provider,
    setFormValue,
    updateSchema: setFormSchema,
  };
}

type PreOption<In, MutateKey> = {
  initialValue?: Partial<In>;
  mutation?: MutateKey;
  injectInput?: Record<string, any>;
  inputParser?: (input: In) => Promise<Partial<In>> | Partial<In>;
};

export type MutateServiceHookReturn<
  T,
  In,
  MutateKey extends RootStoreBaseMutations
> = FormUtils<In> & {
  loading: boolean;
  updateMutation(K: MutateKey): void;
  resolver(data: In): void;
  result: T | undefined;
  error: any
};
export function mutationServiceFactory<
  T,
  MutateKey extends RootStoreBaseMutations,
  Input extends Record<string, any> = any
>({ schema, mutation: preDefinedMutation }: Options<T, MutateKey, Input>) {
  return ({
    initialValue = {},
    mutation = preDefinedMutation,
    injectInput = {},
    inputParser,
  }: PreOption<Input, MutateKey>): MutateServiceHookReturn<
    T,
    Input,
    MutateKey
  > => {
    const [mutateKey, setMutateKey] = useState<MutateKey>(mutation);
    const { data, setQuery, loading, error } = useQuery();
    const resultKey = voca(mutateKey)
      .replaceAll("mutate", "")
      .camelCase()
      .value();
    const getData = (): T | undefined => {
      if (!data) {
        return undefined;
      }
      return data[resultKey as keyof typeof data] as T;
    };
    const resolver = useCallback(
      async (data: any) => {
        let args = {
          ...data,
          ...injectInput,
        };
        if (inputParser) {
          args = await inputParser(args);
        }
        return setQuery((model: RootModel) => model[mutateKey](args));
      },
      [injectInput, mutateKey]
    );

    const utils = formUtils<Input>(schema, resolver);

    useEffect(() => {
      Object.keys(initialValue).length && utils.setFormValue(initialValue);
    }, [initialValue]);

    return {
      ...utils,
      error,
      loading,
      updateMutation: setMutateKey,
      resolver,
      result: getData(),
    };
  };
}

export function mutationServiceProvider<
  T,
  MutateKey extends RootStoreBaseMutations,
  Input extends Record<string, any> = any
>(
  option: Options<T, MutateKey, Input>,
  getPreoptions: () => PreOption<Input, MutateKey>
) {
  const service = mutationServiceFactory<T, MutateKey, Input>(option);
  const { wrapper, useProvider, Provider } = providerWrapperFactory<
    MutateServiceHookReturn<T, Input, MutateKey>
  >(
    () => {
      const options = getPreoptions();
      return service(options);
    },
    () => true
  );
  const Wrapper = (Component: ComponentType<any>) => {
    const FormContainer = observer((props: any) => {
      const { provider: Provider } = useProvider();
      return (
        <Provider>
          <Component {...props} />
        </Provider>
      );
    });
    return wrapper(FormContainer);
  };
  return {
    wrapper: Wrapper,
    useProvider,
    Provider,
  };
}
