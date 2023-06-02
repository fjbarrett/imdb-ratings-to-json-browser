import { useState } from "react";
import Papa from "papaparse";

const Home = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: function (results) {
        const jsonArray = results.data.map((row) => ({
          title: row.Title,
          rating: row["Your Rating"],
        }));

        setJsonData(jsonArray);
      },
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopySuccess(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 py-2">
      <div className="bg-gray-800 text-white rounded p-5 shadow-md">
        <h1 className="text-2xl font-bold mb-5">IMDB Ratings Converter</h1>

        <form onSubmit={onFormSubmit} className="space-y-3">
          <label className="block text-sm font-medium">
            Upload a CSV file:
            <input
              type="file"
              accept=".csv"
              onChange={onFileChange}
              className="mt-1 block w-full"
            />
          </label>
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>

        {jsonData && (
          <div className="mt-5 space-y-3 relative">
            <button
              onClick={copyToClipboard}
              className="px-3 py-2 bg-green-500 text-white rounded absolute top-2 right-2"
            >
              {copySuccess ? "Copied!" : "Copy"}
            </button>
            <pre className="border rounded p-3 bg-gray-800 font-mono text-sm">
              <code>{JSON.stringify(jsonData, null, 2)}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
