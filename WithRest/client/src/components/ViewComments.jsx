import React from "react";

const ViewComments = ({ comments }) => {
  return (
    <div className="mt-2 border border-gray-300 rounded p-2 w-full max-w-full">
      <div className="h-40 overflow-y-auto flex flex-col gap-2">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-slate-200 text-sm p-2 rounded shadow-sm"
            >
              {c.comment}
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 italic">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewComments;
