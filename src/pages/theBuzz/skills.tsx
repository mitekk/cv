import { SectionLayout } from "../../layout/section.layout";

export const Skills: React.FC = () => {
  return (
    <SectionLayout>
      {" "}
      <div
        style={{ color: "#333332" }}
        className="flex flex-col items-center justify-center h-full"
      >
        <span>Clearly show your technical skills.</span>

        <span>Grouped into logical categories:</span>
        <ul className="list-disc list-inside">
          <li>Frontend: React, Angular, Vue</li>
          <li>Backend: Node.js</li>
          <li>
            Cloud & DevOps: AWS, Docker, CI/CD, IaC (Terraform/CloudFormation)
          </li>
          <li>Other significant tools or languages.</li>
        </ul>
        <ul className="mt-6 list-disc list-inside">
          <li>Section: Frontend (React, Angular, Vue)</li>
          <li>Section: Backend (Node.js, REST, microservices)</li>
          <li>Section: Cloud & DevOps (AWS, Terraform, Docker, CI/CD)</li>
        </ul>
      </div>
    </SectionLayout>
  );
};
