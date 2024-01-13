const Lecture = require('../models/Lecture')

const instructorUser = async (req, res) => {
    try {
        const username = req.params.username;
        const lectures = await Lecture.getAllLecture(username);
        res.status(200).json({ data: lectures })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}



module.exports = {
    instructorUser
};