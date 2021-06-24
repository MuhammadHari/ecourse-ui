/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
import { QueryBuilder } from "mst-gql";
import { ModelBase } from "./ModelBase";
/**
 * SectionProgressBase
 * auto generated base class for the model SectionProgressModel.
 */
export const SectionProgressModelBase = ModelBase
    .named('SectionProgress')
    .props({
    __typename: types.optional(types.literal("SectionProgress"), "SectionProgress"),
    section_id: types.identifier,
    progress: types.union(types.undefined, types.null, types.number),
})
    .views(self => ({
    get store() {
        return self.__getStore();
    }
}));
export class SectionProgressModelSelector extends QueryBuilder {
    get section_id() { return this.__attr(`section_id`); }
    get progress() { return this.__attr(`progress`); }
}
export function selectFromSectionProgress() {
    return new SectionProgressModelSelector();
}
export const sectionProgressModelPrimitives = selectFromSectionProgress().section_id.progress;
