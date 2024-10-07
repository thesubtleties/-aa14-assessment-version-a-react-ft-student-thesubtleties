import { useParams } from 'react-router-dom';
function CatShow({ cats }) {
  const catId = useParams().catId;
  const cat = cats.find((cat) => cat.id === catId);
  return (
    <>
      <h2>{cat.name}</h2>
      <div>{cat.color}</div>
      <div>Age: {cat.age}</div>
    </>
  );
}

export default CatShow;
