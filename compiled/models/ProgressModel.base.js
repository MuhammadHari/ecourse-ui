/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { ContentModel } from "./ContentModel";
import { ContentModelSelector } from "./ContentModel.base";
import { ContentTypeEnumType } from "./ContentTypeEnum";
import { SectionModel } from "./SectionModel";
import { SectionModelSelector } from "./SectionModel.base";
/**
 * ProgressBase
 * auto generated base class for the model ProgressModel.
 */
export const ProgressModelBase = withTypedRefs()(ModelBase
    .named('Progress')
    .props({
    __typename: types.optional(types.literal("Progress"), "Progress"),
    id: types.identifier,
    section_id: types.union(types.undefined, types.string),
    content_id: types.union(types.undefined, types.string),
    status: types.union(types.undefined, types.number),
    content: types.union(types.undefined, MSTGQLRef(types.late(() => ContentModel))),
    section: types.union(types.undefined, MSTGQLRef(types.late(() => SectionModel))),
    played: types.union(types.undefined, types.number),
    pageNumber: types.union(types.undefined, types.number),
    duration: types.union(types.undefined, types.number),
    contentType: types.union(types.undefined, ContentTypeEnumType),
    completed: types.union(types.undefined, types.boolean),
    created_at: types.union(types.undefined, types.frozen()),
    updated_at: types.union(types.undefined, types.null, types.frozen()),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class ProgressModelSelector extends QueryBuilder {
    get id() { return this.__attr(`id`); }
    get section_id() { return this.__attr(`section_id`); }
    get content_id() { return this.__attr(`content_id`); }
    get status() { return this.__attr(`status`); }
    get played() { return this.__attr(`played`); }
    get pageNumber() { return this.__attr(`pageNumber`); }
    get duration() { return this.__attr(`duration`); }
    get contentType() { return this.__attr(`contentType`); }
    get completed() { return this.__attr(`completed`); }
    get created_at() { return this.__attr(`created_at`); }
    get updated_at() { return this.__attr(`updated_at`); }
    content(builder) { return this.__child(`content`, ContentModelSelector, builder); }
    section(builder) { return this.__child(`section`, SectionModelSelector, builder); }
}
export function selectFromProgress() {
    return new ProgressModelSelector();
}
export const progressModelPrimitives = selectFromProgress().section_id.content_id.status.played.pageNumber.duration.contentType.completed.created_at.updated_at;
