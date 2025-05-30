import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LayoutContext } from "../../context";
import {
  generatePath,
  generateShapes,
  getPathData,
} from "../../services/grid/path";
import type { Point, Shape, ShapeKeyPath } from "../../types";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import { TiledShape } from "../shape/shape";
import { RoadTripTile } from "../tile";
import "./roadTrip.grid.css";

interface RoadTripProps {
  onAnimationStart?: () => void;
  onAnimationFinish?: () => void;
  removeTiles?: boolean;
}

export const RoadTripGrid: React.FC<RoadTripProps> = () =>
  //     {
  //   onAnimationStart,
  //   onAnimationFinish,
  //   removeTiles = false,
  // }
  {
    const { dims, gridSize } = useContext(LayoutContext);
    // const { excitementLevel } = useContext(PageContext);
    const [animated, setAnimated] = useState(false);
    const [pathPoints, setPathPoints] = useState<Point[]>([]);
    const [shapes, setShapes] = useState<Shape<ShapeKeyPath>[]>([]);
    const [pathData, setPathData] = useState<string>("");
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
      if (dims.cols === 0 || dims.rows === 0) return;
      const timeout = setTimeout(() => {
        const pathPoints = generatePath(dims);
        setPathPoints(pathPoints);
      }, 0);
      return () => clearTimeout(timeout);
    }, [dims]);

    useEffect(() => {
      if (dims.cols === 0 || dims.rows === 0) return;
      const timeout = setTimeout(() => {
        const shapes = generateShapes(dims, pathPoints);
        setShapes(shapes);

        const path = getPathData(pathPoints);
        setPathData(path);
      }, 0);
      return () => clearTimeout(timeout);
    }, [dims, pathPoints]);

    useEffect(() => {
      setAnimated(false);
      const timeout = setTimeout(() => setAnimated(true), 50);
      return () => clearTimeout(timeout);
    }, [shapes]);

    useLayoutEffect(() => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    }, [pathData]);

    return shapes.length ? (
      <div className="relative">
        <div
          style={{
            position: "relative",
            width: gridSize.width,
            height: gridSize.height,
            overflow: "hidden",
          }}
        >
          {shapes.map((shape, idx) => {
            const finalTop = shape.points[0].x * (TILE_SIZE + TILE_GAP);
            const finalLeft = shape.points[0].y * (TILE_SIZE + TILE_GAP);
            const top = animated ? finalTop : -dims.cols * TILE_SIZE * 2;

            return (
              <TiledShape
                key={`${shape.id}`}
                shape={shape}
                top={top}
                left={finalLeft}
                styles={{
                  transition: `top 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${
                    (shapes.length - idx) * 0.001
                  }s, transform 0.5s cubic-bezier(.4,0,.2,1)`,
                }}
                onAnimationEnd={() => {}}
              >
                {shape.points.map(({ x, y }) => (
                  <RoadTripTile
                    key={`${x}-${y}-${shape.key}`}
                    shape={shape.key}
                    style={{
                      left: (y - shape.points[0].y) * (TILE_SIZE + TILE_GAP),
                      top: (x - shape.points[0].x) * (TILE_SIZE + TILE_GAP),
                    }}
                  />
                ))}
              </TiledShape>
            );
          })}
        </div>
        <svg
          width={gridSize.width}
          height={gridSize.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#353839"
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
        </svg>
      </div>
    ) : null;
  };
