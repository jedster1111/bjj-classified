import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { VideoWithEventsDto } from "bjj-common";
import { getMoveVideos } from "../../api";

export const MoveVideoList = (): JSX.Element => {
  const [videos, setVideos] = useState<VideoWithEventsDto[]>();
  const [error, setError] = useState<Error>();

  const { params } = useRouteMatch<{ moveId: string }>();
  const moveId = params.moveId;

  useEffect(() => {
    async function loadVideos() {
      try {
        setError(undefined);
        setVideos(undefined);
        const videos = (await getMoveVideos(moveId)).data;
        setVideos(videos);
      } catch (e) {
        setError(e);
      }
    }

    loadVideos();
  }, [moveId]);

  if (error) return <div>Whoops, error</div>;

  if (!videos) return <div>Loading...</div>;

  if (!videos.length) return <div>No videos found for that move!</div>;

  return (
    <ul>
      {videos.map((video) => (
        <li key={video.id}>
          {/* <a
            href={getYoutubeLinkFromKey(video.youtubeKey)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {video.title} at {video.events.filter(e => e.moveId === moveId).map(e => convertSecondsToMinutesTimestamp(e.timestamp)).join(", ")}
          </a> */}
          <Link to={`/videos/${video.id}`}>{video.title}</Link>
        </li>
      ))}
    </ul>
  );
};
