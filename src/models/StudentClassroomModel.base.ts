/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ClassRoomModel, ClassRoomModelType } from "./ClassRoomModel"
import { ClassRoomModelSelector } from "./ClassRoomModel.base"
import { SectionProgressModel, SectionProgressModelType } from "./SectionProgressModel"
import { SectionProgressModelSelector } from "./SectionProgressModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  classroom: ClassRoomModelType;
  user: UserModelType;
}

/**
 * StudentClassroomBase
 * auto generated base class for the model StudentClassroomModel.
 */
export const StudentClassroomModelBase = withTypedRefs<Refs>()(ModelBase
  .named('StudentClassroom')
  .props({
    __typename: types.optional(types.literal("StudentClassroom"), "StudentClassroom"),
    id: types.identifier,
    userId: types.union(types.undefined, types.null, types.string),
    classroomId: types.union(types.undefined, types.null, types.string),
    classroom: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => ClassRoomModel))),
    user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserModel))),
    sectionProgress: types.union(types.undefined, types.array(types.late((): any => SectionProgressModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class StudentClassroomModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get userId() { return this.__attr(`userId`) }
  get classroomId() { return this.__attr(`classroomId`) }
  classroom(builder?: string | ClassRoomModelSelector | ((selector: ClassRoomModelSelector) => ClassRoomModelSelector)) { return this.__child(`classroom`, ClassRoomModelSelector, builder) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
  sectionProgress(builder?: string | SectionProgressModelSelector | ((selector: SectionProgressModelSelector) => SectionProgressModelSelector)) { return this.__child(`sectionProgress`, SectionProgressModelSelector, builder) }
}
export function selectFromStudentClassroom() {
  return new StudentClassroomModelSelector()
}

export const studentClassroomModelPrimitives = selectFromStudentClassroom().userId.classroomId
