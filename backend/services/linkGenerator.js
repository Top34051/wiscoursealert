validateUUID = (user_id) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(user_id);
}

generateLink = (user_id) => {
  if(!validateUUID(user_id)){
    throw new Error("User ID " + user_id + " is not a valid UUID.");
  }
  let editUrl = process.env.URL_MAIN + "/edit?user_id=" + user_id;
  return editUrl;
};

module.exports = generateLink;
 