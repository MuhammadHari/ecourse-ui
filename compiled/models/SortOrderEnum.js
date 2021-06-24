/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
/**
 * Typescript enum
 */
export var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
/**
* SortOrder
 *
 * The available directions for ordering a list of records.
*/
export const SortOrderEnumType = types.enumeration("SortOrder", [
    "ASC",
    "DESC", // Sort records in descending order.
]);
