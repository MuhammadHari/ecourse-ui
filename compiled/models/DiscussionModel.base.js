/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { UserModel } from "./UserModel";
import { UserModelSelector } from "./UserModel.base";
/**
 * DiscussionBase
 * auto generated base class for the model DiscussionModel.
 */
export const DiscussionModelBase = withTypedRefs()(ModelBase
    .named('Discussion')
    .props({
    __typename: types.optional(types.literal("Discussion"), "Discussion"),
    id: types.identifier,
    user: types.union(types.undefined, MSTGQLRef(types.late(() => UserModel))),
    title: types.union(types.undefined, types.string),
    content: types.union(types.undefined, types.string),
    replyCount: types.union(types.undefined, types.integer),
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class DiscussionModelSelector extends QueryBuilder {
    get id() { return this.__attr(`id`); }
    get title() { return this.__attr(`title`); }
    get content() { return this.__attr(`content`); }
    get replyCount() { return this.__attr(`replyCount`); }
    get created_at() { return this.__attr(`created_at`); }
    get updated_at() { return this.__attr(`updated_at`); }
    user(builder) { return this.__child(`user`, UserModelSelector, builder); }
}
export function selectFromDiscussion() {
    return new DiscussionModelSelector();
}
export const discussionModelPrimitives = selectFromDiscussion().title.content.replyCount.created_at.updated_at;
