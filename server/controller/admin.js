import User from "../model/model.js";
import { calculateAge, monthNumber, monthName } from "../../helpers/util.js";

export const addData = async (req, res) => {
  //router.get("/", addData)
  try {
    res.render("index");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const createData = async (req, res) => {
  //router.post("/", createData)
  try {
    const { unit, houseN, phoneN, memberDetails } = req.body;
    const newMemberDetails = memberDetails.map(
      ({
        birthdate,
        birthmonth,
        birthyear,
        baptismmonth,
        marriagedate,
        marriagemonth,
        marriageyear,
        ...member
      }) => {
        birthmonth = monthNumber(birthmonth);
        baptismmonth = monthNumber(baptismmonth);
        marriagemonth = monthNumber(marriagemonth);
        const age =
          calculateAge(new Date(birthyear, birthmonth, birthdate)) || "";
        const anniversary =
          calculateAge(new Date(marriageyear, marriagemonth, marriagedate)) ||
          "";
        return {
          ...member,
          birthdate,
          birthmonth,
          birthyear,
          baptismmonth,
          marriagedate,
          marriagemonth,
          marriageyear,
          age,
          anniversary,
        };
      }
    );

    const data = new User({
      unit,
      houseN,
      phoneN,
      memberDetails: newMemberDetails,
    });
    const savedUser = await data.save();
    res
      .status(200)
      .send(
        '<script>alert("Form submitted successfully!"); window.location.href="/";</script>'
      );
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const getAllData = async (req, res) => {
  //router.get("/list", getAllData)
  try {
    const { BM, AM, checksort, method } = req.query;
    if (Object.keys(req.query).length !== 0) {
      if (BM) {
        let BMonth = BM;
        BMonth = monthNumber(BMonth);
        let userList;
        if (checksort == "date" && method == "ascending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.birthmonth": BMonth } },
            { $sort: { "memberDetails.birthdate": 1 } },
          ]);
        } else if (checksort == "date" && method == "descending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.birthmonth": BMonth } },
            { $sort: { "memberDetails.birthdate": -1 } },
          ]);
        } else if (checksort == "year" && method == "ascending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.birthmonth": BMonth } },
            { $sort: { "memberDetails.birthyear": 1 } },
          ]);
        } else if (checksort == "year" && method == "descending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.birthmonth": BMonth } },
            { $sort: { "memberDetails.birthyear": -1 } },
          ]);
        } else {
          userList = await User.aggregate([
            {
              $match: {
                "memberDetails.birthmonth": BMonth,
              },
            },
            {
              $project: {
                _id: 1,
                unit: 1,
                houseN: 1,
                "memberDetails._id": 1,
                "memberDetails.name": 1,
                "memberDetails.birthdate": 1,
                "memberDetails.birthmonth": 1,
                "memberDetails.birthyear": 1,
              },
            },
            {
              $unwind: "$memberDetails",
            },
            {
              $match: {
                "memberDetails.birthmonth": BMonth,
              },
            },
            {
              $project: {
                _id: 1,
                unit: 1,
                houseN: 1,
                "memberDetails._id": 1,
                "memberDetails.name": 1,
                "memberDetails.birthdate": 1,
                "memberDetails.birthmonth": 1,
                "memberDetails.birthyear": 1,
              },
            },
          ]);
        }
        // console.log(userList);
        // res.status(200).json(userList);
        res.render("admin/viewList", { filterbirthday: userList });
      } else if (AM) {
        let AMonth = AM;
        AMonth = monthNumber(AMonth);
        let userList;
        if (checksort == "date" && method == "ascending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.marriagemonth": AMonth } },
            { $sort: { "memberDetails.marriagedate": 1 } },
          ]);
        } else if (checksort == "date" && method == "descending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.marriagemonth": AMonth } },
            { $sort: { "memberDetails.marriagedate": -1 } },
          ]);
        } else if (checksort == "year" && method == "ascending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.marriagemonth": AMonth } },
            { $sort: { "memberDetails.marriageyear": 1 } },
          ]);
        } else if (checksort == "year" && method == "descending") {
          userList = await User.aggregate([
            { $unwind: "$memberDetails" },
            { $match: { "memberDetails.marriagemonth": AMonth } },
            { $sort: { "memberDetails.marriageyear": -1 } },
          ]);
        } else {
          userList = await User.aggregate([
            {
              $match: {
                "memberDetails.marriagemonth": AMonth,
              },
            },
            {
              $project: {
                _id: 1,
                unit: 1,
                houseN: 1,
                "memberDetails._id": 1,
                "memberDetails.name": 1,
                "memberDetails.marriagedate": 1,
                "memberDetails.marriagemonth": 1,
                "memberDetails.marriageyear": 1,
                "memberDetails.partnerName": 1,
                "memberDetails.anniversary": 1,
              },
            },
            {
              $unwind: "$memberDetails",
            },
            {
              $match: {
                "memberDetails.marriagemonth": AMonth,
              },
            },
            {
              $project: {
                _id: 1,
                unit: 1,
                houseN: 1,
                "memberDetails._id": 1,
                "memberDetails.name": 1,
                "memberDetails.marriagedate": 1,
                "memberDetails.marriagemonth": 1,
                "memberDetails.marriageyear": 1,
                "memberDetails.partnerName": 1,
                "memberDetails.anniversary": 1,
              },
            },
          ]);
        }
        // console.log(userList);
        // res.status(200).json(userList);
        res.render("admin/viewList", { filtermarriage: userList });
      } else {
        res.send("Wrong");
      }
    } else {
      const userList = await User.find();
      // res.status(200).json(userList)
      res.render("admin/viewList", { users: userList });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const getMember = async (req, res) => {
  //router.get("/view/:id", getMember)
  try {
    let userList = await User.findById(req.params.id);
    const memberDetail = userList.memberDetails;
    let newMemberDetails = memberDetail.map(
      ({
        name,
        relation,
        age,
        birthdate,
        birthmonth,
        birthyear,
        baptismdate,
        baptismmonth,
        baptismyear,
        abroad,
        placeName,
        married,
        marriagedate,
        marriagemonth,
        marriageyear,
        partnerName,
        anniversary,
        _id,
      }) => {
        const updatedage = age !== null && age >= 1 && age <= 110 ? age : 0;
        const updatedanniversary =
          anniversary !== null && anniversary >= 1 && anniversary <= 100
            ? anniversary
            : 0;
        const updatedBirthmonth =
          birthmonth !== null && birthmonth >= 1 && birthmonth <= 12
            ? birthmonth
            : 0;
        const updatedBaptismmonth =
          baptismmonth !== null && baptismmonth >= 1 && baptismmonth <= 12
            ? baptismmonth
            : 0;
        const updatedMarriagemonth =
          marriagemonth !== null && marriagemonth >= 1 && marriagemonth <= 12
            ? marriagemonth
            : 0;

        const newBirthmonth =
          updatedBirthmonth !== 0 ? monthName(updatedBirthmonth) : 0;
        const newBaptismmonth =
          updatedBaptismmonth !== 0 ? monthName(updatedBaptismmonth) : 0;
        const newMarriagemonth =
          updatedMarriagemonth !== 0 ? monthName(updatedMarriagemonth) : 0;
        return {
          name,
          relation,
          age: updatedage,
          birthdate: birthdate,
          birthmonth: newBirthmonth,
          birthyear: birthyear,
          baptismdate: baptismdate,
          baptismmonth: newBaptismmonth,
          baptismyear: baptismyear,
          abroad: abroad,
          placeName: placeName,
          married: married,
          marriagedate: marriagedate,
          marriagemonth: newMarriagemonth,
          marriageyear: marriageyear,
          partnerName: partnerName,
          anniversary: updatedanniversary,
          _id: _id,
        };
      }
    );
    // console.log(newMemberDetails); // Verify the updated memberDetails
    // res.status(200).json(userList)
    res.render("admin/viewData", { user: userList, member: newMemberDetails });
    // res.status(200).json(newMemberDetails)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const getEditMember = async (req, res) => {
  //router.get("/edit/:id/:memberid", getEditMember)
  try {
    const editList = await User.findOne(
      { _id: req.params.id },
      { memberDetails: { $elemMatch: { _id: req.params.memberid } } }
    );
    if (!editList) {
      return res.status(404).json({ message: "Member not found" });
    }
    let member = editList.memberDetails;
    let newMemberDetails = member.map(
      ({
        name,
        relation,
        dob,
        bDate,
        dom,
        age,
        birthdate,
        birthmonth,
        birthyear,
        baptismdate,
        baptismmonth,
        baptismyear,
        abroad,
        placeName,
        married,
        marriagedate,
        marriagemonth,
        marriageyear,
        partnerName,
        anniversary,
        _id,
      }) => {
        const updateddob = dob ?? 0;
        const updatedbDate = bDate ?? 0;
        const updateddom = dom ?? 0;
        const updatedage = age !== null && age >= 1 && age <= 110 ? age : 0;
        const updatedanniversary =
          anniversary !== null && anniversary >= 1 && anniversary <= 100
            ? anniversary
            : 0;
        const updatedBirthdate =
          birthdate !== null && birthdate >= 1 && birthdate <= 31
            ? birthdate
            : 0;
        const updatedBirthmonth =
          birthmonth !== null && birthmonth >= 1 && birthmonth <= 12
            ? birthmonth
            : 0;
        const updatedBirthyear = birthyear !== null ? birthyear : 0;
        const updatedBaptismdate =
          baptismdate !== null && baptismdate >= 1 && baptismdate <= 31
            ? baptismdate
            : 0;
        const updatedBaptismmonth =
          baptismmonth !== null && baptismmonth >= 1 && baptismmonth <= 12
            ? baptismmonth
            : 0;
        const updatedBaptismyear = baptismyear !== null ? baptismyear : 0;
        const updatedMarriagedate =
          marriagedate !== null && marriagedate >= 1 && marriagedate <= 31
            ? marriagedate
            : 0;
        const updatedMarriagemonth =
          marriagemonth !== null && marriagemonth >= 1 && marriagemonth <= 12
            ? marriagemonth
            : 0;
        const updatedMarriageyear = marriageyear !== null ? marriageyear : 0;

        const newBirthmonth =
          updatedBirthmonth !== 0 ? monthName(updatedBirthmonth) : 0;
        const newBaptismmonth =
          updatedBaptismmonth !== 0 ? monthName(updatedBaptismmonth) : 0;
        const newMarriagemonth =
          updatedMarriagemonth !== 0 ? monthName(updatedMarriagemonth) : 0;
        return {
          name,
          relation,
          dob: updateddob,
          bDate: updatedbDate,
          dom: updateddom,
          age: updatedage,
          birthdate: updatedBirthdate,
          birthmonth: newBirthmonth,
          birthyear: updatedBirthyear,
          baptismdate: updatedBaptismdate,
          baptismmonth: newBaptismmonth,
          baptismyear: updatedBaptismyear,
          abroad: abroad,
          placeName: placeName,
          married: married,
          marriagedate: updatedMarriagedate,
          marriagemonth: newMarriagemonth,
          marriageyear: updatedMarriageyear,
          partnerName: partnerName,
          anniversary: updatedanniversary,
          _id: _id,
        };
      }
    );

    // console.log(newMemberDetails);
    // console.log(editList);
    // res.status(200).json(member);
    res.render("admin/editData", {
      id: req.params.id,
      memberid: req.params.memberid,
      member: newMemberDetails,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const updateData = async (req, res) => {
  //router.post("/update/:id", updateData)
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    // res.status(200).json(updateUser);
    res.send(
      `<script>alert("Form submitted successfully!"); window.location.href="/view/${req.params.id}";</script>`
    );
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const updateMember = async (req, res) => {
  //router.post("/updatemember/:id/:memberid", updateMember)
  try {
    const birthmonth = monthNumber(req.body.birthmonth);
    const baptismmonth = monthNumber(req.body.baptismmonth);
    let age = 0;
    let marriagemonth;
    let anniversary;
    if (req.body.birthyear && birthmonth && req.body.birthdate) {
      age = calculateAge(
        new Date(req.body.birthyear, birthmonth, req.body.birthdate)
      );
    }
    if (req.body.married) {
      marriagemonth = monthNumber(req.body.marriagemonth);
      marriagemonth = Number.isNaN(marriagemonth) ? 0 : marriagemonth;
      anniversary = calculateAge(
        new Date(req.body.marriageyear, marriagemonth, req.body.marriagedate)
      );
      anniversary = Number.isNaN(anniversary) ? 0 : anniversary;
    } else {
      anniversary = 0;
      marriagemonth = 0;
    }
    const updatedMember = await User.findOneAndUpdate(
      { _id: req.params.id, "memberDetails._id": req.params.memberid },
      {
        $set: {
          "memberDetails.$.name": req.body.name,
          "memberDetails.$.relation": req.body.relation,
          "memberDetails.$.birthdate": req.body.birthdate,
          "memberDetails.$.birthmonth": birthmonth,
          "memberDetails.$.birthyear": req.body.birthyear,
          "memberDetails.$.age": age,
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
          "memberDetails.$.anniversary": anniversary,
        },
      },
      { new: true }
    );
    // console.log(updatedMember);
    // res.status(200).json(updatedMember);
    res
      .status(200)
      .send(
        `<script>alert("Form submitted successfully!"); window.location.href="/view/${req.params.id}";</script>`
      );
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const deleteData = async (req, res) => {
  //router.delete("/:id", deleteData)
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

export const deleteMember = async (req, res) => {
  //router.delete("/:id/:memberid", deleteMember)
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
};
