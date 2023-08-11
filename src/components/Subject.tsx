import React from "react";

type SubjectProps = {
  title?: string;
};

function Subject({ title }: SubjectProps) {
  return (
    <>
      <article className="title-border">
        <div className="title">{title}</div>
      </article>
    </>
  );
}

export default Subject;
