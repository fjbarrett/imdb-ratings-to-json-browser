// Using React Hooks to manage state
import { useState } from "react";
// Import papaparse to parse csv file
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import Papa from "papaparse";

// Home page component
const Home = () => {
  // State to store uploaded file
  const [file, setFile] = useState(null);
  console.log(session);
  // State to store converted json data
  const [jsonData, setJsonData] = useState(null);
  // State to store copy success message
  const [copySuccess, setCopySuccess] = useState(false);
  // State to store error message
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to handle file upload event
  const onFileChange = (event) => {
    // Reset error message
    setErrorMessage(null);
    // Update the state on file change
    setFile(event.target.files[0]);
  };

  // Function to handle form submission event
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!file) return;

    // Parse the CSV file using PapaParse library
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        // Check if the CSV file contains the required columns
        if (
          !results.meta.fields.includes("Title") ||
          !results.meta.fields.includes("Your Rating")
        ) {
          // Set error message if the required columns are missing
          setErrorMessage(
            "The uploaded CSV file is not from IMDb or is in an improper format. Please make sure the file contains 'Title' and 'Your Rating' columns."
          );
          return;
        }

        // Convert the parsed data to JSON format
        const jsonArray = results.data.map((row) => ({
          title: row.Title,
          rating: row["Your Rating"],
        }));

        // Update the state with the converted JSON data
        setJsonData(jsonArray);
      },
    });
  };

  // Function to copy the JSON data to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopySuccess(true);
  };

  // Render the Home component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 py-2">
      <div
        className="bg-gray-800 text-white rounded p-5"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="text-2xl font-bold mb-5">IMDb Ratings Converter</h1>

        <form onSubmit={onFormSubmit} className="space-y-3">
          <label className="block text-sm font-medium">
            {/* Input field to upload CSV file */}
            <input type="file" onChange={onFileChange} />
          </label>

          {/* Button to submit the form */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Convert
          </button>
        </form>

        {/* Display error message if there is an error */}
        {errorMessage && (
          <div className="mt-5">
            <h2 className="text-lg font-bold mb-3">Error:</h2>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Display the converted JSON data */}
        {jsonData && (
          <div className="mt-5 relative">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-3 mr-3"
              onClick={copyToClipboard}
            >
              {copySuccess ? "Copied!" : "Copy to Clipboard"}
            </button>
            <h2 className="text-lg font-bold mb-3">Converted Data:</h2>
            <code className="bg-gray-900 text-white rounded p-5 block">
              {JSON.stringify(jsonData, null, 2)}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
