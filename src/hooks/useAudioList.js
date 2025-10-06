// React
import { useEffect, useRef } from "react";

// Hooks
import useObjectState from "./useObjectState";

const useAudioList = () => {
  const audioRef = useRef(null);
  const { index, isPlaying, audioList, isStopped, setField, isLoading } =
    useObjectState({
      index: 0,
      audioList: [],
      isPlaying: false,
      isLoading: false,
      isStopped: false,
    });

  // Play current audio when index changes
  useEffect(() => {
    if (isStopped) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (isPlaying) {
        setField("audioList", []);
        setField("isPlaying", false);
      }

      return;
    }

    if (!audioList.length) return;

    const currentAudio = new Audio(audioList[index]);
    audioRef.current = currentAudio;

    currentAudio.onended = () => {
      if (index < audioList.length - 1) {
        setField("index", index + 1);
      } else {
        setField("isStopped", true);
        setField("isPlaying", false);
      }
    };

    const playAudio = async () => {
      try {
        setField("isLoading", true);
        await currentAudio.play();
        setField("isPlaying", true);
      } catch (e) {
        console.error("Audio play error:", e);
      } finally {
        setField("isLoading", false);
      }
    };

    playAudio();

    return () => {
      currentAudio.pause();
      currentAudio.onended = null;
    };
  }, [index, audioList, isStopped]);

  // Start playing a list from beginning
  const setAudioList = (list = []) => {
    if (!list.length || isPlaying) return;
    setField("index", 0);
    setField("audioList", list);
  };

  const stopAudio = () => {
    setField("isStopped", true);
  };

  return { setAudioList, stopAudio, isLoading, isPlaying };
};

export default useAudioList;
