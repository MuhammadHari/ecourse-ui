import { ref, string } from "yup";
import { gradeUtils } from "@utils/grade-tranform";
import { mutationServiceFactory, } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
const schema = (isTeacher = false) => ({
    name: string().required(),
    email: string().required().email(),
    password: string().required(),
    password_confirmation: string()
        .required()
        .oneOf([ref("password")]),
    grade: string()
        .when({
        is: !isTeacher,
        then(schema) {
            return schema.required();
        },
    })
        .oneOf(gradeUtils.map.map(({ grade }) => grade)),
});
const opt = (isTeacher) => ({
    schema: schema(isTeacher),
    mutation: RootStoreBaseMutations.mutateUser,
});
const createTeacher = mutationServiceFactory(opt(true));
const createStudent = mutationServiceFactory(opt(false));
export const userService = {
    teacher: {
        create: createTeacher,
    },
    student: {
        create: createStudent,
    },
};
