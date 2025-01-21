import Product from "./Product";

interface ProductProps {
  name?: string;
  category?: "meat" | "fruit/vegetable" | "dairy" | "other";
  onRemove: () => void;
}

interface ListGroupProps {
  items: ProductProps[];
}

function ListGroupProducts({ items }: ListGroupProps) {
  return (
    <>
      {items.length === 0 && <p>No products found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            <Product
              name={item.name}
              category={item.category}
              onRemove={item.onRemove}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroupProducts;
