const coursesRepository = require("../repositories/courses");
const usersRepository = require("../repositories/users");

const defaultMailer = require("../subscribers/mailer");     // TODO: find a better pattern than this half dependency-injection

// interface
const run = async (results, mailer=null) => {
  if(mailer == null){
    mailer = defaultMailer;
  }
  await processCourses(results, mailer);
};

const processCourses = async (results, mailer) => {
  results.map(course => {
    try{
      return processCourse(course, mailer);
    } catch (e){
      console.error(e);
    }
  });
}

const processCourse = async (results, mailer) => {
  if (results.length == 0) return;

  const course_id = results[0].courseId;

  // check each section in the result
  let secs_dict = {};
  for (let i = 0; i < results.length; i++) {
    const section = results[i];

    // find section id
    const sec_id = section.id;

    // find enrollment status
    const status = section.packageEnrollmentStatus.status;

    // find lec/dis number
    let lec_num = null;
    let dis_num = null;
    let lab_num = null;
    for (let j = 0; j < section.sections.length; j++) {
      const secprop = section.sections[j];

      // this has lecture
      if (secprop.type == "LEC") {
        lec_num = secprop.sectionNumber;
      }
      // this has discussion
      else if (secprop.type == "DIS") {
        dis_num = secprop.sectionNumber;
      }
      // this has lab
      else if (secprop.type == "LAB") {
        lab_num = secprop.sectionNumber;
      }
    }

    // pack for later use
    secs_dict[sec_id] = {
      status: status,
      lec_num: lec_num,
      dis_num: dis_num,
      lab_num: lab_num,
    };
  }

  // check each section in the database
  const course_data = (await coursesRepository.find(course_id))[0]; // it returns list, even if it is singular in practice
  const course_name = course_data.course_name;

  for (let i = 0; i < course_data.sections.length; i++) {
    try{
      let section_data = course_data.sections[i];

      // get section id
      const sec_id = section_data.section_id;

      // locate new data of this section
      const section = secs_dict[sec_id];
      if (typeof section === "undefined") {
        console.log("Section data not received from updater, skipping");
        continue;
      }

      // update status
      section_data.prev_status = section_data.status;
      section_data.status = section.status;

      // should notify?
      if (
        (section_data.prev_status == "CLOSED" &&
          section_data.status == "WAITLISTED") ||
        (section_data.prev_status == "CLOSED" && section_data.status == "OPEN") ||
        (section_data.prev_status == "WAITLISTED" &&
          section_data.status == "OPEN")
      ) {
        // find each person
        for (let j = 0; j < section_data.subscribers.length; j++) {
          let subscriber = section_data.subscribers[j];

          // get user details
          const email = subscriber.email;
          const last_sent = subscriber.last_sent;
          const users = await usersRepository.findEmail(email);

          if (users.length == 0) continue;

          const user = users[0]; // user
          const delay = user.delay; // minutes
          const user_id = user.user_id;

          // check if last_sent and delay is proper
          const current_time = Date.now();
          if ((current_time - last_sent) / (1000 * 60) >= delay) {
            subscriber.last_sent = current_time; // set last_sent to now

            // mail this person
            const mailParams = {
              user_id: user_id,
              user_email: email,
              course_name: course_name,
              lecture_name: section.lec_num,
              discussion_name: section.dis_num,
              section_id: sec_id,
              lab_name: section.lab_num,
              prev_status: section_data.prev_status,
              new_status: section_data.status,
            };
            mailer.notify(mailParams); // no need to await for anything
          }
        }
      }
    } catch (e){
      console.error(e);
    }
  }
  // update database
  coursesRepository.update(course_data);
};

module.exports = run;
