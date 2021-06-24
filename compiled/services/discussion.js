import { draftJsSchema } from "./content";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
const { mutateDiscussionReply, mutateDiscussion, mutateDiscussionUpdate, mutateDiscussionReplyUpdate, } = RootStoreBaseMutations;
const schema = {
    content: draftJsSchema,
};
function factory(k) {
    return mutationServiceFactory({
        schema,
        mutation: k,
    });
}
export const service = {
    schema,
    create: factory(mutateDiscussion),
    replyCreate: factory(mutateDiscussionReply),
    update: factory(mutateDiscussionUpdate),
    replyUpdate: factory(mutateDiscussionReplyUpdate),
};
