export const progressSelector = (loadSection = false) => (s) => {
    const base = s.completed.id.played.updated_at.duration.status.pageNumber.content_id
        .section_id.contentType;
    if (loadSection) {
        return base.section(sectionSelector);
    }
    return base;
};
export const contentSelector = (s) => {
    return s.title.id.mediaContent.type.createdAt.pageNumber.duration.thumbnail.description.sectionId.classroomId.progress(progressSelector());
};
export const sectionSelector = (s) => {
    return s.title.progress.id.contentCount.createdAt.classroomId.pdfCount.videoCount.contents(contentSelector);
};
