import { useContext } from 'react';
import { PhotoContext } from '../context/PhotoContext';
const PhotoShow = () => {
  const { photoUrl } = useContext(PhotoContext);
  return (
    <>
      <h2>Photo Show</h2>
      <img src={photoUrl} />{' '}
    </>
  );
};

export default PhotoShow;
