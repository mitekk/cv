interface ButtonProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, style }) => (
  <div className="flex flex-col gap-2 items-center">
    <button
      style={style}
      className={`px-6 py-2 rounded-lg text-white shadow min-h-20 text-2xl font-semibold bg-stone-900 `}
      onClick={onClick}
    >
      {children}
    </button>
  </div>
);
