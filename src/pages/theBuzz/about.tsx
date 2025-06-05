import { SectionLayout } from "../../layout/section.layout";

export const About: React.FC = () => {
  return (
    <SectionLayout>
      <div style={{ color: "#333332" }} className="p-10">
        <div className="mb-4 flex flex-col">
          <span>
            Short professional intro (already shown in your screenshot).
          </span>
          <span>
            Highlight the core of your skillset: Fullstack developer, focused on
            React, Node, AWS, etc.
          </span>
          <span>Provide your unique value clearly in a short paragraph.</span>
          <span>
            <span>Content sequence:</span>
            <ul>
              <li>Intro text (short, concise)</li>
              <li>Primary Skills/Highlights (short list or bullet points)</li>
            </ul>
          </span>
        </div>
      </div>
    </SectionLayout>
  );
};
