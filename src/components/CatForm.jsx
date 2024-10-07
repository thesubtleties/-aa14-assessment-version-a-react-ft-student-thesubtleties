import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const COLORS = ['yellow', 'orange', 'white', 'black', 'brown', 'gray'];

function CatForm() {
  const navigate = useNavigate();
  const [catInfo, setCatInfo] = useState({
    name: '',
    color: 'orange',
    age: 0,
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
  });

  const handleChange = (e) => {
    setCatInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(catInfo);
    navigate('/');
  };

  useEffect(() => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (catInfo.name === '') {
        newErrors.name = 'Name field is required';
      } else if (catInfo.name.length > 30) {
        newErrors.name = 'Name must be fewer than 30 characters';
      } else {
        delete newErrors.name;
      }

      if (catInfo.age < 0 || catInfo.age > 30) {
        newErrors.age = 'Age must be between 0 and 30';
      } else {
        delete newErrors.age;
      }
      return newErrors;
    });
  }, [catInfo.name, catInfo.age]);

  return (
    <form className="cat-form" onSubmit={handleSubmit}>
      <h2>Create a Cat</h2>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={catInfo.name}
          onChange={handleChange}
        />
      </label>
      {errors.name && <p>{errors.name}</p>}
      <label>
        Select a Color
        <select name="color" value={catInfo.color} onChange={handleChange}>
          {COLORS.map((color) => (
            <option key={color}>{color}</option>
          ))}
        </select>
      </label>
      <label>
        Age
        <input
          type="number"
          name="age"
          value={catInfo.age}
          onChange={handleChange}
        />
      </label>
      {errors.age && <p>{errors.age}</p>}
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Create Cat
      </button>
    </form>
  );
}

export default CatForm;
