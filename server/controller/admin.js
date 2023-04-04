import User from '../model/model.js'

export const createData = async (req, res) => {
    try {
        const data = new User({
            unit: req.body.unit,
            houseN: req.body.houseN,
            phoneN: req.body.phoneN,
            memberDetails: req.body.memberDetails
        });
        const savedUser = await data.save()
        res.send('<script>alert("Form submitted successfully!"); window.location.href="/";</script>');
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getAllData = async (req, res) => {
    // res.render('admin/userList')
    try {
        const usersList = await User.find()
        res.status(200).json(usersList)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getDataA = async (req, res) => {
    try {
        const userList = await User.findById(req.params.id)
        res.status(200).json(userList)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const updateData = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            {
                new: true
            })
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const updataMember = async (req, res) => {
    try {
        const updateMember = await User.findOneAndUpdate(
            { _id: req.params.userid, "memberDetails._id": req.params.memberid },
            { $set: { "memberDetails.$.name": req.body.name, "memberDetails.$.relation": req.body.relation, "memberDetails.$.age": req.body.age, "memberDetails.$.bDate": req.body.bDate, "memberDetails.$.dob": req.body.dob, "memberDetails.$.abroad": req.body.abroad, "memberDetails.$.placeName": req.body.placeName, "memberDetails.$.married": req.body.married, "memberDetails.$.dom": req.body.dom, "memberDetails.$.partnerName": req.body.partnerName } },
            { new: true }
        );
        res.status(200).json(updateMember);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred",
        });
    }
}

export const deleteData = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted")
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const deleteMember = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userid },
            { $pull: { memberDetails: { _id: req.params.memberid } } },
            { new: true }
        );
        res.status(200).json({ message: "Member deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message || "Some error occurred" });
    }
}