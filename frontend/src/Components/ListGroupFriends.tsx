import Friend from "./Friend";

interface FriendsProps {
  name?: string;
  onClick: () => void;
}

interface ListGroupProps {
  items: FriendsProps[];
}

function ListGroupFriends({ items }: ListGroupProps) {
  return (
    <>
      {items.length === 0 && <p>No friends found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            <Friend name={item.name} onClick={item.onClick} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroupFriends;
