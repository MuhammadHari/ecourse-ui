import { SectionProgressModelBase } from "./SectionProgressModel.base";
/* A graphql query fragment builders for SectionProgressModel */
export { selectFromSectionProgress, sectionProgressModelPrimitives, SectionProgressModelSelector } from "./SectionProgressModel.base";
/**
 * SectionProgressModel
 */
export const SectionProgressModel = SectionProgressModelBase
    .actions(self => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    }
}));
