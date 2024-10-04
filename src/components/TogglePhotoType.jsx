const TogglePhotoType = () => {
  return (
    <div className="toggle-photo-type">
      <h2>Cat or Dog?</h2>
      <label>
        <input
          type="radio"
          value="cat"
          name="photoType"
        />
        Cat
      </label>
      <label>
        <input
          type="radio"
          value="dog"
          name="photoType"
        />
        Dog
      </label>
    </div>
  );
}

export default TogglePhotoType;
