import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const queryAllClassroom = () => {
    const [classrooms, { fetch, loading }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.queryClassrooms,
    });
    return {
        classrooms,
        fetch,
        loading,
    };
};
const queryClassroom = () => {
    const [classroom, { fetch, loading }] = useFetchQuery({
        queryKey: RootStoreBaseQueries.queryClassroom,
        builder(instance) {
            return instance.grade.id.grade.sectionCount.photo.id.studentCount.sectionCount.sections((m) => m.id.title.contentCount);
        },
    });
    const param = useParams();
    useEffect(() => {
        if (param.id) {
            fetch(param);
        }
    }, []);
    return {
        classroom,
        fetch,
        loading,
    };
};
export const classroomServices = {
    queryAllClassroom,
    queryClassroom,
};
