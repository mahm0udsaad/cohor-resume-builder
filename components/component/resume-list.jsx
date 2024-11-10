import ResumeCard from "./render-template";
import EmptyResumeCard from "@/components/cards/no-resume";
const ResumeList = ({ lng, user, resumes }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {resumes?.length > 0 ? (
        resumes.map((resume) => (
          <ResumeCard
            list
            key={resume.id}
            resume={resume}
            user={user}
            lng={lng}
          />
        ))
      ) : (
        <EmptyResumeCard lng={lng} />
      )}
    </div>
  );
};

export default ResumeList;
