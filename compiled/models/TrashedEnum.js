/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
/**
 * Typescript enum
 */
export var Trashed;
(function (Trashed) {
    Trashed["ONLY"] = "ONLY";
    Trashed["WITH"] = "WITH";
    Trashed["WITHOUT"] = "WITHOUT";
})(Trashed || (Trashed = {}));
/**
* Trashed
 *
 * Specify if you want to include or exclude trashed results from a query.
*/
export const TrashedEnumType = types.enumeration("Trashed", [
    "ONLY",
    "WITH",
    "WITHOUT", // Only return non-trashed results.
]);
