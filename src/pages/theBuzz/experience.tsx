import { SectionLayout } from "../../layout/section.layout";

export const Experience: React.FC = () => {
  return (
    <SectionLayout>
      <div
        style={{ color: "#333332" }}
        className="flex flex-col items-center justify-center h-full"
      >
        <p className="text-lg text-center max-w-2xl">
          Your professional working history.
        </p>
        <p className="text-lg text-center max-w-2xl">
          Clearly highlight your leadership/team leader experiences.
        </p>
        <p className="text-lg text-center max-w-2xl">
          Briefly list notable projects or achievements.
        </p>

        <ul className="mt-6 list-disc list-inside">
          <li>
            Current/Recent role: Position, Company, Duration
            <ul className="list-disc list-inside">
              <li>Key achievements</li>
              <li>Leadership roles and impact</li>
            </ul>
          </li>
          <li>
            Previous roles: (chronological order)
            <ul className="list-disc list-inside">
              <li>Short bullet points on responsibilities and impact.</li>
            </ul>
          </li>
        </ul>
      </div>
    </SectionLayout>
  );
};
