import { PhotoContext } from '../context/PhotoContext';
import { useContext } from 'react';

const TogglePhotoType = () => {
  const { photoType, setPhotoType } = useContext(PhotoContext);
  return (
    <div className="toggle-photo-type">
      <h2>Cat or Dog?</h2>
      <label>
        <input
          type="radio"
          checked={photoType === 'cat'}
          name="photoType"
          onSelect={setPhotoType('cat')}
        />
        Cat
      </label>
      <label>
        <input
          type="radio"
          checked={photoType === 'dog'}
          name="photoType"
          onSelect={setPhotoType('dog')}
        />
        Dog
      </label>
    </div>
  );
};

export default TogglePhotoType;
