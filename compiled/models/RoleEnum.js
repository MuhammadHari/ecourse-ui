/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
/**
 * Typescript enum
 */
export var Role;
(function (Role) {
    Role["Adm"] = "Adm";
    Role["Teacher"] = "Teacher";
    Role["Student"] = "Student";
})(Role || (Role = {}));
/**
* Role
*/
export const RoleEnumType = types.enumeration("Role", [
    "Adm",
    "Teacher",
    "Student",
]);
