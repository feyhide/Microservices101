import React, { useState } from "react";
import axios from "axios";

const CreateComment = ({ id, refetchComments }) => {
  const [comment, setComment] = useState("");

  const handleCreateComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_GATEWAY_SERVICE + `comment/${id}/create`,
        {
          comment,
        }
      );
      console.log(data);
      if (data.success) {
        setComment("");
        refetchComments();
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <form
      onSubmit={handleCreateComment}
      className="w-full h-auto flex justify-between gap-2"
    >
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment..."
        className="border p-1 rounded-md text-sm w-full"
      />
      <button className="w-fit bg-black cursor-pointer text-white rounded-lg px-3 py-1 text-sm">
        Add
      </button>
    </form>
  );
};

export default CreateComment;
