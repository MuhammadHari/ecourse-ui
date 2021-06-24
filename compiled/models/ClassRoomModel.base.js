/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql";
import { ModelBase } from "./ModelBase";
import { ContentModel } from "./ContentModel";
import { ContentModelSelector } from "./ContentModel.base";
import { GradeEnumType } from "./GradeEnum";
import { SectionModel } from "./SectionModel";
import { SectionModelSelector } from "./SectionModel.base";
/**
 * ClassRoomBase
 * auto generated base class for the model ClassRoomModel.
 */
export const ClassRoomModelBase = withTypedRefs()(ModelBase
    .named('ClassRoom')
    .props({
    __typename: types.optional(types.literal("ClassRoom"), "ClassRoom"),
    id: types.identifier,
    grade: types.union(types.undefined, GradeEnumType),
    photo: types.union(types.undefined, types.string),
    sectionCount: types.union(types.undefined, types.integer),
    studentCount: types.union(types.undefined, types.integer),
    contentCount: types.union(types.undefined, types.integer),
    sections: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => SectionModel)))),
    contents: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => ContentModel)))),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
})));
export class ClassRoomModelSelector extends QueryBuilder {
    get id() { return this.__attr(`id`); }
    get grade() { return this.__attr(`grade`); }
    get photo() { return this.__attr(`photo`); }
    get sectionCount() { return this.__attr(`sectionCount`); }
    get studentCount() { return this.__attr(`studentCount`); }
    get contentCount() { return this.__attr(`contentCount`); }
    sections(builder) { return this.__child(`sections`, SectionModelSelector, builder); }
    contents(builder) { return this.__child(`contents`, ContentModelSelector, builder); }
}
export function selectFromClassRoom() {
    return new ClassRoomModelSelector();
}
export const classRoomModelPrimitives = selectFromClassRoom().grade.photo.sectionCount.studentCount.contentCount;
