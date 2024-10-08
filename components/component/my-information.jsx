import ExperienceForm from "../forms/my-experince-card";
import MyPersonalInfoForm from "../forms/my-personal-info";
import SkillCard from "../forms/my-skill-form";

export default function MyInformation({ lng, initialUserInfo, user }) {
  return (
    <div className="space-y-4">
      <MyPersonalInfoForm user={user} lng={lng} />
      <ExperienceForm
        user={user}
        initialExperiences={initialUserInfo.experiences}
        lng={lng}
      />
      <SkillCard user={user} lng={lng} />
    </div>
  );
}
