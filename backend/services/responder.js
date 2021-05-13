const courseModel = require('../models/Courses');
const userModel = require('../models/Users');
const lister = require('./lister');

// interface
manageResults = (results) => {      // TODO: test this whole thing
  try{
    manageResults_(results)
  }
  catch (err){
    console.log("Responder error:")
    console.error(err)
  }
}

manageResults_ = (results) => {
  let course_id = results[0].courseId
  let course_name = lister.getCourseName(course_id)
  
  // check each section in the result
  let secs_dict = {}
  for(let i = 0; i < results.length; i++){
    let section = results[i]

    // find section id
    let sec_id = section.id

    // find enrollment status
    let status = null // TODO 

    // find lec/dis number
    let lec_num = null
    let dis_num = null
    for(let j = 0; j < section.sections.length; j++){
      let secprop = section.sections[j]

      // this has lecture
      if(secprop.type == "LEC"){
        lec_num = secprop.sectionNumber
      }
      // this has discussion
      else if(secprop.type == "DIS"){
        dis_num = secprop.sectionNumber
      }
    }

    // pack for later use
    secs_dict[sec_id] = {
      status: status,
      lec_num: lec_num,
      dis_num: dis_num
    }
  }

  // check each section in the database
  let course_data = courseModel.getCourse(course_id)
  for(let i = 0; i < course_data.sections.length; i++){
    let section_data = course_data.sections[i]

    // get section id
    let sec_id = section_data.section_id

    // locate new data of this section
    let section = secs_dict[sec_id]
    // TODO: handle missing new data of this section

    // update status
    section_data.prev_status = section_data.status 
    section_data.status = section.status

    // should notify?
    if((section_data.prev_status == "closed" && section_data.status == "waitlist") ||
       (section_data.prev_status == "closed" && section_data.status == "open") ||
       (section_data.prev_status == "waitlist" && section_data.status == "open")){

      // find each person
      for(let j = 0; j < section_data.subscribers.length; j++){
        let subscriber = section_data.subscribers[j]

        // get user details
        let email = subscriber.email
        let last_sent = subscriber.last_sent
        let user = userModel.findEmail(email)
        let delay = user.delay

        if(null){     // TODO: check if last_sent and delay is proper
          subscriber.last_sent = null     // TODO: set last_sent to now
          // TODO: mail this person by emitting event
          // course_name, section.lec_num, section.dis_num, section_data.prev_status, section_data.status, email
        }
      }
    }
  }
  // update database
  courseModel.updateCourse(course_data)
}

module.exports = manageResults