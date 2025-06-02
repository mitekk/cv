import { useEffect, useLayoutEffect, useState } from "react";

interface RoadCarProps {
  pathRef: React.RefObject<SVGPathElement | null>;
  startAnimation?: boolean;
  onAnimationFinish?: () => void;
}

export const RoadCar: React.FC<RoadCarProps> = ({
  pathRef,
  startAnimation = false,
  onAnimationFinish = () => {},
}) => {
  const [carProgress, setCarProgress] = useState(0);
  const [carPos, setCarPos] = useState({ x: 0, y: 0, angle: 0 });
  const [pathLength, setPathLength] = useState(0);

  useLayoutEffect(() => {
    if (pathRef.current && startAnimation) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathRef, startAnimation]);

  useEffect(() => {
    if (!pathRef.current || !pathLength) return;
    let animationFrame: number;
    const duration = 30000;
    let startTime: DOMHighResTimeStamp | null = null;

    function animate(ts: DOMHighResTimeStamp) {
      if (!pathRef.current) return;
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCarProgress(progress);

      const len = pathLength * progress;
      const ahead = Math.min(pathLength, len + 1);
      const pos = pathRef.current.getPointAtLength(len);
      const posAhead = pathRef.current.getPointAtLength(ahead);
      const dx = posAhead.x - pos.x;
      const dy = posAhead.y - pos.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      setCarPos({ x: pos.x, y: pos.y, angle });

      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [pathLength, pathRef]);

  useEffect(() => {
    if (carProgress >= 1) {
      onAnimationFinish();
    }
  }, [carProgress, onAnimationFinish]);

  return (
    <g
      style={{ transition: "none" }}
      transform={`
    translate(${carPos.x},${carPos.y})
    rotate(${carPos.angle})
  `}
    >
      <text
        x={0}
        y={5}
        fontSize={32}
        dominantBaseline="ideographic"
        textAnchor="middle"
        transform="scale(-1,1)"
        style={{
          userSelect: "none",
          filter: "drop-shadow(0px 2px 6px #000)",
          pointerEvents: "auto",
        }}
      >
        🚗
      </text>
    </g>
  );
};
