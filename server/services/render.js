import axios from "axios"

export const addData = async (req, res) => {
    try {
        res.render('index')
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

export const getData = async (req, res) => {
    axios.get("http://localhost:8080/lists")
        .then((response) => {
            res.render('admin/userList', { users: response.data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            })
        })
}

export const getMember = async (req, res) => {
    try {
        const { data } = await axios.get(`http://localhost:8080/get/${req.query.id}`);

        const dateFormat = data.memberDetails.map(({ bDate, dob, dom, ...member }) => ({
            bDate: new Date(bDate).toLocaleDateString(),
            dob: new Date(dob).toLocaleDateString(),
            dom: dom ? new Date(dom).toLocaleDateString() : null,
            ...member,
        }));

        res.render('admin/editList', { user: data, member: dateFormat });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred',
        });
    }
}