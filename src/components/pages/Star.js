import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Star } from "react-konva";
import music from "../../images/khatvongtuoitre.mp3";

const AnimatedRectangleWithStar = () => {
  const [rectWidth, setRectWidth] = useState(0);
  const [rectHeight, setRectHeight] = useState(0);
  const [starOpacity, setStarOpacity] = useState(0);

  const rectTargetWidth = 800;
  const rectTargetHeight = 500;
  const starSize = 150;

  // Ref để điều khiển âm thanh
  const audioRef = useRef(null);

  useEffect(() => {
    // Phát nhạc tự động khi component được render
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Couldn't play audio: ", err));
    }

    // Hiệu ứng vẽ hình chữ nhật và ngôi sao
    const animateRectangle = () => {
      requestAnimationFrame(() => {
        if (rectWidth < rectTargetWidth) {
          setRectWidth(rectWidth + 4);
        }
        if (rectHeight < rectTargetHeight) {
          setRectHeight(rectHeight + 2);
        }
      });
    };

    animateRectangle();

    if (rectWidth >= rectTargetWidth && rectHeight >= rectTargetHeight) {
      const starAnim = setInterval(() => {
        setStarOpacity((prev) => Math.min(prev + 0.01, 1));
      }, 50);

      return () => clearInterval(starAnim);
    }
  }, [rectWidth, rectHeight]);

  return (
    <>
      <audio ref={audioRef} src={music} loop />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            x={window.innerWidth / 2 - rectTargetWidth / 2}
            y={window.innerHeight / 2 - rectTargetHeight / 2}
            width={rectWidth}
            height={rectHeight}
            fill="red"
          />
          {rectWidth >= rectTargetWidth && rectHeight >= rectTargetHeight && (
            <Star
              x={window.innerWidth / 2}
              y={window.innerHeight / 2}
              numPoints={5}
              innerRadius={starSize / 2.5}
              outerRadius={starSize}
              fill="yellow"
              rotation={0}
              opacity={starOpacity}
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default AnimatedRectangleWithStar;
