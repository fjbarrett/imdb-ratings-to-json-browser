import { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!file) return;
    // TODO: Process the file here
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Upload a CSV file:
        <input type="file" accept=".csv" onChange={onFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Upload;
