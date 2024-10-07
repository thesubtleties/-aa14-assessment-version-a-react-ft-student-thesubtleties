import { Link } from 'react-router-dom';
function CatsIndex({ cats }) {
  const catItems = cats.map((cat) => {
    return (
      <li key={cat.id}>
        <Link to={`/cats/${cat.id}`}>{cat.name}</Link>
      </li>
    );
  });
  return (
    <>
      <h2>Cats Index</h2>
      <ul>{catItems}</ul>
    </>
  );
}

export default CatsIndex;
