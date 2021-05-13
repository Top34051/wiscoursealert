const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 15
  },
  subscribed: [{
    course_id: {
      type: Number,
      required: true
    },
    sections: [{
      section_id: {
        type: Number,
        required: true
      },
      timestamp: Date
    }]
  }]
});

module.exports = mongoose.model('Users', UserSchema);

const User = mongoose.model('Users');
const userModel = {}

userModel.findUserID = (user_id) => {
  return User.find({user_id: user_id});
}

userModel.findEmail = (email) => {
  return User.find({email: email});
}

userModel.addUser = async ({ user_id, email }) => {
  const user = new User({
    user_id: user_id,
    email: email
  });
  const savedUser = await user.save();
  return savedUser;
}

userModel.updateUser = async (updated_user) => {
  const updatedUser = await User.findByIdAndUpdate(updated_user._id, updated_user, {new: true});
  return updatedUser;
}

module.exports = userModel;