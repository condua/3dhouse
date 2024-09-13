import React, { useEffect, useRef, useState } from "react";

const YoutubeVideo = () => {
  const videoId = "MByJ2wdQeb0"; // Replace with your video ID
  const [player, setPlayer] = useState(null);
  const seekBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    // Initialize YouTube Player once the API is ready
    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player("youtube-player", {
        height: "315",
        width: "560",
        videoId: videoId,
        playerVars: {
          modestbranding: 1,
          iv_load_policy: 3,
          autoplay: 0,
          controls: 1,
          showinfo: 0,
          rel: 0, // Minimizes related videos
          fs: 0, // Hides the fullscreen button
          playsinline: 1, // Enables inline playback on mobile devices
        },
        events: {
          onReady: () => {
            setPlayer(ytPlayer);
            seekBarRef.current.max = ytPlayer.getDuration();
            volumeBarRef.current.value = ytPlayer.getVolume();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              // Update seek bar value while playing
              const updateSeekBar = () => {
                if (player) {
                  seekBarRef.current.value = player.getCurrentTime();
                  requestAnimationFrame(updateSeekBar);
                }
              };
              updateSeekBar();
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    return () => {
      // Cleanup: Remove YouTube script and player when component unmounts
      document.body.removeChild(script);
    };
  }, [player]);

  const handleSeek = (event) => {
    if (player) {
      player.seekTo(parseFloat(event.target.value));
    }
  };

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleVolumeChange = (event) => {
    if (player) {
      player.setVolume(parseFloat(event.target.value));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div id="youtube-player"></div>
      <div className="flex flex-col items-center mt-4">
        <input
          type="range"
          min="0"
          ref={seekBarRef}
          step="0.1"
          onChange={handleSeek}
          style={{ width: "560px", marginTop: "10px" }}
        />
        <div className="flex items-center mt-2">
          <button onClick={handlePlayPause} style={{ marginRight: "10px" }}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            ref={volumeBarRef}
            onChange={handleVolumeChange}
            style={{ width: "150px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideo;
