/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
/**
 * Typescript enum
 */
export var ContentType;
(function (ContentType) {
    ContentType["PDF"] = "PDF";
    ContentType["VIDEO"] = "VIDEO";
})(ContentType || (ContentType = {}));
/**
* ContentType
*/
export const ContentTypeEnumType = types.enumeration("ContentType", [
    "PDF",
    "VIDEO",
]);
