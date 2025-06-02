export const Skills: React.FC = () => {
  return (
    <div
      style={{ color: "#333332" }}
      className="flex flex-col items-center justify-center h-full"
    >
      <h1 className="text-4xl font-bold mb-8">Skills</h1>
      <p className="text-lg text-center max-w-2xl">
        I have a diverse skill set that includes web development, data analysis,
        and project management. My expertise lies in creating efficient and
        scalable solutions using modern technologies.
      </p>
      <ul className="mt-6 list-disc list-inside">
        <li>Web Development (React, Node.js)</li>
        <li>Data Analysis (Python, SQL)</li>
        <li>Project Management (Agile, Scrum)</li>
      </ul>
    </div>
  );
};
