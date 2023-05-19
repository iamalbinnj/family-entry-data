import User from '../model/model.js'
import { calculateAge, monthNumber } from '../../helpers/util.js';


export const addData = async (req, res) => { //router.get("/", addData)
    try {
        res.render('index')
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const createData = async (req, res) => { //router.post("/", createData)
    try {
        const { unit, houseN, phoneN, memberDetails } = req.body;
        const newMemberDetails = memberDetails.map(({ birthdate, birthmonth, birthyear, baptismmonth, marriagedate, marriagemonth, marriageyear, ...member }) => {
            birthmonth = monthNumber(birthmonth);
            baptismmonth = monthNumber(baptismmonth);
            marriagemonth = monthNumber(marriagemonth);
            const age = calculateAge(new Date(birthyear, birthmonth, birthdate))
            const anniversary = calculateAge(new Date(marriageyear, marriagemonth, marriagedate))
            return { ...member, birthdate, birthmonth, birthyear, baptismmonth, marriagedate, marriagemonth, marriageyear, age, anniversary };
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

export const getAllData = async (req, res) => { //router.get("/list", getAllData)
    try {
        let startMonth = req.query.sbm
        startMonth = monthNumber(startMonth)
        if (Object.keys(req.query).length !== 0) {
            const selectedList = await User.aggregate([
                { $match: { memberDetails: { $elemMatch: { birthmonth: startMonth } } } },
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
                                cond: { $eq: ['$$member.birthmonth', startMonth] }
                            }
                        }
                    }
                }
            ]);
            let filteredList = []
            selectedList.forEach((listItem) => {
                const matchingMembers = listItem.memberDetails.filter((member) => {
                    return member.birthmonth === startMonth
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
            res.render('admin/viewList', { users: filteredList })
        } else {
            const userList = await User.find()
            // res.status(200).json(userList)
            res.render('admin/viewList', { users: userList })
        }

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getMember = async (req, res) => { //router.get("/view/:id", getMember)
    try {
        const userList = await User.findById(req.params.id)
        // res.status(200).json(userList)
        res.render('admin/viewData', { user: userList })
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getEditMember = async (req, res) => { //router.get("/edit/:id/:memberid", getEditMember)
    try {
        const editList = await User.findOne(
            { _id: req.params.id },
            { memberDetails: { $elemMatch: { _id: req.params.memberid } } }
        );
        if (!editList) {
            return res.status(404).json({ message: "Member not found" });
        }
        const member = editList.memberDetails.find(
            (member) => member._id.toString() === req.params.memberid
        );
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        // console.log(editList);
        // res.status(200).json(member);
        res.render('admin/editData', {id:req.params.id,member:member})
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const updateData = async (req, res) => {  //router.post("/update/:id", updateData)
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            {
                new: true
            })
        // res.status(200).json(updateUser);
        res.send(`<script>alert("Form submitted successfully!"); window.location.href="/view/${req.params.id}";</script>`)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}
export const updateMember = async (req, res) => {  //router.post("/updatemember/:id/:memberid", updateMember)
    try {
        const updatedMember = await User.findOneAndUpdate(
            { _id: req.params.id, "memberDetails._id": req.params.memberid },
            { $set: { "memberDetails.$.name": req.body.name } },
            { new: true }
        );
        console.log(updatedMember);
        // res.status(200).json(updatedMember);
        res.status(200).send(`<script>alert("Form submitted successfully!"); window.location.href="/view/${req.params.id}";</script>`);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred",
        });
    }
};


export const deleteData = async (req, res) => {  //router.delete("/:id", deleteData)
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted")
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const deleteMember = async (req, res) => {  //router.delete("/:id/:memberid", deleteMember)
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