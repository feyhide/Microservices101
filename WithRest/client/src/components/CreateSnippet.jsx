import React from "react";

const CreateSnippet = () => {
  return (
    <div className="bg-slate-200 m-2 rounded-xl w-full h-fit py-10 flex">
      <form action="" className="w-full h-auto flex flex-col px-10 gap-2">
        <input
          type="text"
          placeholder="Title"
          className="border rounded px-2 py-1 w-fit"
        />
        <textarea
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
