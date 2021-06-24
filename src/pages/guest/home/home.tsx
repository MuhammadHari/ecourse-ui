import * as React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { mutationServiceProvider } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations, RootStoreBaseQueries } from "@root-model";
import { string } from "yup";
import { FormField } from "@fields/form-field";
import { LoadingButton } from "@components/loading-button";
import { LockOpen } from "@material-ui/icons";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useNavigate } from "@hooks/use-navigate";
import { useApp } from "@providers/app-provider/provider";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { UserModelType } from "@root/models";
import { observer } from "mobx-react";

const fields = [
  { name: "email", type: "email", label: "Alamat email" },
  { name: "password", type: "password", label: "Kata sandi" },
];

const utils = mutationServiceProvider(
  {
    mutation: RootStoreBaseMutations.mutateLogin,
    schema: {
      email: string().required(),
      password: string().required(),
    },
  },
  () => ({})
);

const useLogin = utils.useProvider;

const Node = observer(() => {
  const { navigateHandler } = useNavigate();
  const { handler, loading, result, error } = useLogin();
  const app = useApp();

  const isCredentialWrong = (typeof result === "boolean" && !result) || error;

  const [user, { fetch }] = useFetchQuery<UserModelType>({
    queryKey: RootStoreBaseQueries.queryAuth,
  });
  const showModal = useSuccessModal({
    callback: navigateHandler("/dashboard"),
    depedencies: Boolean(result),
    disableAutoShow: true,
    message: !user ? "" : `Welcome ${user.name}`,
  });
  React.useEffect(() => {
    if (user) {
      app.updateUser(user);
      showModal();
    }
  }, [user]);
  React.useEffect(() => {
    if (result) {
      fetch({});
    }
  }, [result]);
  return (
    <Paper style={{ width: "40%" }}>
      <Box padding={1}>
        <Typography align="center" variant="h3">
          Selamat datang
        </Typography>
        <Typography align="center">Silahkan login</Typography>
        <form onSubmit={handler}>
          {fields.map(({ name, ...rest }) => (
            <Box paddingY={3} key={name}>
              <FormField
                fullWidth
                variant="filled"
                name={name}
                InputProps={{
                  disableUnderline: true,
                }}
                {...rest}
              />
            </Box>
          ))}
          <div>
            {isCredentialWrong ? (
              <Typography>Kombinasi email dan password salah</Typography>
            ) : null}
            <LoadingButton
              loading={loading}
              icon={<LockOpen />}
              variant="outlined"
              color="primary"
              type="submit"
            >
              Login
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Paper>
  );
});

export const Home = utils.wrapper(Node);
