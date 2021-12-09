const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    required: true,
  },
  sections: [
    {
      section_id: {
        type: String,
        required: true,
      },
      subscribers: [
        {
          email: {
            type: String,
            required: true,
          },
          last_sent: {
            type: Date,
            default: 0,
          },
        },
      ],
      status: {
        type: String,
        default: "unknown",
      },
      prev_status: {
        type: String,
        default: "unknown",
      },
    },
  ],
});

// status can be 'OPEN', 'WAITLISTED', 'CLOSED', or 'unknown'

module.exports = mongoose.model("Courses", CourseSchema);

const Courses = mongoose.model("Courses");
const courseModel = {};

courseModel.getCourse = (course_id) => {
  return Courses.find({ course_id: course_id });
};

courseModel.addCourse = async (adding_course) => {
  const course = new Courses(adding_course);
  const savedCourse = await course.save();
  return savedCourse;
};

courseModel.updateCourse = async (updated_course) => {
  const updatedUser = await User.findOneAndUpdate(
    { user_id: updated_user.user_id },
    updated_user,
    { new: true }
  );
  return updatedCourse;
};

courseModel.removeCourse = async (removing_course) => {
  await Courses.deleteOne({ _id: removing_course._id });
};

courseModel.getAll = () => {
  return Courses.find({}); // async
};

module.exports = courseModel;
