interface Props {
  children: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "danger" | "success";
}

function Button({ children, onClick, color = "primary" }: Props) {
  return (
    <button
      type="button"
      className={"col-3 btn btn-" + color}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
