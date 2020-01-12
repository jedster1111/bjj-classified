import React, { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getAthletes, getVideos } from "./api";
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

  const playerRef = useRef<ReactPlayer>() as React.MutableRefObject<
    ReactPlayer
  >; //TODO: Dirty hack

  const handleSkip = (): void => {
    playerRef.current.seekTo(35);
  };

  if (!athletes || !videos) return <p>Loading</p>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          Athletes:{" "}
          {athletes.map((athlete, i) => (
            <li key={i}>{athlete}</li>
          ))}
        </ul>
        <ul>
          Videos:{" "}
          {videos.map((url, i) => (
            <li key={i}>
              <ReactPlayer ref={playerRef} url={url} controls />
              <button onClick={handleSkip}>Skip to 35s</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
