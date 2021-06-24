import { jsx as _jsx } from "react/jsx-runtime";
import { service } from "@services/content";
import { Form } from "./form";
import { observer } from "mobx-react";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useClassroomManagement } from "@providers/classroom-management";
const useCreate = service.create;
export const CreateForm = observer(() => {
    const { model: classroom, updatePath, refreshModel, } = useClassroomManagement();
    const { provider: Provider, loading, handler, result, } = useCreate({
        injectInput: {
            classroomId: classroom.id,
        },
        inputParser({ description, ...rest }) {
            return {
                ...rest,
                description: JSON.stringify(description),
            };
        },
    });
    useSuccessModal({
        callback() {
            refreshModel();
            updatePath("contents");
        },
        message: "Konten berhasil tambahkan",
        depedencies: Boolean(result),
    });
    return (_jsx(Provider, { children: _jsx(Form, { showUpload: true, classroom: classroom, loading: loading, handler: handler }, void 0) }, void 0));
});
