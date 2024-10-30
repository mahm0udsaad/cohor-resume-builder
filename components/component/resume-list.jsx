import ResumeCard from "./render-template";

const ResumeList = ({ lng, user, resumes }) => {
  return (
    <div className="grid lg:grid-cols-2  gap-4 mt-4">
      {resumes &&
        resumes.map((resume) => (
          <ResumeCard
            list
            key={resume.id}
            resume={resume}
            user={user}
            lng={lng}
          />
        ))}
    </div>
  );
};

export default ResumeList;
