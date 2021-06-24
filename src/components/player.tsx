import * as React from "react";
import "video-react/dist/video-react.css";
import { makeStyles, useTheme } from "@material-ui/core";
import "@vime/core/themes/light.css";
import "@vime/core/themes/default.css";
import {
  Player as VimePlayer,
  Video,
  DefaultUi,
  DefaultControls,
} from "@vime/react";
import { useRef } from "react";

type PlayerProps = {
  url: string;
  onContainerClick(): void;
  play?: boolean;
  playingRef?: React.MutableRefObject<number>;
};

export const Player = ({ url, onContainerClick, playingRef }: PlayerProps) => {
  const playerRef = useRef<HTMLVmPlayerElement | null>(null);
  const onCurrentTimeChange = (e: CustomEvent<number>) => {
    if (playerRef) {
      // @ts-ignore
      playingRef.current = e.detail;
    }
  };

  return (
    <div onClick={onContainerClick}>
      <VimePlayer
        onVmCurrentTimeChange={playingRef ? onCurrentTimeChange : undefined}
        ref={playerRef}
      >
        <Video crossOrigin="">
          <source
            data-src={url}
            type="video/mp4"
          />
        </Video>
        <DefaultUi noControls>
          <DefaultControls hideOnMouseLeave activeDuration={2000} />
        </DefaultUi>
      </VimePlayer>
    </div>
  );
};
