/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { DiscussionReplyModel, DiscussionReplyModelType } from "./DiscussionReplyModel"
import { DiscussionReplyModelSelector } from "./DiscussionReplyModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  data: IObservableArray<DiscussionReplyModelType>;
}

/**
 * DiscussionReplyPaginatorBase
 * auto generated base class for the model DiscussionReplyPaginatorModel.
 *
 * A paginated list of DiscussionReply items.
 */
export const DiscussionReplyPaginatorModelBase = withTypedRefs<Refs>()(ModelBase
  .named('DiscussionReplyPaginator')
  .props({
    __typename: types.optional(types.literal("DiscussionReplyPaginator"), "DiscussionReplyPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late((): any => PaginatorInfoModel)),
    /** A list of DiscussionReply items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => DiscussionReplyModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class DiscussionReplyPaginatorModelSelector extends QueryBuilder {
  paginatorInfo(builder?: string | PaginatorInfoModelSelector | ((selector: PaginatorInfoModelSelector) => PaginatorInfoModelSelector)) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder) }
  data(builder?: string | DiscussionReplyModelSelector | ((selector: DiscussionReplyModelSelector) => DiscussionReplyModelSelector)) { return this.__child(`data`, DiscussionReplyModelSelector, builder) }
}
export function selectFromDiscussionReplyPaginator() {
  return new DiscussionReplyPaginatorModelSelector()
}

export const discussionReplyPaginatorModelPrimitives = selectFromDiscussionReplyPaginator()
