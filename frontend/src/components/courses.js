const Courses = ({ handleID, courses }) => {
  return (
    <div className="w-full pt-7 max-h-[100%] grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      {courses.map((course) => {
        return (
          <button
            key={course.course_id}
            onClick={() => handleID(course)}
            className="border-4 h-[200px] text-left border-gray-300 rounded-3xl transition ease-in-out duration-150 hover:border-red-400 focus:border-red-500"
          >
            <p className="text-[2rem] lg:text-4xl font-bold text-gray-700 mb-7 mx-[7%]">
              {course.course_name}
            </p>
            <p className="text-lg truncate lg:text-xl ml-[7%] mr-[20%]">
              {course.course_title}
            </p>
          </button>
        );
        
      })}
    </div>
  );
};

export default Courses;
