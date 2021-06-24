import { draftJsSchema } from "./content";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
import { DiscussionModelType } from "@root/models";

const {
  mutateDiscussionReply,
  mutateDiscussion,
  mutateDiscussionUpdate,
  mutateDiscussionReplyUpdate,
} = RootStoreBaseMutations;

const schema = {
  content: draftJsSchema,
};

type CKey =
  | RootStoreBaseMutations.mutateDiscussionReply
  | RootStoreBaseMutations.mutateDiscussion
  | RootStoreBaseMutations.mutateDiscussionUpdate
  | RootStoreBaseMutations.mutateDiscussionReplyUpdate;

function factory<T>(k: CKey) {
  return mutationServiceFactory<T, CKey>({
    schema,
    mutation: k,
  });
}
export const service = {
  schema,
  create: factory<DiscussionModelType>(mutateDiscussion),
  replyCreate: factory<DiscussionModelType>(mutateDiscussionReply),
  update: factory<DiscussionModelType>(mutateDiscussionUpdate),
  replyUpdate: factory<DiscussionModelType>(mutateDiscussionReplyUpdate),
};
