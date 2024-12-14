import React from "react";
import ProfileSection from "../sections/ProfileSection.jsx";
import Organizations from "../sections/Organizations.jsx";
import ContributionSection from "../sections/ContributionSection.jsx";
import Project from "../sections/Project.jsx";
import ActivityTimeline from "../sections/Activity_Timeline.jsx";

const GitHubProfilePage = ({ left, right }) => {
  return (
    <div>
      {/* Left Section (Profile and Organizations) */}
      {left && (
        <div>
          <ProfileSection />
          <Organizations />
        </div>
      )}

      {/* Right Section (Contributions, Projects, and Activity Timeline) */}
      {right && (
        <div>
          <ContributionSection />
          <div className="grid grid-cols-3 gap-4">
            <Project
              title="Project A"
              description="This is a description of Project A"
              url="#"
              stars={42}
            />
            <Project
              title="Project B"
              description="This is a description of Project B"
              url="#"
              stars={25}
            />
            <Project
              title="Project C"
              description="This is a description of Project C"
              url="#"
              stars={34}
            />
          </div>
          <ActivityTimeline />
        </div>
      )}
    </div>
  );
};

export default GitHubProfilePage;
