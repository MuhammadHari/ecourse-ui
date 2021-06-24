import { useApp } from "@providers/app-provider/provider";
import { get } from "lodash";

type Opt = {
  model: any;
  modelKey?: string;
};

export function useIsOwner({ model, modelKey = "user.id" }: Opt) {
  const { user } = useApp();
  return user && user.id === get(model, modelKey);
}
