import { useParams } from "react-router-dom";
import { useQuery, } from "@root/models";
import { pageListNonPaginatorFactory } from "@utils/page-list-provider";
import { RootStoreBaseQueries } from "@root-model";
import { studentSectionWrapper, useStudentContent, } from "./student-section-provider";
import { useEffect, useRef } from "react";
const argumentGetter = () => {
    /**
     * Section id
     */
    const { id } = useParams();
    return { section: id };
};
const builder = (selector) => {
    return selector.id.section_id.content_id.played.status;
};
const useProgressUtils = ({ data }) => {
    const { selected, setSelected } = useStudentContent();
    const getProgress = () => {
        if (selected)
            return data.find((item) => {
                return item.content_id === selected.id;
            });
        return null;
    };
    const getProgressByContent = (content) => {
        return data.find((item) => item.content_id === content.id);
    };
    const { store: root } = useQuery();
    const playedRef = useRef(0);
    const resetPlayedRef = (a) => {
        playedRef.current = 0;
        return a;
    };
    useEffect(() => {
        resetPlayedRef();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [selected]);
    const callback = (current) => {
        return root
            .mutateProgressUpdate({
            id: current.id,
            played: Math.floor(playedRef.current),
        })
            .currentPromise();
    };
    const switchContent = (content) => {
        return () => {
            const v = playedRef.current;
            const prev = getProgressByContent(selected);
            if (prev && prev.played < v) {
                return callback(prev).then(() => {
                    resetPlayedRef();
                    setSelected(content);
                });
            }
            else
                setSelected(content);
        };
    };
    return {
        active: getProgress(),
        playedRef,
        switchContent,
        getProgressByContent,
    };
};
export const studentProgressUtils = pageListNonPaginatorFactory({
    query: RootStoreBaseQueries.queryStudentProgress,
    builder,
    argumentGetter,
    customComparator(arg) {
        return Boolean(arg.data.length);
    },
    customHook: useProgressUtils,
});
export const StudentProgressProvider = (c) => studentSectionWrapper(studentProgressUtils.wrapper(c));
export const useStudentProgress = studentProgressUtils.useProvider;
