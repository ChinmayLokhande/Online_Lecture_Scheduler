const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
});

lectureSchema.statics.getAllLecture = async function (username) {
  try {
    // Find all users with the role 'instructor'
    const lectures = await this.find({ instructor: username });

    return lectures
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
