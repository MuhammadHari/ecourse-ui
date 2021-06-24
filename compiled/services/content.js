import { mixed, string } from "yup";
import voca from "voca";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
export const draftJsSchema = mixed().test("validate-blocks-text", "Silahkan isi deskripsi", (value) => {
    if (!value)
        return false;
    const blocktexts = value.blocks.reduce((item, reducer) => {
        return item + reducer.text;
    }, "");
    return Boolean(voca(blocktexts).trim().value().length);
});
const contentSchema = mixed()
    .required()
    .test("file-required", "please select a file", (value) => {
    if (!value)
        return false;
    return value.size > 0;
})
    .test("file-type", "only pdf or video is allowed", (file) => {
    if (!file)
        return false;
    const fileType = file.type;
    return fileType.includes("pdf") || fileType.includes("video");
});
const createSchema = {
    sectionId: string().required(),
    title: string().required(),
    description: draftJsSchema,
    content: contentSchema,
};
const updateSchema = {
    title: string().required(),
    description: draftJsSchema,
};
const create = mutationServiceFactory({
    schema: createSchema,
    mutation: RootStoreBaseMutations.mutateContent,
});
export const service = {
    create,
    schemas: {
        create: createSchema,
        update: updateSchema,
    },
};
