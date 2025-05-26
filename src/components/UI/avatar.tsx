import "./avatar.css";

interface AvatarProps {
  src: string;
  name?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  style,
  className,
}) => (
  <div
    className={`avatar mr-5 ${className ? `${className}` : ""}`}
    style={style}
  >
    <img className="avatar-image" src={src} alt={name} draggable={false} />
    <div className="avatar-name">{name}</div>
  </div>
);
