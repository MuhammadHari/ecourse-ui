/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { DiscussionReplyModel } from "./DiscussionReplyModel";
import { DiscussionReplyModelSelector } from "./DiscussionReplyModel.base";
import { PaginatorInfoModel } from "./PaginatorInfoModel";
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base";
/**
 * DiscussionReplyPaginatorBase
 * auto generated base class for the model DiscussionReplyPaginatorModel.
 *
 * A paginated list of DiscussionReply items.
 */
export const DiscussionReplyPaginatorModelBase = withTypedRefs()(ModelBase
    .named('DiscussionReplyPaginator')
    .props({
    __typename: types.optional(types.literal("DiscussionReplyPaginator"), "DiscussionReplyPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late(() => PaginatorInfoModel)),
    /** A list of DiscussionReply items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => DiscussionReplyModel)))),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class DiscussionReplyPaginatorModelSelector extends QueryBuilder {
    paginatorInfo(builder) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder); }
    data(builder) { return this.__child(`data`, DiscussionReplyModelSelector, builder); }
}
export function selectFromDiscussionReplyPaginator() {
    return new DiscussionReplyPaginatorModelSelector();
}
export const discussionReplyPaginatorModelPrimitives = selectFromDiscussionReplyPaginator();
