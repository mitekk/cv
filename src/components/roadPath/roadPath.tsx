import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RoadCar } from "./roadCar";

interface RoadPathProps {
  pathData?: string;
  startAnimation?: boolean;
  onAnimationFinish?: () => void;
}

export const RoadPath: React.FC<RoadPathProps> = ({
  startAnimation = false,
  pathData,
  onAnimationFinish = () => {},
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useLayoutEffect(() => {
    if (pathRef.current && startAnimation) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathData, startAnimation]);

  useEffect(() => {
    if (startAnimation) {
      const timeout = setTimeout(() => onAnimationFinish(), 1200);
      return () => clearTimeout(timeout);
    }
  }, [startAnimation, onAnimationFinish]);

  return (
    <>
      {startAnimation && (
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="#895129"
          strokeWidth={14}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.85}
          style={
            {
              filter: "drop-shadow(1px 1px 2px #0006)",
              "--path-length": pathLength,
            } as React.CSSProperties
          }
          className="road-path-animate"
        />
      )}
      {startAnimation && (
        <path
          d={pathData}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeDasharray="5 15"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.95}
          className="road-path-dash-fadein"
        />
      )}
      <RoadCar pathRef={pathRef} startAnimation={startAnimation} />
    </>
  );
};
