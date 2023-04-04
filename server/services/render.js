import axios from "axios"
// import User from "../model/model"

export const addData = async (req, res) => {
    res.render('index')
}

export const getData = async (req, res) => {
    axios.get("http://localhost:8080/admin")
        .then((response) => {
            res.render('admin/userList', { users: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

export const getMember = async (req, res) => {
    axios.get("http://localhost:8080/admin/" + req.query.id)
        .then((userData) => {
            const dateFormat = userData.data.memberDetails.map(member => {
                member.bDate = new Date(member.bDate).toLocaleDateString();
                member.dob = new Date(member.dob).toLocaleDateString();
                if (member.dom) {
                    member.dom = new Date(member.dom).toLocaleDateString();
                }
                return member;
            });
            res.render("admin/editList", { user: userData.data, member: dateFormat })
        })
        .catch(err => {
            res.send(err)
        })
}