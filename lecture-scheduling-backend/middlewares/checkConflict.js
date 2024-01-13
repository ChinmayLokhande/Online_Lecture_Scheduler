// checkConflict.js
const Lecture = require('../models/Lecture');

// Helper function to convert time string to minutes
const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const checkConflict = async (req, res, next) => {
  try {
    const { date, startTime, endTime, instructor } = req.body.data;

    // Convert string times to minutes for comparison
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    // Check if the instructor has a lecture at the same time and date
    const existingLecture = await Lecture.findOne({
      date,
      instructor,
      $or: [
        {
          $and: [
            { endTime: { $gt: startTime } },
            { startTime: { $lt: endTime } },
          ],
        },
        {
          $and: [
            { endTime: { $gt: startTime } },
            { startTime: { $lt: endTime } },
          ],
        },
      ],
    });

    console.log("StartTime:", startTime);
    console.log("EndTime:", endTime);
    
    if (existingLecture) {
      return res.status(409).json({ error: 'Instructor has a conflicting lecture at the same time and date' });
    }

    // No conflict, proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = checkConflict;
