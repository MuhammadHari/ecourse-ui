import { SectionModelBase } from "./SectionModel.base";
/* A graphql query fragment builders for SectionModel */
export { selectFromSection, sectionModelPrimitives, SectionModelSelector } from "./SectionModel.base";
/**
 * SectionModel
 */
export const SectionModel = SectionModelBase
    .actions(self => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    }
}));
