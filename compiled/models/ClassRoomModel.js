import { ClassRoomModelBase } from "./ClassRoomModel.base";
/* A graphql query fragment builders for ClassRoomModel */
export { selectFromClassRoom, classRoomModelPrimitives, ClassRoomModelSelector, } from "./ClassRoomModel.base";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
/**
 * ClassRoomModel
 */
export const ClassRoomModel = ClassRoomModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    },
})).views((self) => ({
    get gradeLabel() {
        if (!self.grade)
            return "";
        return self.grade;
    },
}));
