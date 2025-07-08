import React, { useState } from "react";
import axios from "axios";

const CreateSnippet = ({ refetchSnippets }) => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

  const handleCreateSnippet = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SNIPPET_SERVICE + "/create",
        {
          title,
          code,
        }
      );
      console.log(data);
      if (data.success) {
        refetchSnippets();
        setTitle("");
        setCode("");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-slate-200 m-2 rounded-xl w-full h-fit py-10 flex">
      <form
        onSubmit={handleCreateSnippet}
        className="w-full h-auto flex flex-col px-10 gap-2"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded px-2 py-1 w-fit"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write a snippet"
          className="border rounded px-2 py-1 max-w-full min-w-1/2"
        />
        <button className="w-fit bg-black cursor-pointer text-white rounded-lg px-5 py-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateSnippet;
