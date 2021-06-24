import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography } from "@material-ui/core";
import { Player } from "@components/player";
import { useToggle } from "@hooks/use-toggle";
import { PdfViewer } from "@components/pdf-viewer";
import { useContentProvider } from "@pages/shared/classroom/content/content-provider";
const VideoPlayer = ({ url }) => {
    const [play, { force }] = useToggle();
    return _jsx(Player, { url: url, onContainerClick: force(true), play: play }, void 0);
};
export const ContentViewSwitcher = ({ selected, }) => {
    const isPdf = selected.type === "PDF";
    const media = selected.mediaContent;
    const Node = isPdf ? PdfViewer : VideoPlayer;
    return _jsx(Node, { url: media }, void 0);
};
export const MediaPlayer = () => {
    const { content: selected } = useContentProvider();
    return (_jsx(Box, Object.assign({ bgcolor: "white" }, { children: !selected ? (_jsx(Typography, Object.assign({ variant: "h3", align: "center" }, { children: "Pilih salah satu konten" }), void 0)) : (_jsx(ContentViewSwitcher, { selected: selected }, void 0)) }), void 0));
};
