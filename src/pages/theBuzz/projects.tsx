export const Projects: React.FC = () => {
  return (
    <div
      style={{ color: "#333332" }}
      className="flex flex-col items-center justify-center h-full"
    >
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <p className="text-lg text-center max-w-2xl">
        I have worked on a variety of projects that showcase my skills in web
        development, data analysis, and project management. Here are some of the
        notable projects I've been involved in:
      </p>
      <ul className="mt-6 list-disc list-inside">
        <li>Portfolio Website</li>
        <li>Data Visualization Dashboard</li>
        <li>Task Management Application</li>
      </ul>
    </div>
  );
};
