import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
import { string } from "yup";
const schema = {
    title: string().required(),
};
const createKey = RootStoreBaseMutations.mutateSections;
const updateKey = RootStoreBaseMutations.mutateSectionUpdate;
const service = (isCreate = true) => mutationServiceFactory({
    schema,
    mutation: isCreate ? createKey : updateKey,
});
export const services = {
    create: service(),
    update: service(false),
    schema,
};
