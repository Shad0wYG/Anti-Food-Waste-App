interface Props {
  children: string;
  column?: string;
}

function Label({ children, column = "auto" }: Props) {
  return (
    <div className={"col-" + column}>
      <p>{children}</p>
    </div>
  );
}

export default Label;
