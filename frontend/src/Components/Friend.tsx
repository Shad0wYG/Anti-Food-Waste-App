import { CSSProperties } from "react";

interface Props {
  name?: string;
  onClick: () => void;
}

const myStyle: CSSProperties = { border: "3px solid black" };

function Friend({ name = "Daniel", onClick }: Props) {
  return (
    <div onClick={onClick} className="col-3" style={myStyle}>
      <p>{name}</p>
    </div>
  );
}

export default Friend;
