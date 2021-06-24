import {
  mutationServiceFactory,
  mutationServiceProvider,
} from "@utils/mutation-service-factory";
import { mixed, ref, string } from "yup";
import { RootStoreBaseMutations } from "@root-model";
import { useApp } from "@providers/app-provider/provider";

const utils = mutationServiceProvider(
  {
    schema: {
      name: string(),
      email: string(),
      password: string(),
      passowrdConfirmation: string().oneOf([ref("password")]),
      avatar: mixed().test(
        "file-type",
        "only pdf or video is allowed",
        (file: File | null) => {
          if (!file) return true;
          const fileType = file.type;
          return fileType.includes("image");
        }
      ),
    },
    mutation: RootStoreBaseMutations.mutateAuthUpdate,
  },
  () => {
    const app = useApp();

    return {
      initialValue: {
        email: app.user?.email,
        name: app.user?.name,
      },
    };
  }
);

export const AuthUpdateWrapper = utils.wrapper;
export const useAuthMutation = utils.useProvider;
