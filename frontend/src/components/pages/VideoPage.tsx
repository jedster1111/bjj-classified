import React, { useCallback, useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useLoadData } from "../../hooks/useLoadData";
import { getVideo } from "../../api";
import { getYoutubeLinkFromKey } from "bjj-common";

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

export const VideoPage = (): JSX.Element => {
  const playerRef = useRef<ReactPlayer>(null);

  const { videoId } = useParams<{ videoId: string }>();

  const getVideoMemo = useCallback(() => getVideo(videoId), [videoId]);
  const [isLoading, error, video] = useLoadData(getVideoMemo);

  if (isLoading === undefined || isLoading) return <div>Loading...</div>;

  if (error) return <div>Whoops: {error.message}</div>;

  if (!video) return <div>That video doesn&apost exist?</div>;

  return (
    <VideoPageContainer>
      <span>{video.title}</span>
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
    </VideoPageContainer>
  );
};
