import { getUserResumes } from "@/actions/resumes";
import { auth } from "@/lib/auth";
import ResumeCard from "./render-template";

const ResumeList = async ({ lng }) => {
  const { user } = await auth();
  const resumes = await getUserResumes(user.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
