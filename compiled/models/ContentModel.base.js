/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { ClassRoomModel } from "./ClassRoomModel";
import { ClassRoomModelSelector } from "./ClassRoomModel.base";
import { ContentTypeEnumType } from "./ContentTypeEnum";
import { ProgressModel } from "./ProgressModel";
import { ProgressModelSelector } from "./ProgressModel.base";
import { SectionModel } from "./SectionModel";
import { SectionModelSelector } from "./SectionModel.base";
import { UserModel } from "./UserModel";
import { UserModelSelector } from "./UserModel.base";
/**
 * ContentBase
 * auto generated base class for the model ContentModel.
 */
export const ContentModelBase = withTypedRefs()(ModelBase
    .named('Content')
    .props({
    __typename: types.optional(types.literal("Content"), "Content"),
    id: types.identifier,
    sectionId: types.union(types.undefined, types.string),
    classroomId: types.union(types.undefined, types.string),
    title: types.union(types.undefined, types.string),
    description: types.union(types.undefined, types.string),
    type: types.union(types.undefined, ContentTypeEnumType),
    duration: types.union(types.undefined, types.number),
    pageNumber: types.union(types.undefined, types.number),
    progress: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => ProgressModel))),
    mediaContent: types.union(types.undefined, types.string),
    thumbnail: types.union(types.undefined, types.string),
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.null, types.frozen()),
    user: types.union(types.undefined, MSTGQLRef(types.late(() => UserModel))),
    section: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => SectionModel))),
    classroom: types.union(types.undefined, types.null, MSTGQLRef(types.late(() => ClassRoomModel))),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class ContentModelSelector extends QueryBuilder {
    get id() { return this.__attr(`id`); }
    get sectionId() { return this.__attr(`sectionId`); }
    get classroomId() { return this.__attr(`classroomId`); }
    get title() { return this.__attr(`title`); }
    get description() { return this.__attr(`description`); }
    get type() { return this.__attr(`type`); }
    get duration() { return this.__attr(`duration`); }
    get pageNumber() { return this.__attr(`pageNumber`); }
    get mediaContent() { return this.__attr(`mediaContent`); }
    get thumbnail() { return this.__attr(`thumbnail`); }
    get createdAt() { return this.__attr(`createdAt`); }
    get updatedAt() { return this.__attr(`updatedAt`); }
    progress(builder) { return this.__child(`progress`, ProgressModelSelector, builder); }
    user(builder) { return this.__child(`user`, UserModelSelector, builder); }
    section(builder) { return this.__child(`section`, SectionModelSelector, builder); }
    classroom(builder) { return this.__child(`classroom`, ClassRoomModelSelector, builder); }
}
export function selectFromContent() {
    return new ContentModelSelector();
}
export const contentModelPrimitives = selectFromContent().sectionId.classroomId.title.description.type.duration.pageNumber.mediaContent.thumbnail.createdAt.updatedAt;
