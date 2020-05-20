import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getAthletes, getVideos, getVideo } from "./api";
import ReactPlayer from "react-player";

function useGetOnMount<T>(getFn: () => Promise<T>): T | undefined {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    const getAndSetResult = async (): Promise<void> => {
      const result = await getFn();
      setResult(result);
    };

    getAndSetResult();
  }, [getFn]);

  return result;
}

const App: React.FC = () => {
  const athletes = useGetOnMount(getAthletes);
  const videos = useGetOnMount(getVideos);
  const video = useGetOnMount(getVideo);

  const playerRef = useRef<ReactPlayer>() as React.MutableRefObject<
    ReactPlayer
  >; //TODO: Dirty hack

  const handleSkip = (timeToSkip: number): void => {
    playerRef.current.seekTo(timeToSkip);
  };

  if (!athletes || !videos || !video) return <p>Loading</p>;

  return (
    <div className="App">
      <body className="App-body">
        <ul>
          Athletes:{" "}
          {athletes.map((athlete, i) => (
            <li key={i}>{athlete}</li>
          ))}
        </ul>
        <ul>
          Videos:{" "}
          {videos.map((url, i) => (
            <li key={i}>{`Video ${i + 1}: ${url}`}</li>
          ))}
        </ul>
        <div style={{ width: "75%" }}>
          Detail video:
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              ref={playerRef}
              url={video.url}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <ul>
          {video.events.map((event, i) => (
            <li key={i}>
              <button onClick={() => handleSkip(event.time)}>
                {event.name}
              </button>
            </li>
          ))}
        </ul>
      </body>
    </div>
  );
};

export default App;
