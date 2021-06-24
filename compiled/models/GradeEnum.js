/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree";
/**
 * Typescript enum
 */
export var Grade;
(function (Grade) {
    Grade["HS1"] = "HS1";
    Grade["HS2"] = "HS2";
    Grade["HS3"] = "HS3";
    Grade["JHS1"] = "JHS1";
    Grade["JHS2"] = "JHS2";
    Grade["JHS3"] = "JHS3";
    Grade["PR1"] = "PR1";
    Grade["PR2"] = "PR2";
    Grade["PR3"] = "PR3";
})(Grade || (Grade = {}));
/**
* Grade
*/
export const GradeEnumType = types.enumeration("Grade", [
    "HS1",
    "HS2",
    "HS3",
    "JHS1",
    "JHS2",
    "JHS3",
    "PR1",
    "PR2",
    "PR3",
]);
