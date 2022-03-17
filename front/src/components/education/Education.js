import React, { useState } from "react";

import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

const Education = ({ education, setEducationLists, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          setEducationLists={setEducationLists}
          currentEducation={education}
        />
      ) : (
        <EducationCard
          setIsEditing={setIsEditing}
          setEducationLists={setEducationLists}
          education={education}
        />
      )}
    </>
  );
};

export default Education;
