import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationService {
  static async addEdu({ userId, school, major, position }) {
    const id = uuidv4();
    const newEducation = { userId, id, school, major, position };
    console.log("newEducation", newEducation);

    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }
  static async getEduInfo({ educationId }) {
    let findedEducation = await Education.findById({ educationId });

    if (!findedEducation) {
      const errorMessage = "해당 아이디로 학력 기록이 없습니다.";
      return { errorMessage };
    }

    return findedEducation;
  }
  static async setEducation({ educationId, toUpdate }) {
    let updatedEducation = await Education.findById({ educationId });

    if (!updatedEducation) {
      const errorMessage =
        "해당 아이디로 학력 기록이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      updatedEducation = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      updatedEducation = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      updatedEducation = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    return updatedEducation;
  }

  static async getEduUserInfo({ userId }) {
    console.log("userId:", userId);
    const EducationList = await Education.findByUserID({ userId });
    console.log("EducationList", EducationList);

    if (!EducationList) {
      const errorMessage =
        "해당 사용자 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return EducationList;
  }
  static deleteEducation = async ({ educationId }) => {
    const deleteEducation = await Education.deleteById({ educationId });

    if (!deleteEducation) {
      const errorMessage =
        "해당 id를 가진 학력이 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
    return {
      sataus: "success",
    };
  };
}

export { EducationService };
