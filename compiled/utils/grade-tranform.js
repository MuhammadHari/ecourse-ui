import { Grade } from "@root/models/GradeEnum";
import voca from "voca";
import { find } from "lodash";
const gradeMap = {};
function romanize(num) {
    if (isNaN(num))
        return NaN;
    const digits = String(+num).split("");
    const key = [
        "",
        "C",
        "CC",
        "CCC",
        "CD",
        "D",
        "DC",
        "DCC",
        "DCCC",
        "CM",
        "",
        "X",
        "XX",
        "XXX",
        "XL",
        "L",
        "LX",
        "LXX",
        "LXXX",
        "XC",
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
    ];
    let roman = "";
    let i = 3;
    while (i--) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        roman = (key[+digits.pop() + i * 10] || "") + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
}
export const gradesConst = [];
const base = [];
Object.keys(Grade).forEach((grade) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gradesConst.push(grade);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const str = Grade[grade];
    const addition = 3;
    let label = "SD";
    const isHS = voca(str).startsWith("HS") ? 6 : 0;
    const isJHS = voca(str).startsWith("JHS") ? 3 : 0;
    const parse = voca(str)
        .replaceAll("JHS", "")
        .replaceAll("HS", "")
        .replaceAll("PR", "");
    const n = parseInt(parse.value()) + (addition + isHS + isJHS);
    if (isHS) {
        label = "SMA";
    }
    if (isJHS) {
        label = "SMP";
    }
    const r = romanize(n);
    const obj = {
        roman: r,
        label: `${label} ${r}`,
        num: n,
        grade,
    };
    gradeMap[r] = obj;
    base.push(obj);
});
export const gradeMaps = gradeMap;
export const gradeUtils = {
    obj: gradeMap,
    map: base,
    find(grade) {
        return find(base, { grade });
    },
};
