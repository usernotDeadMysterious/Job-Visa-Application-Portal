import { useDocuments } from "./hooks/useDocument";
import { useEducation } from "./hooks/useEducation";
import { useProfile } from "./hooks/useProfile";

import PersonalOverviewSection from "./PersonalOverviewSection";
import EducationOverviewSection from "./EducationOverviewSection";
import DocumentsOverviewSection from "./DocumentsOverviewSection";
const Overview = () => {
  const { profile, loading: profileLoading } = useProfile();
  const { education, loading: educationLoading } = useEducation();
  const { documents, loading: documentsLoading } = useDocuments();

  if (profileLoading || educationLoading || documentsLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-indigo-500 mb-2">Overview</h3>

      <div className="rounded-xl p-4 bg-linear-to-br from-indigo-500/30 via-purple-500/10 to-pink-500/30">
        <PersonalOverviewSection profile={profile} />
        <hr />
        <br />

        <EducationOverviewSection education={education} />
        <hr />
        <br />

        <DocumentsOverviewSection documents={documents} />
        <hr />
        <br />
      </div>
    </>
  );
};

export default Overview;
