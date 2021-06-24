import * as React from "react";
import { observer } from "mobx-react";
import { FormField } from "@fields/form-field";
import { TextEditor, Action } from "@fields/text-editor-field";
import { useEffect, useRef } from "react";
import { useSuccessModal } from "@hooks/use-success-modal";
import { Box } from "@material-ui/core";
import { LoadingButton } from "@components/loading-button";
import { Save } from "@material-ui/icons";
import { DiscussionModelType, DiscussionReplyModelType } from "@root/models";
import { useToggle } from "@hooks/use-toggle";

export type DiscussionFormProps<
  T extends DiscussionModelType | DiscussionReplyModelType = any
> = {
  onSuccess(): void;
  onLoading?(v: boolean): void;
  initialValues?: Record<string, any>;
  injectInput: Record<string, any>;
  withTitle?: boolean;
  utils: any;
  message: string;
  disableToolbar?: boolean;
};

export const DiscussionForm = observer(
  ({
    utils,
    injectInput,
    withTitle = false,
    onSuccess,
    message,
    onLoading,
    initialValues = {},
    disableToolbar = false,
  }: DiscussionFormProps) => {
    const {
      loading,
      provider: Provider,
      result,
      handler,
      form,
      setFormValue,
    } = utils({
      injectInput,
      initialValue: initialValues,
      inputParser({ content, ...args }: any) {
        return {
          ...args,
          content: JSON.stringify(content),
        };
      },
    });
    const hasV = Object.keys(initialValues).length > 0;
    const [mountForm, { inline }] = useToggle(!hasV);
    useEffect(() => {
      if (hasV) {
        inline(false);
        setFormValue(initialValues);
        inline(true);
      }
    }, [initialValues]);

    useEffect(() => {
      onLoading && onLoading(loading);
    }, [loading]);

    const editorRef = useRef<Action | null>(null);
    useSuccessModal({
      callback() {
        if (editorRef.current) {
          editorRef.current.reset();
        }
        form.reset({});
        onSuccess();
      },
      message,
      depedencies: Boolean(result),
    });
    return !mountForm ? null : (
      <Provider>
        {withTitle ? (
          <Box marginBottom={2}>
            <FormField
              fullWidth
              label="Masukan judul diskusi"
              variant="outlined"
              name="title"
            />
          </Box>
        ) : null}
        <TextEditor
          disableOptions={disableToolbar}
          name="content"
          editorRef={editorRef}
        />
        <Box marginTop={2} textAlign="right">
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handler}
            loading={loading}
            icon={<Save />}
          >
            Simpan
          </LoadingButton>
        </Box>
      </Provider>
    );
  }
);
