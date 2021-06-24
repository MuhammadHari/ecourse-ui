/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ClassRoomModel, ClassRoomModelType } from "./ClassRoomModel"
import { ClassRoomModelSelector } from "./ClassRoomModel.base"
import { ContentModel, ContentModelType } from "./ContentModel"
import { ContentModelSelector } from "./ContentModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  classroom: ClassRoomModelType;
  contents: IObservableArray<ContentModelType>;
}

/**
 * SectionBase
 * auto generated base class for the model SectionModel.
 */
export const SectionModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Section')
  .props({
    __typename: types.optional(types.literal("Section"), "Section"),
    id: types.identifier,
    classroomId: types.union(types.undefined, types.string),
    classroom: types.union(types.undefined, MSTGQLRef(types.late((): any => ClassRoomModel))),
    title: types.union(types.undefined, types.string),
    contents: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => ContentModel)))),
    contentCount: types.union(types.undefined, types.integer),
    videoCount: types.union(types.undefined, types.integer),
    pdfCount: types.union(types.undefined, types.integer),
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.null, types.frozen()),
    progress: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class SectionModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get classroomId() { return this.__attr(`classroomId`) }
  get title() { return this.__attr(`title`) }
  get contentCount() { return this.__attr(`contentCount`) }
  get videoCount() { return this.__attr(`videoCount`) }
  get pdfCount() { return this.__attr(`pdfCount`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  get progress() { return this.__attr(`progress`) }
  classroom(builder?: string | ClassRoomModelSelector | ((selector: ClassRoomModelSelector) => ClassRoomModelSelector)) { return this.__child(`classroom`, ClassRoomModelSelector, builder) }
  contents(builder?: string | ContentModelSelector | ((selector: ContentModelSelector) => ContentModelSelector)) { return this.__child(`contents`, ContentModelSelector, builder) }
}
export function selectFromSection() {
  return new SectionModelSelector()
}

export const sectionModelPrimitives = selectFromSection().classroomId.title.contentCount.videoCount.pdfCount.createdAt.updatedAt.progress
