import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { AppBar, Box, Tab, Tabs, useTheme } from "@material-ui/core";
import { useClassroomManagement } from "@providers/classroom-management";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useEffect } from "react";
import { useLayout } from "@providers/layout-provider/provider";
const items = [
    { path: "contents", label: "Konten" },
    { path: "section", label: "Mata pelajaran" },
    { path: "students", label: "Siswa" },
    { path: "add-content", label: "Tambah konten" },
];
export const Navigator = () => {
    const { path, updatePath } = useClassroomManagement();
    const theme = useTheme();
    const { nodeRef, dimension } = useNodeDimension();
    const { pushPageHeight } = useLayout();
    useEffect(() => {
        if (dimension.height && nodeRef.current) {
            const node = nodeRef.current;
            if (!node.id) {
                const id = "classroom-management-header";
                node.setAttribute("id", id);
            }
            const cb = pushPageHeight({
                id: node.id,
                height: node.getBoundingClientRect().height,
            });
            return () => cb();
        }
        return () => { };
    }, [dimension]);
    return React.useMemo(() => (_jsx(AppBar, Object.assign({ position: "sticky", ref: nodeRef }, { children: _jsx(Box, Object.assign({ bgcolor: theme.palette.primary.main, color: "white" }, { children: _jsx(Tabs, Object.assign({ value: path, onChange: (e, v) => updatePath(v) }, { children: items.map((item) => (_jsx(Tab, { value: item.path, label: item.label }, item.path))) }), void 0) }), void 0) }), void 0)), [path]);
};
