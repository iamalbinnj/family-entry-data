import User from '../model/model.js'
import { calculateAge, monthNumber, monthName } from '../../helpers/util.js';

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
            const age = calculateAge(new Date(birthyear, birthmonth, birthdate)) || ""
            const anniversary = calculateAge(new Date(marriageyear, marriagemonth, marriagedate)) || ""
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
        const userList = await User.find()
        // res.status(200).json(userList)
        res.render('admin/viewList', { users: userList })
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getMember = async (req, res) => { //router.get("/view/:id", getMember)
    try {
        let userList = await User.findById(req.params.id)
        const memberDetail = userList.memberDetails;
        let newMemberDetails = memberDetail.map(({ name, relation, age, birthdate, birthmonth, birthyear, baptismdate, baptismmonth, baptismyear, abroad, placeName, married, marriagedate, marriagemonth, marriageyear, partnerName, anniversary, _id }) => {
            const updatedage = age !== null && age >= 1 && age <= 110 ? age : 0;
            const updatedanniversary = anniversary !== null && anniversary >= 1 && anniversary <= 100 ? anniversary : 0;
            const updatedBirthmonth = birthmonth !== null && birthmonth >= 1 && birthmonth <= 12 ? birthmonth : 0;
            const updatedBaptismmonth = baptismmonth !== null && baptismmonth >= 1 && baptismmonth <= 12 ? baptismmonth : 0;
            const updatedMarriagemonth = marriagemonth !== null && marriagemonth >= 1 && marriagemonth <= 12 ? marriagemonth : 0;

            const newBirthmonth = updatedBirthmonth !== 0 ? monthName(updatedBirthmonth) : '0';
            const newBaptismmonth = updatedBaptismmonth !== 0 ? monthName(updatedBaptismmonth) : '0';
            const newMarriagemonth = updatedMarriagemonth !== 0 ? monthName(updatedMarriagemonth) : '0';
            return { name, relation, age: updatedage, birthdate: birthdate, birthmonth: newBirthmonth, birthyear: birthyear, baptismdate: baptismdate, baptismmonth: newBaptismmonth, baptismyear: baptismyear, abroad: abroad, placeName: placeName, married: married, marriagedate: marriagedate, marriagemonth: newMarriagemonth, marriageyear: marriageyear, partnerName: partnerName, anniversary: updatedanniversary, _id: _id };
        });
        // console.log(newMemberDetails); // Verify the updated memberDetails
        // res.status(200).json(userList)
        res.render('admin/viewData', { user: userList, member: newMemberDetails })
        // res.status(200).json(newMemberDetails)
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
        let member = editList.memberDetails.find(
            (member) => member._id.toString() === req.params.memberid
        );
        let updatedBirthmonth=member.birthmonth
        let updatedBaptismmonth=member.baptismmonth
        let updatedMarriagemonth=member.marriagemonth
        if (member) {
            member.age = member.age !== null && member.age >= 1 && member.age <= 110 ? member.age : 0;
            member.anniversary= member.anniversary !== null && member.anniversary >= 1 && member.anniversary <= 110 ? member.anniversary : 0;
            updatedBirthmonth = updatedBirthmonth !== 0 ? monthName(updatedBirthmonth) : '0';
            updatedBaptismmonth = updatedBaptismmonth !== 0 ? monthName(updatedBaptismmonth) : '0';
            updatedMarriagemonth = updatedMarriagemonth !== 0 ? monthName(updatedMarriagemonth) : '0';
        }
        console.log(updatedBirthmonth);
        // res.status(200).json(member);
        res.render('admin/editData', { id: req.params.id, member: member, birthmonth: updatedBirthmonth, marriagemonth: updatedMarriagemonth, baptismmonth: updatedBaptismmonth })
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
        const birthmonth = monthNumber(req.body.birthmonth);
        const baptismmonth = monthNumber(req.body.baptismmonth);
        const marriagemonth = monthNumber(req.body.marriagemonth);
        const age = calculateAge(new Date(req.body.birthyear, birthmonth, req.body.birthdate))
        const anniversary = calculateAge(new Date(req.body.marriageyear, marriagemonth, req.body.marriagedate))

        const updatedMember = await User.findOneAndUpdate(
            { _id: req.params.id, "memberDetails._id": req.params.memberid },
            {
                $set: {
                    "memberDetails.$.name": req.body.name,
                    "memberDetails.$.relation": req.body.relation,
                    "memberDetails.$.birthdate": req.body.birthdate,
                    "memberDetails.$.birthmonth": birthmonth,
                    "memberDetails.$.birthyear": req.body.birthyear,
                    "memberDetails.$.age": age || "",
                    "memberDetails.$.baptismdate": req.body.baptismdate,
                    "memberDetails.$.baptismmonth": baptismmonth,
                    "memberDetails.$.baptismyear": req.body.baptismyear,
                    "memberDetails.$.abroad": req.body.abroad,
                    "memberDetails.$.placeName": req.body.placeName,
                    "memberDetails.$.married": req.body.married,
                    "memberDetails.$.marriagedate": req.body.marriagedate,
                    "memberDetails.$.marriagemonth": marriagemonth,
                    "memberDetails.$.marriageyear": req.body.marriageyear,
                    "memberDetails.$.partnerName": req.body.partnerName,
                    "memberDetails.$.anniversary": anniversary || "",
                }
            },
            { new: true }
        );
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