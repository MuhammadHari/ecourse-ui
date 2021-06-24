import * as React from "react";
import {
  AuthUpdateWrapper,
  useAuthMutation,
} from "@providers/app-provider/auth-mutation";
import { FormField } from "@fields/form-field";
import { FileUploadProvider, useFileUpload } from "@fields/file-upload-field";
import { observer } from "mobx-react";
import { LoadingButton } from "@components/loading-button";
import { Save } from "@material-ui/icons";
import { Avatar, Box, Button, Paper } from "@material-ui/core";
import { useApp } from "@providers/app-provider/provider";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const FormContainer = ({ children }: any) => {
  return <Box paddingY={2}>{children}</Box>;
};

const fields = [
  { name: "name", label: "Nama anda" },
  { name: "email", label: "Email anda", type: "email" },
  { name: "password", label: "Password", type: "password" },
  {
    name: "passwordConfirmation",
    label: "Konfirmasi password",
    type: "password",
  },
];

const AvatarField = observer(() => {
  const { previewUrl, clickHandler } = useFileUpload();
  const app = useApp();

  const getSrc = () => {
    if (previewUrl) return previewUrl;
    return app.user?.avatar ?? "";
  };

  return (
    <Box textAlign="center">
      <Box marginBottom={2} display="flex" justifyContent="center">
        <Avatar
          elevation={3}
          component={Paper}
          alt={app.user?.name}
          src={getSrc()}
          style={{ width: 250, height: 250 }}
        />
      </Box>
      <Button
        color="primary"
        onClick={clickHandler}
        variant="contained"
        size="small"
      >
        Pilih avatar
      </Button>
    </Box>
  );
});

const Form = observer(() => {
  const { loading, handler, result } = useAuthMutation();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (result) {
      enqueueSnackbar("Akun anda berhasil di ubah", {variant:"success"});
    }
  }, [result]);

  return (
    <>
      {fields.map((item) => {
        return (
          <FormContainer key={item.name}>
            <FormField variant="outlined" size="small" fullWidth {...item} />
          </FormContainer>
        );
      })}
      <FileUploadProvider name="avatar" accept="image/*">
        <AvatarField />
      </FileUploadProvider>
      <Box marginTop={2}>
        <LoadingButton
          fullWidth
          color="primary"
          variant="contained"
          onClick={handler}
          loading={loading}
          icon={<Save />}
        >
          Simpan
        </LoadingButton>
      </Box>
    </>
  );
});

export const UserForm = AuthUpdateWrapper(Form);
