import { convertSecondsToMinutesTimestamp } from "bjj-common";
import React, { useCallback } from "react";
import { getVideoEvents } from "../../api";
import { useLoadData } from "../../hooks/useLoadData";

type EventsListProps = {
  videoId: string;
  seekToTime: (timeInSeconds: number) => void;
};

export const EventsList = ({
  videoId,
  seekToTime,
}: EventsListProps): JSX.Element => {
  const getVideoEventsMemo = useCallback(() => getVideoEvents(videoId), [
    videoId,
  ]);
  const [
    isVideoEventsLoading,
    loadingVideoEventsError,
    videoEvents,
  ] = useLoadData(getVideoEventsMemo);

  if (isVideoEventsLoading === undefined || isVideoEventsLoading)
    return <div>Loading...</div>;

  if (loadingVideoEventsError)
    return <div>Whoops: {loadingVideoEventsError.message}</div>;

  if (!videoEvents) return <div>That video doesn&apost exist?</div>;

  return (
    <div>
      <span>Events list!</span>
      <ul>
        {videoEvents.map(({ id, move, timestamp }) => (
          <li key={id}>
            <button onClick={() => seekToTime(timestamp)}>
              {move.name} - {convertSecondsToMinutesTimestamp(timestamp)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
