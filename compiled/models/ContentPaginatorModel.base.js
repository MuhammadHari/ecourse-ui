/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { ContentModel } from "./ContentModel";
import { ContentModelSelector } from "./ContentModel.base";
import { PaginatorInfoModel } from "./PaginatorInfoModel";
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base";
/**
 * ContentPaginatorBase
 * auto generated base class for the model ContentPaginatorModel.
 *
 * A paginated list of Content items.
 */
export const ContentPaginatorModelBase = withTypedRefs()(ModelBase
    .named('ContentPaginator')
    .props({
    __typename: types.optional(types.literal("ContentPaginator"), "ContentPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late(() => PaginatorInfoModel)),
    /** A list of Content items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => ContentModel)))),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class ContentPaginatorModelSelector extends QueryBuilder {
    paginatorInfo(builder) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder); }
    data(builder) { return this.__child(`data`, ContentModelSelector, builder); }
}
export function selectFromContentPaginator() {
    return new ContentPaginatorModelSelector();
}
export const contentPaginatorModelPrimitives = selectFromContentPaginator();
