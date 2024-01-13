const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  subject: String,
  role: String
});

userSchema.statics.login = async function(username, password) {
  try {
    if (!username || !password) {
      throw Error('All fields must be filled');
    }


    const user = await this.findOne({ 'username': username });

    if (!user) {
      throw Error('Incorrect username or password');
    }

    if (password === user.password) {
      var data = {
        _id:user.id,
        username: user.username,
        role: user.role
      }
      return data;
    } else {
      throw Error('Incorrect username or password');
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

userSchema.statics.getAllInsturctor = async function() {
  try {
    // Find all users with the role 'instructor'
    const instructors = await this.find({ role: 'instructor' });
    
    return instructors
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = mongoose.model('User', userSchema);
