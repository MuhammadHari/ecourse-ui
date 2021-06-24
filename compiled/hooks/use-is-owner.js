import { useApp } from "@providers/app-provider/provider";
import { get } from "lodash";
export function useIsOwner({ model, modelKey = "user.id" }) {
    const { user } = useApp();
    return user && user.id === get(model, modelKey);
}
