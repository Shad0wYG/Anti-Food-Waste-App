interface Props {
  children?: string;
  column?: string;
}

function Textbox({ children = "", column = "auto" }: Props) {
  return (
    <div className={"col-" + column}>
      <input
        type="text"
        className="form-control "
        placeholder={children}
      ></input>
    </div>
  );
}

export default Textbox;
