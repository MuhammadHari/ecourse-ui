import { PaginatorInfoModelBase } from "./PaginatorInfoModel.base";
/* A graphql query fragment builders for PaginatorInfoModel */
export { selectFromPaginatorInfo, paginatorInfoModelPrimitives, PaginatorInfoModelSelector } from "./PaginatorInfoModel.base";
/**
 * PaginatorInfoModel
 *
 * Pagination information about the corresponding list of items.
 */
export const PaginatorInfoModel = PaginatorInfoModelBase
    .actions(self => ({
    // This is an auto-generated example action.
    log() {
        console.log(JSON.stringify(self));
    }
}));
