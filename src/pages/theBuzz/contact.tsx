export const Contact: React.FC = () => {
  return (
    <div style={{ color: "#333332" }} className="p-10">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <p className="mb-4">
        If you have any questions or would like to get in touch, please reach
        out via email at{" "}
        <a
          href="mailto:example@example.com"
          className="text-blue-500 hover:underline"
        >
          example@example.com
        </a>
      </p>
    </div>
  );
};
