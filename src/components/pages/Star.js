import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Star } from "react-konva";

const AnimatedRectangleWithStar = () => {
  const [rectWidth, setRectWidth] = useState(0);
  const [rectHeight, setRectHeight] = useState(0);
  const [starOpacity, setStarOpacity] = useState(0);

  const rectTargetWidth = 800;
  const rectTargetHeight = 500;
  const starSize = 150;

  useEffect(() => {
    const rectAnim = requestAnimationFrame(() => {
      if (rectWidth < rectTargetWidth) {
        setRectWidth(rectWidth + 4);
      }
      if (rectHeight < rectTargetHeight) {
        setRectHeight(rectHeight + 2);
      }
    });

    if (rectWidth >= rectTargetWidth && rectHeight >= rectTargetHeight) {
      const starAnim = setInterval(() => {
        setStarOpacity((prev) => Math.min(prev + 0.01, 1));
      }, 50); // Tăng opacity dần dần trong 5 giây

      return () => clearInterval(starAnim);
    }

    return () => cancelAnimationFrame(rectAnim);
  }, [rectWidth, rectHeight]);

  return (
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
            opacity={starOpacity} // Dùng opacity để tạo hiệu ứng hiện từ từ
          />
        )}
      </Layer>
    </Stage>
  );
};

export default AnimatedRectangleWithStar;
