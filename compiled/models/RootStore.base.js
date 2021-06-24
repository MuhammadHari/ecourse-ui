import { types } from "mobx-state-tree";
import { MSTGQLStore, configureStoreMixin, withTypedRefs } from "mst-gql";
import { UserModel } from "./UserModel";
import { userModelPrimitives, UserModelSelector } from "./UserModel.base";
import { UserPaginatorModel } from "./UserPaginatorModel";
import { userPaginatorModelPrimitives, UserPaginatorModelSelector } from "./UserPaginatorModel.base";
import { PaginatorInfoModel } from "./PaginatorInfoModel";
import { ClassRoomModel } from "./ClassRoomModel";
import { classRoomModelPrimitives, ClassRoomModelSelector } from "./ClassRoomModel.base";
import { SectionModel } from "./SectionModel";
import { sectionModelPrimitives, SectionModelSelector } from "./SectionModel.base";
import { ContentModel } from "./ContentModel";
import { contentModelPrimitives, ContentModelSelector } from "./ContentModel.base";
import { ProgressModel } from "./ProgressModel";
import { progressModelPrimitives, ProgressModelSelector } from "./ProgressModel.base";
import { ContentPaginatorModel } from "./ContentPaginatorModel";
import { contentPaginatorModelPrimitives, ContentPaginatorModelSelector } from "./ContentPaginatorModel.base";
import { DiscussionPaginatorModel } from "./DiscussionPaginatorModel";
import { discussionPaginatorModelPrimitives, DiscussionPaginatorModelSelector } from "./DiscussionPaginatorModel.base";
import { DiscussionModel } from "./DiscussionModel";
import { discussionModelPrimitives, DiscussionModelSelector } from "./DiscussionModel.base";
import { DiscussionReplyPaginatorModel } from "./DiscussionReplyPaginatorModel";
import { discussionReplyPaginatorModelPrimitives, DiscussionReplyPaginatorModelSelector } from "./DiscussionReplyPaginatorModel.base";
import { DiscussionReplyModel } from "./DiscussionReplyModel";
import { discussionReplyModelPrimitives, DiscussionReplyModelSelector } from "./DiscussionReplyModel.base";
import { StudentClassroomModel } from "./StudentClassroomModel";
import { studentClassroomModelPrimitives, StudentClassroomModelSelector } from "./StudentClassroomModel.base";
import { SectionProgressModel } from "./SectionProgressModel";
import { PageInfoModel } from "./PageInfoModel";
/**
* Enums for the names of base graphql actions
*/
export var RootStoreBaseQueries;
(function (RootStoreBaseQueries) {
    RootStoreBaseQueries["queryAuth"] = "queryAuth";
    RootStoreBaseQueries["queryTeachers"] = "queryTeachers";
    RootStoreBaseQueries["queryStudents"] = "queryStudents";
    RootStoreBaseQueries["queryClassrooms"] = "queryClassrooms";
    RootStoreBaseQueries["queryClassroom"] = "queryClassroom";
    RootStoreBaseQueries["queryClassroomByUser"] = "queryClassroomByUser";
    RootStoreBaseQueries["querySections"] = "querySections";
    RootStoreBaseQueries["querySectionByStudentClassroom"] = "querySectionByStudentClassroom";
    RootStoreBaseQueries["querySectionByClassroom"] = "querySectionByClassroom";
    RootStoreBaseQueries["querySection"] = "querySection";
    RootStoreBaseQueries["queryContents"] = "queryContents";
    RootStoreBaseQueries["queryContentByUser"] = "queryContentByUser";
    RootStoreBaseQueries["queryContentBySection"] = "queryContentBySection";
    RootStoreBaseQueries["queryContent"] = "queryContent";
    RootStoreBaseQueries["queryDiscussion"] = "queryDiscussion";
    RootStoreBaseQueries["queryDiscussionReplies"] = "queryDiscussionReplies";
    RootStoreBaseQueries["queryAllStudentProgress"] = "queryAllStudentProgress";
    RootStoreBaseQueries["queryStudentClassroom"] = "queryStudentClassroom";
    RootStoreBaseQueries["queryStudentProgress"] = "queryStudentProgress";
})(RootStoreBaseQueries || (RootStoreBaseQueries = {}));
export var RootStoreBaseMutations;
(function (RootStoreBaseMutations) {
    RootStoreBaseMutations["mutateAuthUpdate"] = "mutateAuthUpdate";
    RootStoreBaseMutations["mutateResetPassword"] = "mutateResetPassword";
    RootStoreBaseMutations["mutateResetPasswordCallback"] = "mutateResetPasswordCallback";
    RootStoreBaseMutations["mutateRegister"] = "mutateRegister";
    RootStoreBaseMutations["mutateLogin"] = "mutateLogin";
    RootStoreBaseMutations["mutateLogout"] = "mutateLogout";
    RootStoreBaseMutations["mutateSections"] = "mutateSections";
    RootStoreBaseMutations["mutateSectionUpdate"] = "mutateSectionUpdate";
    RootStoreBaseMutations["mutateContent"] = "mutateContent";
    RootStoreBaseMutations["mutateDiscussion"] = "mutateDiscussion";
    RootStoreBaseMutations["mutateDiscussionUpdate"] = "mutateDiscussionUpdate";
    RootStoreBaseMutations["mutateDiscussionDelete"] = "mutateDiscussionDelete";
    RootStoreBaseMutations["mutateDiscussionReplyDelete"] = "mutateDiscussionReplyDelete";
    RootStoreBaseMutations["mutateDiscussionReply"] = "mutateDiscussionReply";
    RootStoreBaseMutations["mutateDiscussionReplyUpdate"] = "mutateDiscussionReplyUpdate";
    RootStoreBaseMutations["mutateProgressUpdate"] = "mutateProgressUpdate";
    RootStoreBaseMutations["mutateProgressCompletionMark"] = "mutateProgressCompletionMark";
    RootStoreBaseMutations["mutateUser"] = "mutateUser";
})(RootStoreBaseMutations || (RootStoreBaseMutations = {}));
/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs()(MSTGQLStore
    .named("RootStore")
    .extend(configureStoreMixin([['User', () => UserModel], ['UserPaginator', () => UserPaginatorModel], ['PaginatorInfo', () => PaginatorInfoModel], ['ClassRoom', () => ClassRoomModel], ['Section', () => SectionModel], ['Content', () => ContentModel], ['Progress', () => ProgressModel], ['ContentPaginator', () => ContentPaginatorModel], ['DiscussionPaginator', () => DiscussionPaginatorModel], ['Discussion', () => DiscussionModel], ['DiscussionReplyPaginator', () => DiscussionReplyPaginatorModel], ['DiscussionReply', () => DiscussionReplyModel], ['StudentClassroom', () => StudentClassroomModel], ['SectionProgress', () => SectionProgressModel], ['PageInfo', () => PageInfoModel]], ['User', 'ClassRoom', 'Section', 'Content', 'Progress', 'Discussion', 'DiscussionReply', 'StudentClassroom'], "js"))
    .props({
    users: types.optional(types.map(types.late(() => UserModel)), {}),
    classRooms: types.optional(types.map(types.late(() => ClassRoomModel)), {}),
    sections: types.optional(types.map(types.late(() => SectionModel)), {}),
    contents: types.optional(types.map(types.late(() => ContentModel)), {}),
    progresses: types.optional(types.map(types.late(() => ProgressModel)), {}),
    discussions: types.optional(types.map(types.late(() => DiscussionModel)), {}),
    discussionReplies: types.optional(types.map(types.late(() => DiscussionReplyModel)), {}),
    studentClassrooms: types.optional(types.map(types.late(() => StudentClassroomModel)), {})
})
    .actions(self => ({
    queryAuth(variables, resultSelector = userModelPrimitives.toString(), options = {}) {
        return self.query(`query auth { auth {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryTeachers(variables, resultSelector = userPaginatorModelPrimitives.toString(), options = {}) {
        return self.query(`query teachers($first: Int, $page: Int) { teachers(first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryStudents(variables, resultSelector = userPaginatorModelPrimitives.toString(), options = {}) {
        return self.query(`query students($grade: String, $first: Int, $page: Int) { students(grade: $grade, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryClassrooms(variables, resultSelector = classRoomModelPrimitives.toString(), options = {}) {
        return self.query(`query classrooms { classrooms {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryClassroom(variables, resultSelector = classRoomModelPrimitives.toString(), options = {}) {
        return self.query(`query classroom($id: ID!) { classroom(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryClassroomByUser(variables, resultSelector = classRoomModelPrimitives.toString(), options = {}) {
        return self.query(`query classroomByUser { classroomByUser {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    querySections(variables, resultSelector = sectionModelPrimitives.toString(), options = {}) {
        return self.query(`query sections { sections {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    querySectionByStudentClassroom(variables, resultSelector = sectionModelPrimitives.toString(), options = {}) {
        return self.query(`query sectionByStudentClassroom { sectionByStudentClassroom {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    querySectionByClassroom(variables, resultSelector = sectionModelPrimitives.toString(), options = {}) {
        return self.query(`query sectionByClassroom($id: ID!) { sectionByClassroom(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    querySection(variables, resultSelector = sectionModelPrimitives.toString(), options = {}) {
        return self.query(`query section($id: ID) { section(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryContents(variables, resultSelector = contentPaginatorModelPrimitives.toString(), options = {}) {
        return self.query(`query contents($classroomId: ID!, $sectionId: ID, $first: Int, $page: Int) { contents(classroomId: $classroomId, sectionId: $sectionId, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryContentByUser(variables, resultSelector = contentPaginatorModelPrimitives.toString(), options = {}) {
        return self.query(`query contentByUser($first: Int, $page: Int) { contentByUser(first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryContentBySection(variables, resultSelector = contentModelPrimitives.toString(), options = {}) {
        return self.query(`query contentBySection($id: String!) { contentBySection(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryContent(variables, resultSelector = contentModelPrimitives.toString(), options = {}) {
        return self.query(`query content($id: ID!) { content(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryDiscussion(variables, resultSelector = discussionPaginatorModelPrimitives.toString(), options = {}) {
        return self.query(`query discussion($id: ID!, $first: Int, $page: Int) { discussion(id: $id, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryDiscussionReplies(variables, resultSelector = discussionReplyPaginatorModelPrimitives.toString(), options = {}) {
        return self.query(`query discussionReplies($id: ID!, $first: Int, $page: Int) { discussionReplies(id: $id, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryAllStudentProgress(variables, resultSelector = progressModelPrimitives.toString(), options = {}) {
        return self.query(`query allStudentProgress { allStudentProgress {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryStudentClassroom(variables, resultSelector = studentClassroomModelPrimitives.toString(), options = {}) {
        return self.query(`query studentClassroom($classroomId: String) { studentClassroom(classroom_id: $classroomId) {
        ${typeof resultSelector === "function" ? resultSelector(new StudentClassroomModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    queryStudentProgress(variables, resultSelector = progressModelPrimitives.toString(), options = {}) {
        return self.query(`query studentProgress($section: ID) { studentProgress(section: $section) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, options);
    },
    mutateAuthUpdate(variables, resultSelector = userModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation authUpdate($name: String, $email: String, $password: String, $passwordConfirmation: String, $avatar: Upload) { authUpdate(name: $name, email: $email, password: $password, password_confirmation: $passwordConfirmation, avatar: $avatar) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateResetPassword(variables, optimisticUpdate) {
        return self.mutate(`mutation resetPassword($email: String!) { resetPassword(email: $email) }`, variables, optimisticUpdate);
    },
    mutateResetPasswordCallback(variables, optimisticUpdate) {
        return self.mutate(`mutation resetPasswordCallback($email: String!, $code: String!, $password: String!, $passwordConfirmation: String!) { resetPasswordCallback(email: $email, code: $code, password: $password, password_confirmation: $passwordConfirmation) }`, variables, optimisticUpdate);
    },
    mutateRegister(variables, optimisticUpdate) {
        return self.mutate(`mutation register($args: CreateUserInput!) { register(args: $args) }`, variables, optimisticUpdate);
    },
    mutateLogin(variables, optimisticUpdate) {
        return self.mutate(`mutation login($email: String!, $password: String!) { login(email: $email, password: $password) }`, variables, optimisticUpdate);
    },
    mutateLogout(variables, optimisticUpdate) {
        return self.mutate(`mutation logout { logout }`, variables, optimisticUpdate);
    },
    mutateSections(variables, resultSelector = sectionModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation sections($classroomId: ID!, $title: String!) { sections(classroomId: $classroomId, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateSectionUpdate(variables, resultSelector = sectionModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation sectionUpdate($id: ID!, $title: String!) { sectionUpdate(id: $id, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateContent(variables, resultSelector = contentModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation content($sectionId: String!, $classroomId: String!, $title: String!, $description: String!, $content: Upload!) { content(section_id: $sectionId, classroom_id: $classroomId, title: $title, description: $description, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateDiscussion(variables, resultSelector = discussionModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation discussion($contentId: ID!, $content: String!, $title: String!) { discussion(content_id: $contentId, content: $content, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateDiscussionUpdate(variables, resultSelector = discussionModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation discussionUpdate($id: ID!, $content: String!, $title: String!) { discussionUpdate(id: $id, content: $content, title: $title) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateDiscussionDelete(variables, resultSelector = discussionModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation discussionDelete($id: ID!) { discussionDelete(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateDiscussionReplyDelete(variables, resultSelector = discussionReplyModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation discussionReplyDelete($id: ID!) { discussionReplyDelete(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateDiscussionReply(variables, resultSelector = discussionReplyModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation discussionReply($discussionId: ID!, $content: String!) { discussionReply(discussion_id: $discussionId, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateDiscussionReplyUpdate(variables, resultSelector = discussionReplyModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation discussionReplyUpdate($id: ID!, $content: String!) { discussionReplyUpdate(id: $id, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateProgressUpdate(variables, resultSelector = progressModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation progressUpdate($id: ID!, $played: Int!) { progressUpdate(id: $id, played: $played) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateProgressCompletionMark(variables, resultSelector = progressModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation progressCompletionMark($id: ID!, $completed: Boolean!) { progressCompletionMark(id: $id, completed: $completed) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
    mutateUser(variables, resultSelector = userModelPrimitives.toString(), optimisticUpdate) {
        return self.mutate(`mutation user($name: String!, $email: String!, $password: String!, $role: Role, $grade: Grade) { user(name: $name, email: $email, password: $password, role: $role, grade: $grade) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate);
    },
})));
