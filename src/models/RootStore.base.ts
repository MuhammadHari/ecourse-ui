/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { UserPaginatorModel, UserPaginatorModelType } from "./UserPaginatorModel"
import { userPaginatorModelPrimitives, UserPaginatorModelSelector } from "./UserPaginatorModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { paginatorInfoModelPrimitives, PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { ClassRoomModel, ClassRoomModelType } from "./ClassRoomModel"
import { classRoomModelPrimitives, ClassRoomModelSelector } from "./ClassRoomModel.base"
import { SectionModel, SectionModelType } from "./SectionModel"
import { sectionModelPrimitives, SectionModelSelector } from "./SectionModel.base"
import { ContentModel, ContentModelType } from "./ContentModel"
import { contentModelPrimitives, ContentModelSelector } from "./ContentModel.base"
import { ProgressModel, ProgressModelType } from "./ProgressModel"
import { progressModelPrimitives, ProgressModelSelector } from "./ProgressModel.base"
import { ContentPaginatorModel, ContentPaginatorModelType } from "./ContentPaginatorModel"
import { contentPaginatorModelPrimitives, ContentPaginatorModelSelector } from "./ContentPaginatorModel.base"
import { DiscussionPaginatorModel, DiscussionPaginatorModelType } from "./DiscussionPaginatorModel"
import { discussionPaginatorModelPrimitives, DiscussionPaginatorModelSelector } from "./DiscussionPaginatorModel.base"
import { DiscussionModel, DiscussionModelType } from "./DiscussionModel"
import { discussionModelPrimitives, DiscussionModelSelector } from "./DiscussionModel.base"
import { DiscussionReplyPaginatorModel, DiscussionReplyPaginatorModelType } from "./DiscussionReplyPaginatorModel"
import { discussionReplyPaginatorModelPrimitives, DiscussionReplyPaginatorModelSelector } from "./DiscussionReplyPaginatorModel.base"
import { DiscussionReplyModel, DiscussionReplyModelType } from "./DiscussionReplyModel"
import { discussionReplyModelPrimitives, DiscussionReplyModelSelector } from "./DiscussionReplyModel.base"
import { StudentClassroomModel, StudentClassroomModelType } from "./StudentClassroomModel"
import { studentClassroomModelPrimitives, StudentClassroomModelSelector } from "./StudentClassroomModel.base"
import { SectionProgressModel, SectionProgressModelType } from "./SectionProgressModel"
import { sectionProgressModelPrimitives, SectionProgressModelSelector } from "./SectionProgressModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"


import { Role } from "./RoleEnum"
import { Grade } from "./GradeEnum"
import { ContentType } from "./ContentTypeEnum"
import { SortOrder } from "./SortOrderEnum"
import { Trashed } from "./TrashedEnum"

export type CreateUserInput = {
  email: string
  password: string
  password_confirmation: string
  name: string
}
export type OrderByClause = {
  column: string
  order: SortOrder
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  users: ObservableMap<string, UserModelType>,
  classRooms: ObservableMap<string, ClassRoomModelType>,
  sections: ObservableMap<string, SectionModelType>,
  contents: ObservableMap<string, ContentModelType>,
  progresses: ObservableMap<string, ProgressModelType>,
  discussions: ObservableMap<string, DiscussionModelType>,
  discussionReplies: ObservableMap<string, DiscussionReplyModelType>,
  studentClassrooms: ObservableMap<string, StudentClassroomModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryAuth="queryAuth",
queryTeachers="queryTeachers",
queryStudents="queryStudents",
queryClassrooms="queryClassrooms",
queryClassroom="queryClassroom",
queryClassroomByUser="queryClassroomByUser",
querySections="querySections",
querySectionByStudentClassroom="querySectionByStudentClassroom",
querySectionByClassroom="querySectionByClassroom",
querySection="querySection",
queryContents="queryContents",
queryContentByUser="queryContentByUser",
queryContentBySection="queryContentBySection",
queryContent="queryContent",
queryDiscussion="queryDiscussion",
queryDiscussionReplies="queryDiscussionReplies",
queryAllStudentProgress="queryAllStudentProgress",
queryStudentClassroom="queryStudentClassroom",
queryStudentProgress="queryStudentProgress"
}
export enum RootStoreBaseMutations {
mutateAuthUpdate="mutateAuthUpdate",
mutateResetPassword="mutateResetPassword",
mutateResetPasswordCallback="mutateResetPasswordCallback",
mutateRegister="mutateRegister",
mutateLogin="mutateLogin",
mutateLogout="mutateLogout",
mutateSections="mutateSections",
mutateSectionUpdate="mutateSectionUpdate",
mutateContent="mutateContent",
mutateDiscussion="mutateDiscussion",
mutateDiscussionUpdate="mutateDiscussionUpdate",
mutateDiscussionDelete="mutateDiscussionDelete",
mutateDiscussionReplyDelete="mutateDiscussionReplyDelete",
mutateDiscussionReply="mutateDiscussionReply",
mutateDiscussionReplyUpdate="mutateDiscussionReplyUpdate",
mutateProgressUpdate="mutateProgressUpdate",
mutateProgressCompletionMark="mutateProgressCompletionMark",
mutateUser="mutateUser"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['UserPaginator', () => UserPaginatorModel], ['PaginatorInfo', () => PaginatorInfoModel], ['ClassRoom', () => ClassRoomModel], ['Section', () => SectionModel], ['Content', () => ContentModel], ['Progress', () => ProgressModel], ['ContentPaginator', () => ContentPaginatorModel], ['DiscussionPaginator', () => DiscussionPaginatorModel], ['Discussion', () => DiscussionModel], ['DiscussionReplyPaginator', () => DiscussionReplyPaginatorModel], ['DiscussionReply', () => DiscussionReplyModel], ['StudentClassroom', () => StudentClassroomModel], ['SectionProgress', () => SectionProgressModel], ['PageInfo', () => PageInfoModel]], ['User', 'ClassRoom', 'Section', 'Content', 'Progress', 'Discussion', 'DiscussionReply', 'StudentClassroom'], "js"))
  .props({
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    classRooms: types.optional(types.map(types.late((): any => ClassRoomModel)), {}),
    sections: types.optional(types.map(types.late((): any => SectionModel)), {}),
    contents: types.optional(types.map(types.late((): any => ContentModel)), {}),
    progresses: types.optional(types.map(types.late((): any => ProgressModel)), {}),
    discussions: types.optional(types.map(types.late((): any => DiscussionModel)), {}),
    discussionReplies: types.optional(types.map(types.late((): any => DiscussionReplyModel)), {}),
    studentClassrooms: types.optional(types.map(types.late((): any => StudentClassroomModel)), {})
  })
  .actions(self => ({
    queryAuth(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ auth: UserModelType}>(`query auth { auth {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryTeachers(variables: { first?: number, page?: number }, resultSelector: string | ((qb: UserPaginatorModelSelector) => UserPaginatorModelSelector) = userPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ teachers: UserPaginatorModelType}>(`query teachers($first: Int, $page: Int) { teachers(first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudents(variables: { grade?: string, first?: number, page?: number }, resultSelector: string | ((qb: UserPaginatorModelSelector) => UserPaginatorModelSelector) = userPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ students: UserPaginatorModelType}>(`query students($grade: String, $first: Int, $page: Int) { students(grade: $grade, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryClassrooms(variables?: {  }, resultSelector: string | ((qb: ClassRoomModelSelector) => ClassRoomModelSelector) = classRoomModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ classrooms: ClassRoomModelType[]}>(`query classrooms { classrooms {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryClassroom(variables: { id: string }, resultSelector: string | ((qb: ClassRoomModelSelector) => ClassRoomModelSelector) = classRoomModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ classroom: ClassRoomModelType}>(`query classroom($id: ID!) { classroom(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryClassroomByUser(variables?: {  }, resultSelector: string | ((qb: ClassRoomModelSelector) => ClassRoomModelSelector) = classRoomModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ classroomByUser: ClassRoomModelType}>(`query classroomByUser { classroomByUser {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    querySections(variables?: {  }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ sections: SectionModelType[]}>(`query sections { sections {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    querySectionByStudentClassroom(variables?: {  }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ sectionByStudentClassroom: SectionModelType[]}>(`query sectionByStudentClassroom { sectionByStudentClassroom {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    querySectionByClassroom(variables: { id: string }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ sectionByClassroom: SectionModelType[]}>(`query sectionByClassroom($id: ID!) { sectionByClassroom(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    querySection(variables: { id?: string }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ section: SectionModelType}>(`query section($id: ID) { section(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryContents(variables: { classroomId: string, sectionId?: string, first?: number, page?: number }, resultSelector: string | ((qb: ContentPaginatorModelSelector) => ContentPaginatorModelSelector) = contentPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ contents: ContentPaginatorModelType}>(`query contents($classroomId: ID!, $sectionId: ID, $first: Int, $page: Int) { contents(classroomId: $classroomId, sectionId: $sectionId, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryContentByUser(variables: { first?: number, page?: number }, resultSelector: string | ((qb: ContentPaginatorModelSelector) => ContentPaginatorModelSelector) = contentPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ contentByUser: ContentPaginatorModelType}>(`query contentByUser($first: Int, $page: Int) { contentByUser(first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryContentBySection(variables: { id: string }, resultSelector: string | ((qb: ContentModelSelector) => ContentModelSelector) = contentModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ contentBySection: ContentModelType[]}>(`query contentBySection($id: String!) { contentBySection(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryContent(variables: { id: string }, resultSelector: string | ((qb: ContentModelSelector) => ContentModelSelector) = contentModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ content: ContentModelType}>(`query content($id: ID!) { content(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryDiscussion(variables: { id: string, first?: number, page?: number }, resultSelector: string | ((qb: DiscussionPaginatorModelSelector) => DiscussionPaginatorModelSelector) = discussionPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ discussion: DiscussionPaginatorModelType}>(`query discussion($id: ID!, $first: Int, $page: Int) { discussion(id: $id, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryDiscussionReplies(variables: { id: string, first?: number, page?: number }, resultSelector: string | ((qb: DiscussionReplyPaginatorModelSelector) => DiscussionReplyPaginatorModelSelector) = discussionReplyPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ discussionReplies: DiscussionReplyPaginatorModelType}>(`query discussionReplies($id: ID!, $first: Int, $page: Int) { discussionReplies(id: $id, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllStudentProgress(variables?: {  }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allStudentProgress: ProgressModelType[]}>(`query allStudentProgress { allStudentProgress {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudentClassroom(variables: { classroomId?: string }, resultSelector: string | ((qb: StudentClassroomModelSelector) => StudentClassroomModelSelector) = studentClassroomModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ studentClassroom: StudentClassroomModelType}>(`query studentClassroom($classroomId: String) { studentClassroom(classroom_id: $classroomId) {
        ${typeof resultSelector === "function" ? resultSelector(new StudentClassroomModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudentProgress(variables: { section?: string }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ studentProgress: ProgressModelType[]}>(`query studentProgress($section: ID) { studentProgress(section: $section) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateAuthUpdate(variables: { name?: string, email?: string, password?: string, passwordConfirmation?: string, avatar?: any }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ authUpdate: UserModelType}>(`mutation authUpdate($name: String, $email: String, $password: String, $passwordConfirmation: String, $avatar: Upload) { authUpdate(name: $name, email: $email, password: $password, password_confirmation: $passwordConfirmation, avatar: $avatar) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateResetPassword(variables: { email: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ resetPassword: boolean }>(`mutation resetPassword($email: String!) { resetPassword(email: $email) }`, variables, optimisticUpdate)
    },
    mutateResetPasswordCallback(variables: { email: string, code: string, password: string, passwordConfirmation: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ resetPasswordCallback: boolean }>(`mutation resetPasswordCallback($email: String!, $code: String!, $password: String!, $passwordConfirmation: String!) { resetPasswordCallback(email: $email, code: $code, password: $password, password_confirmation: $passwordConfirmation) }`, variables, optimisticUpdate)
    },
    mutateRegister(variables: { args: CreateUserInput }, optimisticUpdate?: () => void) {
      return self.mutate<{ register: boolean }>(`mutation register($args: CreateUserInput!) { register(args: $args) }`, variables, optimisticUpdate)
    },
    mutateLogin(variables: { email: string, password: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ login: boolean }>(`mutation login($email: String!, $password: String!) { login(email: $email, password: $password) }`, variables, optimisticUpdate)
    },
    mutateLogout(variables?: {  }, optimisticUpdate?: () => void) {
      return self.mutate<{ logout: boolean }>(`mutation logout { logout }`, variables, optimisticUpdate)
    },
    mutateSections(variables: { classroomId: string, title: string }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ sections: SectionModelType}>(`mutation sections($classroomId: ID!, $title: String!) { sections(classroomId: $classroomId, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSectionUpdate(variables: { id: string, title: string }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ sectionUpdate: SectionModelType}>(`mutation sectionUpdate($id: ID!, $title: String!) { sectionUpdate(id: $id, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateContent(variables: { sectionId: string, classroomId: string, title: string, description: string, content: any }, resultSelector: string | ((qb: ContentModelSelector) => ContentModelSelector) = contentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ content: ContentModelType}>(`mutation content($sectionId: String!, $classroomId: String!, $title: String!, $description: String!, $content: Upload!) { content(section_id: $sectionId, classroom_id: $classroomId, title: $title, description: $description, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussion(variables: { contentId: string, content: string, title: string }, resultSelector: string | ((qb: DiscussionModelSelector) => DiscussionModelSelector) = discussionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussion: DiscussionModelType}>(`mutation discussion($contentId: ID!, $content: String!, $title: String!) { discussion(content_id: $contentId, content: $content, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussionUpdate(variables: { id: string, content: string, title: string }, resultSelector: string | ((qb: DiscussionModelSelector) => DiscussionModelSelector) = discussionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussionUpdate: DiscussionModelType}>(`mutation discussionUpdate($id: ID!, $content: String!, $title: String!) { discussionUpdate(id: $id, content: $content, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussionDelete(variables: { id: string }, resultSelector: string | ((qb: DiscussionModelSelector) => DiscussionModelSelector) = discussionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussionDelete: DiscussionModelType}>(`mutation discussionDelete($id: ID!) { discussionDelete(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussionReplyDelete(variables: { id: string }, resultSelector: string | ((qb: DiscussionReplyModelSelector) => DiscussionReplyModelSelector) = discussionReplyModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussionReplyDelete: DiscussionReplyModelType}>(`mutation discussionReplyDelete($id: ID!) { discussionReplyDelete(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussionReply(variables: { discussionId: string, content: string }, resultSelector: string | ((qb: DiscussionReplyModelSelector) => DiscussionReplyModelSelector) = discussionReplyModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussionReply: DiscussionReplyModelType}>(`mutation discussionReply($discussionId: ID!, $content: String!) { discussionReply(discussion_id: $discussionId, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussionReplyUpdate(variables: { id: string, content: string }, resultSelector: string | ((qb: DiscussionReplyModelSelector) => DiscussionReplyModelSelector) = discussionReplyModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussionReplyUpdate: DiscussionReplyModelType}>(`mutation discussionReplyUpdate($id: ID!, $content: String!) { discussionReplyUpdate(id: $id, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateProgressUpdate(variables: { id: string, played: number }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ progressUpdate: ProgressModelType}>(`mutation progressUpdate($id: ID!, $played: Int!) { progressUpdate(id: $id, played: $played) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateProgressCompletionMark(variables: { id: string, completed: boolean }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ progressCompletionMark: ProgressModelType}>(`mutation progressCompletionMark($id: ID!, $completed: Boolean!) { progressCompletionMark(id: $id, completed: $completed) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUser(variables: { name: string, email: string, password: string, role?: Role, grade?: Grade }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ user: UserModelType}>(`mutation user($name: String!, $email: String!, $password: String!, $role: Role, $grade: Grade) { user(name: $name, email: $email, password: $password, role: $role, grade: $grade) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
