type SubjectProps = {
  title?: string;
};

function Subject({ title }: SubjectProps) {
  return (
    <>
      <h1 className="heading-title">{title}</h1>
    </>
  );
}

export default Subject;
