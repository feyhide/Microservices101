/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import ViewComments from "./ViewComments";

const CommentManager = ({ snippetId }) => {
  const [comments, setComments] = useState({});

  const handleGetComments = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_COMMENT_SERVICE + `/${snippetId}/get`
      );
      console.log(data);
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, []);
  return (
    <>
      <CreateComment id={snippetId} refetchComments={handleGetComments} />
      <ViewComments comments={comments} />
    </>
  );
};

export default CommentManager;
