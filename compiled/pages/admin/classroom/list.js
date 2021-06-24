import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { observer } from "mobx-react";
import { Box, Grid } from "@material-ui/core";
import { useNavigate } from "@hooks/use-navigate";
import { ClassroomCard } from "./classroom-card";
import { classroomServices } from "@services/classroom";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useLayout } from "@providers/layout-provider/provider";
import { useHeight } from "@hooks/use-height";
const { queryAllClassroom } = classroomServices;
export const Component = observer(() => {
    const { fetch, classrooms } = queryAllClassroom();
    const { updateTitle } = useLayout();
    React.useEffect(() => {
        fetch();
        updateTitle("Ruang kelas");
    }, []);
    const { navigateHandler } = useNavigate();
    const actions = (model) => [
        {
            startIcon: _jsx(KeyboardArrowRight, {}, void 0),
            onClick: navigateHandler("/classroom/:id", { id: model.id }),
            title: "Atur kelas",
            style: {
                borderColor: "white",
                color: "white",
            },
        },
    ];
    const height = useHeight();
    return (_jsx("div", Object.assign({ style: { height } }, { children: _jsx(Grid, Object.assign({ container: true, component: Box, paddingY: 2 }, { children: classrooms?.map((classroom) => (_jsx(Grid, Object.assign({ item: true, sm: 12, md: 4 }, { children: _jsx(Box, Object.assign({ padding: 2 }, { children: _jsx(ClassroomCard, { buttons: actions(classroom), classroom: classroom }, classroom.id) }), void 0) }), classroom.id))) }), void 0) }), void 0));
});
