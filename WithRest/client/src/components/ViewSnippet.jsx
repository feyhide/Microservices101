import React from "react";

import CreateComment from "./CreateComment";
import CommentManager from "./CommentManager";

const ViewSnippet = ({ snippets }) => {
  return (
    <div className="w-full flex flex-wrap gap-4 p-4 bg-slate-100">
      {Object.values(snippets).length === 0 ? (
        <p>No snippets found.</p>
      ) : (
        Object.values(snippets).map((snippet) => (
          <div
            key={snippet.id}
            className="w-fit p-5 flex flex-col gap-2 bg-white shadow-md rounded border border-slate-300"
          >
            <h3 className="text-lg font-semibold">{snippet.title}</h3>
            <pre className="bg-slate-900 text-white p-2 rounded overflow-x-auto">
              <code>{snippet.code}</code>
            </pre>
            <CommentManager snippetId={snippet.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default ViewSnippet;
