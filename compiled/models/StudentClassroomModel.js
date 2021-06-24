import { StudentClassroomModelBase } from "./StudentClassroomModel.base";
/* A graphql query fragment builders for StudentClassroomModel */
export { selectFromStudentClassroom, studentClassroomModelPrimitives, StudentClassroomModelSelector } from "./StudentClassroomModel.base";
/**
 * StudentClassroomModel
 */
export const StudentClassroomModel = StudentClassroomModelBase
    .actions(self => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    }
}));
