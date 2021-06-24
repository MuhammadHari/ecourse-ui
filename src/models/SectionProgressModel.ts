import { Instance } from "mobx-state-tree"
import { SectionProgressModelBase } from "./SectionProgressModel.base"

/* The TypeScript type of an instance of SectionProgressModel */
export interface SectionProgressModelType extends Instance<typeof SectionProgressModel.Type> {}

/* A graphql query fragment builders for SectionProgressModel */
export { selectFromSectionProgress, sectionProgressModelPrimitives, SectionProgressModelSelector } from "./SectionProgressModel.base"

/**
 * SectionProgressModel
 */
export const SectionProgressModel = SectionProgressModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
