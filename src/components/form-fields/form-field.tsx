import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { InputAdornment, TextField, TextFieldProps } from "@material-ui/core";
import voca from "voca";
import { AttachMoney, Money } from "@material-ui/icons";

type Props = Omit<TextFieldProps, "onChange"> & {
  controller?: ReturnType<typeof useController> | null;
  onChange(e: any): void;
};

const intl = new Intl.NumberFormat("ID");

class Field extends React.Component<Props> {
  parseMoneyValue = (v: string) => {
    if (!v) return 0;
    const value = voca(v).replaceAll(".", "").value();
    return parseFloat(value);
  };

  getMoneyValue = (v: string) => {
    const value = voca(v).replaceAll(".", "").value();
    if (!voca(value).isDigit() || !value) {
      return intl.format(parseInt("0"));
    }
    return intl.format(this.parseMoneyValue(value));
  };

  getValue = () => {
    const { type = "text", select, controller } = this.props;
    switch (type) {
      case "number": {
        return 0;
      }
      case "money": {
        let v: number = 0;
        if (this.props.controller) {
          const { field } = this.props.controller;
          v = field.value ?? 0;
        }
        if (this.props.value !== undefined && !this.props.controller) {
          v = this.props.value as number;
        }
        return this.getMoneyValue(v.toString());
      }
      default: {
        if (select) {
          return "__default__";
        }
        if (controller) {
          const { value } = controller.field;
          if (!(value instanceof File)) {
            return value ?? "";
          }
        }
        return this.props.value ?? "";
      }
    }
  };

  handleChange = (e: any) => {
    const value =
      this.props.type === "money"
        ? this.parseMoneyValue(e.target.value)
        : e.target.value;
    const { onChange } = this.props;
    onChange && onChange(value);
    if (this.props.controller) {
      this.props.controller.field.onChange(value);
    }
  };

  propBuilder = (): TextFieldProps => {
    const { controller, ...rest } = this.props;
    const base: any = {
      onChange: (e: any) => this.handleChange(e),
      value: this.getValue(),
    };
    if (rest.type === "money") {
      base.InputProps = {
        ...(rest.InputProps ?? {}),
        startAdornment: (
          <InputAdornment position="start">
            <AttachMoney fontSize="small" style={{ height: 20 }} />
          </InputAdornment>
        ),
      };
    }
    if (controller) {
      const {
        field: { ref, ...inputProps },
        fieldState,
      } = controller;
      if (fieldState.error) {
        const { message } = fieldState.error;
        base.helperText = message;
        base.error = true;
      }
      base.onChange = (e: any) => {
        inputProps?.onChange(e);
        this.handleChange(e);
      };
      return {
        ...rest,
        ...inputProps,
        ...base,
        inputRef: ref,
        inputProps: {
          ...(rest.inputProps ?? {}),
        },
      } as TextFieldProps;
    }
    return { ...rest, ...base } as TextFieldProps;
  };

  render() {
    return <TextField {...this.propBuilder()} />;
  }
}

// export type Option = { label: React.ReactNode; value: any };

export type FormFieldProps = Omit<TextFieldProps, "name" | "onChange"> & {
  name: string;
  noUseForm?: boolean;
  onChange?(e: any): void;
};

export const FormField = ({ noUseForm, ...rest }: FormFieldProps) => {
  const form = useFormContext();
  if (!form && !noUseForm && !rest.onChange) {
    throw new Error("Please provide onChange props if without use useForm");
  }
  if (noUseForm) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Field {...(rest as Props)} />;
  }
  const controller = useController({
    name: rest.name,
    control: form.control,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Field controller={controller} {...(rest as Props)} />;
};
