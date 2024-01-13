const User = require('../models/User');
const Lecture = require('../models/Lecture')

const adminUser = async (req, res) => {
    try {
        const instructor = await User.getAllInsturctor();
        res.status(200).json({ data: instructor })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const addLecture = async (req, res) => {
    try {

        const lectureData = req.body.data;
        console.log(lectureData)
        const newLecture = new Lecture(lectureData);
        newLecture.save()
            .then((result) => {
                console.log('Lecture inserted successfully:', result);
                res.status(200).json({ message: "Data Inserted successfully" })
            })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    adminUser,
    addLecture
};