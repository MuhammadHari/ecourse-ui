import { UserModelBase } from "./UserModel.base";
import { gradeMaps } from "@utils/grade-tranform";
/* A graphql query fragment builders for UserModel */
export { selectFromUser, userModelPrimitives, UserModelSelector, } from "./UserModel.base";
/**
 * UserModel
 */
export const UserModel = UserModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    },
})).views((self) => {
    return {
        get gradeLabel() {
            if (!self.grade) {
                return "";
            }
            return gradeMaps[self.grade].label;
        },
    };
});
