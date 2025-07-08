import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateSnippet from "./components/CreateSnippet";
import ViewSnippet from "./components/ViewSnippet";

const App = () => {
  const [snippets, setSnippets] = useState({});

  const handleGetSnippets = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SNIPPET_SERVICE}/get`
      );
      console.log(data);
      if (data.success) {
        setSnippets(data.data);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    handleGetSnippets();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <CreateSnippet refetchSnippets={handleGetSnippets} />
      <ViewSnippet snippets={snippets} />
    </div>
  );
};

export default App;
