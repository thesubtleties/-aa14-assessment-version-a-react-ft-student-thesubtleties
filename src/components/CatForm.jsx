const COLORS = [
  "yellow",
  "orange",
  "white",
  "black",
  "brown",
  "gray"
];

function CatForm() {
  return (
    <form
      className="cat-form"
    >
      <h2>Create a Cat</h2>
      <label>
        Name
        <input
          type="text"
          name="name"
        />
      </label>
      <label>
        Select a Color
        <select
        >
          {COLORS.map(color => (
            <option
              key={color}
            >
              {color}
            </option>
          ))}
        </select>
      </label>
      <label>
        Age
        <input
          type="number"
          name="age"
        />
      </label>
      <button
        type="submit"
      >
        Create Cat
      </button>
    </form>
  );
}

export default CatForm;
