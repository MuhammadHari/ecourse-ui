import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "video-react/dist/video-react.css";
import "@vime/core/themes/light.css";
import "@vime/core/themes/default.css";
import { Player as VimePlayer, Video, DefaultUi, DefaultControls, } from "@vime/react";
import { useRef } from "react";
export const Player = ({ url, onContainerClick, playingRef }) => {
    const playerRef = useRef(null);
    const onCurrentTimeChange = (e) => {
        if (playerRef) {
            // @ts-ignore
            playingRef.current = e.detail;
        }
    };
    return (_jsx("div", Object.assign({ onClick: onContainerClick }, { children: _jsxs(VimePlayer, Object.assign({ onVmCurrentTimeChange: playingRef ? onCurrentTimeChange : undefined, ref: playerRef }, { children: [_jsx(Video, Object.assign({ crossOrigin: "" }, { children: _jsx("source", { "data-src": url, type: "video/mp4" }, void 0) }), void 0),
                _jsx(DefaultUi, Object.assign({ noControls: true }, { children: _jsx(DefaultControls, { hideOnMouseLeave: true, activeDuration: 2000 }, void 0) }), void 0)] }), void 0) }), void 0));
};
