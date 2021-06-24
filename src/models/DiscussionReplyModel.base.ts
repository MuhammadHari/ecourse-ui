/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserModelType;
}

/**
 * DiscussionReplyBase
 * auto generated base class for the model DiscussionReplyModel.
 */
export const DiscussionReplyModelBase = withTypedRefs<Refs>()(ModelBase
  .named('DiscussionReply')
  .props({
    __typename: types.optional(types.literal("DiscussionReply"), "DiscussionReply"),
    id: types.identifier,
    user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
    content: types.union(types.undefined, types.string),
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class DiscussionReplyModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get content() { return this.__attr(`content`) }
  get created_at() { return this.__attr(`created_at`) }
  get updated_at() { return this.__attr(`updated_at`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromDiscussionReply() {
  return new DiscussionReplyModelSelector()
}

export const discussionReplyModelPrimitives = selectFromDiscussionReply().content.created_at.updated_at
