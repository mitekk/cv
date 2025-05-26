import "./button.css";

interface ButtonProps {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ title, onClick }) => (
  <div className="flex flex-col gap-2 items-center">
    <button
      className="button px-6 py-2 rounded-lg text-white shadow min-h-20 text-2xl font-semibold"
      onClick={onClick}
    >
      {title}
    </button>
  </div>
);
