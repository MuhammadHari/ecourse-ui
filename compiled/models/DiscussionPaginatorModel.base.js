/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { DiscussionModel } from "./DiscussionModel";
import { DiscussionModelSelector } from "./DiscussionModel.base";
import { PaginatorInfoModel } from "./PaginatorInfoModel";
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base";
/**
 * DiscussionPaginatorBase
 * auto generated base class for the model DiscussionPaginatorModel.
 *
 * A paginated list of Discussion items.
 */
export const DiscussionPaginatorModelBase = withTypedRefs()(ModelBase
    .named('DiscussionPaginator')
    .props({
    __typename: types.optional(types.literal("DiscussionPaginator"), "DiscussionPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late(() => PaginatorInfoModel)),
    /** A list of Discussion items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => DiscussionModel)))),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class DiscussionPaginatorModelSelector extends QueryBuilder {
    paginatorInfo(builder) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder); }
    data(builder) { return this.__child(`data`, DiscussionModelSelector, builder); }
}
export function selectFromDiscussionPaginator() {
    return new DiscussionPaginatorModelSelector();
}
export const discussionPaginatorModelPrimitives = selectFromDiscussionPaginator();
