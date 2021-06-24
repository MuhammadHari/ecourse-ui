/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { PaginatorInfoModel } from "./PaginatorInfoModel";
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base";
import { UserModel } from "./UserModel";
import { UserModelSelector } from "./UserModel.base";
/**
 * UserPaginatorBase
 * auto generated base class for the model UserPaginatorModel.
 *
 * A paginated list of User items.
 */
export const UserPaginatorModelBase = withTypedRefs()(ModelBase
    .named('UserPaginator')
    .props({
    __typename: types.optional(types.literal("UserPaginator"), "UserPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late(() => PaginatorInfoModel)),
    /** A list of User items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => UserModel)))),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class UserPaginatorModelSelector extends QueryBuilder {
    paginatorInfo(builder) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder); }
    data(builder) { return this.__child(`data`, UserModelSelector, builder); }
}
export function selectFromUserPaginator() {
    return new UserPaginatorModelSelector();
}
export const userPaginatorModelPrimitives = selectFromUserPaginator();
