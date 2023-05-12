import User from '../model/model.js'
import { calculateAge, monthNumber } from '../../helpers/util.js';


export const addData = async (req, res) => {
    try {
        res.render('index')
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const createData = async (req, res) => {
    try {
        const { unit, houseN, phoneN, memberDetails } = req.body;
        const newMemberDetails = memberDetails.map(({ month, ...member }) => {
            month = monthNumber(month);
            return { ...member, month };
        });

        const data = new User({
            unit,
            houseN,
            phoneN,
            memberDetails: newMemberDetails
        });
        const savedUser = await data.save()
        res.status(200).send('<script>alert("Form submitted successfully!"); window.location.href="/";</script>');
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getAllData = async (req, res) => {
    try {
        let startMonth = req.query.startmonth
        startMonth = monthNumber(startMonth)
        if (Object.keys(req.query).length !== 0) {
            const selectedList = await User.aggregate([
                { $match: { memberDetails: { $elemMatch: { month: startMonth } } } },
                {
                    $project: {
                        _id: 1,
                        unit: 1,
                        houseN: 1,
                        phoneN: 1,
                        memberDetails: {
                            $filter: {
                                input: '$memberDetails',
                                as: 'member',
                                cond: { $eq: ['$$member.month', startMonth] }
                            }
                        }
                    }
                }
            ]);
            let filteredList = []
            selectedList.forEach((listItem) => {
                const matchingMembers = listItem.memberDetails.filter((member) => {
                    return member.month === startMonth
                })
                matchingMembers.forEach((member) => {
                    const filteredItem = {
                        _id: listItem._id,
                        unit: listItem.unit,
                        houseN: listItem.houseN,
                        phoneN: listItem.phoneN,
                        memberDetails: [member]
                    }
                    filteredList.push(filteredItem)
                })
            })
            // res.status(200).json(filteredList)
            res.render('admin/userList', { users: filteredList })
        } else {
            const userList = await User.find()
            // res.status(200).json(userList)
            res.render('admin/userList', { users: userList })
        }

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getDataA = async (req, res) => {
    try {
        const userList = await User.findById(req.params.id)
        // res.status(200).json(userList)
        res.render('admin/editList', { user: userList })
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
        // res.status(200).json(updateUser);
        res.send(`<script>alert("Form submitted successfully!"); window.location.href="/update/${req.params.id}";</script>`)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const updataMember = async (req, res) => {
    try {
        const updateMember = await User.findOneAndUpdate(
            { _id: req.params.id, "memberDetails._id": req.params.memberid },
            { $set: { "memberDetails.$.name": req.body.name, "memberDetails.$.relation": req.body.relation, "memberDetails.$.age": req.body.age, "memberDetails.$.bDate": req.body.bDate, "memberDetails.$.dob": req.body.dob, "memberDetails.$.abroad": req.body.abroad, "memberDetails.$.placeName": req.body.placeName, "memberDetails.$.married": req.body.married, "memberDetails.$.dom": req.body.dom, "memberDetails.$.partnerName": req.body.partnerName } },
            { new: true }
        );
        // res.status(200).json(updateMember);
        res.send(`<script>alert("Form submitted successfully!"); window.location.href="/update/${req.params.id}";</script>`)
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
        const deleteMember = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { memberDetails: { _id: req.params.memberid } } },
            { new: true }
        );
        res.status(200).json({ message: "Member deleted" });
        // res.redirect(`/update/${req.params.id}`);
    } catch (err) {
        res.status(500).json({ message: err.message || "Some error occurred" });
    }
}