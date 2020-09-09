import React, { useCallback, useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useLoadData } from "../../hooks/useLoadData";
import { getVideo } from "../../api";
import { getYoutubeLinkFromKey } from "bjj-common";
import { EventsList } from "../events/EventsList";

const VideoPageContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 47.85%;

  width: 85%;
`;

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const VideoTitle = styled.span`
  font-size: 32px;
  margin-bottom: 16px;
`;

export const VideoPage = (): JSX.Element => {
  const playerRef = useRef<ReactPlayer>(null);

  const { videoId } = useParams<{ videoId: string }>();

  const getVideoMemo = useCallback(() => getVideo(videoId), [videoId]);
  const [isVideoLoading, loadingVideoError, video] = useLoadData(getVideoMemo);

  if (isVideoLoading === undefined || isVideoLoading)
    return <div>Loading...</div>;

  if (loadingVideoError) return <div>Whoops: {loadingVideoError.message}</div>;

  if (!video) return <div>That video doesn&apost exist?</div>;

  return (
    <VideoPageContainer>
      <VideoTitle>{video.title}</VideoTitle>
      <PlayerWrapper>
        <StyledReactPlayer
          ref={playerRef}
          url={getYoutubeLinkFromKey(video.youtubeKey)}
          playing
          controls
          width="100%"
          height="100%"
        />
      </PlayerWrapper>
      <EventsList
        videoId={videoId}
        seekToTime={(time) => playerRef.current?.seekTo(time)}
      />
    </VideoPageContainer>
  );
};
