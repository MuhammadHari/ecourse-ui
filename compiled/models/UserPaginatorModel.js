import { UserPaginatorModelBase } from "./UserPaginatorModel.base";
/* A graphql query fragment builders for UserPaginatorModel */
export { selectFromUserPaginator, userPaginatorModelPrimitives, UserPaginatorModelSelector } from "./UserPaginatorModel.base";
/**
 * UserPaginatorModel
 *
 * A paginated list of User items.
 */
export const UserPaginatorModel = UserPaginatorModelBase
    .actions(self => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    }
}));
