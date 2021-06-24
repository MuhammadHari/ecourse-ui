import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePaginator, PaginatorProvider, usePaginatorContext, } from "@hooks/use-paginator";
import { observer } from "mobx-react";
import { Box, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useBreakpoint } from "@hooks/use-breakpoint";
import { gradeUtils } from "@utils/grade-tranform";
import { find } from "lodash";
import { useNodeDimension } from "@hooks/use-node-dimension";
const modelBuilder = (instance) => instance.email.id.name.role.grade.created_at.updated_at;
const useClasses = makeStyles(() => ({
    cell: {
        background: "white",
    },
}));
const Head = ({ hideGrade }) => {
    const classes = useClasses();
    const items = ["Nama", "Email"];
    if (!hideGrade) {
        items.push("Jenjang");
    }
    return (_jsx(TableHead, { children: _jsx(TableRow, { children: items.map((item) => (_jsx(TableCell, Object.assign({ className: classes.cell }, { children: item }), item))) }, void 0) }, void 0));
};
const Row = ({ user, hideGrade, }) => {
    const { name, email, gradeLabel } = user;
    return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: name }, void 0),
            _jsx(TableCell, { children: email }, void 0),
            !hideGrade ? _jsx(TableCell, { children: gradeLabel }, void 0) : null] }, void 0));
};
export const UserDataTableProvider = observer(({ query, children, grade }) => {
    const args = {
        queryKey: query,
        modelBuilder,
    };
    if (grade) {
        const searchGrade = find(gradeUtils.map, { grade });
        if (searchGrade)
            args.initial = {
                grade: searchGrade.roman,
                first: 10,
            };
    }
    const ctx = usePaginator(args);
    return (_jsx(PaginatorProvider.Provider, Object.assign({ value: ctx }, { children: children }), void 0));
});
export const UserDataTable = observer(({ hideGrade = false, height }) => {
    const { data, paginator, go } = usePaginatorContext();
    const isMd = useBreakpoint("md");
    const { nodeRef, dimension } = useNodeDimension();
    return (_jsx(Box, Object.assign({ bgcolor: "white", height: height }, { children: _jsxs(Box, { children: [!dimension.height ? null : (_jsx(TableContainer, Object.assign({ style: { height: `calc(${height}px - ${dimension.height}px)` } }, { children: _jsxs(Table, Object.assign({ size: isMd ? "small" : "medium", stickyHeader: true }, { children: [_jsx(Head, { hideGrade: hideGrade }, void 0),
                            _jsx(TableBody, { children: data.map((user) => (_jsx(Row, { hideGrade: hideGrade, user: user }, user.id))) }, void 0)] }), void 0) }), void 0)),
                _jsx("div", Object.assign({ ref: nodeRef }, { children: _jsx(Box, Object.assign({ paddingY: 2 }, { children: _jsx(Pagination, { onChange: (e, page) => go(page), count: paginator.lastPage }, void 0) }), void 0) }), void 0)] }, void 0) }), void 0));
});
