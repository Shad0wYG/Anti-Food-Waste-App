import React, { CSSProperties } from "react";

interface Props {
  name?: string;
  category?: "meat" | "fruit/vegetable" | "dairy" | "other";
  onRemove: () => void;
}

const myStyle: CSSProperties = { border: "3px solid black" };

const Product: React.FC<Props> = ({
  name = "nume1",
  category = "other",
  onRemove,
}) => {
  return (
    <div
      className="container justify-content row align-items-start col-8"
      style={myStyle}
    >
      <p className="col-2">Name: {name}</p>
      <p className="col-2">Category: {category}</p>
      <label className="col-2">
        Claim
        <input type="checkbox" />
      </label>
      <button className="col-2 btn btn-outline-danger" onClick={onRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
        Remove
      </button>
    </div>
  );
};

export default Product;
