import { useState } from 'react'

export function useResumeData() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      summary: '',
    },
    experiences: [
      { jobTitle: '', company: '', startDate: '', endDate: '', responsibilities: '' }
    ],
    educations: [
      { degree: '', institution: '', graduationDate: '' }
    ],
    skills: [
      { name: '', level: 1 }
    ],
    languages: [
      { name: '', proficiency: '' }
    ],
    courses: [
      { name: '', institution: '', completionDate: '' }
    ],
    customSections: [
      { title: '', content: '' }
    ]
  })

  const updateResumeData = (field, value) => {
    setResumeData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  return { resumeData, updateResumeData }
}