import Navigation from "../components/navigation";
import Cards from "../components/cards";
import Footer from "../components/footer";
import { useState } from "react";

const Edit = () => {
  let [user, setUser] = useState({subscribed: []});

  const addCard = (toAdd) => {
    for (var course of user.subscribed) if (course.course_id === toAdd.course_id) {
      alert("The selected course is already added.");
      return ;
    }
    toAdd.sections = [];
    let temp = Object.assign({}, user);
    temp.subscribed.push(toAdd);
    setUser(temp);
  }

  const handleUpdate = (delay) => {
    let temp = Object.assign({}, user);
    temp.delay = parseInt(delay);
    setUser(temp);
    console.log("FINAL", temp);
  }

  const updateCourse = (course) => {
    for (var i = 0; i < user.subscribed.length; i++) if (user.subscribed[i].course_id === course.course_id) {
      let temp = Object.assign({}, user);
      temp.subscribed[i] = course;
      console.log(temp);
      setUser(temp);
    }
  }
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />
      <div className="my-[2vh] mx-[4vw] flex-grow">
        <p className="text-[4vmin] text-white bg-red-700 font-semibold mb-[3vh] w-fit px-[4vmin] py-[1.5vmin] rounded-3xl">
          Your watching list
        </p>
        <Cards initialCourses={user.subscribed} addCard={addCard} updateCourse={updateCourse}/>        
      </div>
      <Footer handleUpdate={handleUpdate}/> 
    </div>
  );
};

export default Edit;
