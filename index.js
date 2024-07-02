const express = require('express')
const app = express()
const port = 3000

const axios = require('axios')

const bodyParser = require('body-parser')

const path = require('path');

app.use(bodyParser.json());

const api = "https://667fd2bb56c2c76b495a39b8.mockapi.io/flukce/emwork-test"


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/users', async (req, res) => {
    try {
        const response = await axios.get(api)
        const data = response.data
        const result = data.map(user => ({
            id: user.id,
            CreatedAt: user.createdAt,
            name: user.name,
            surname: user.surename,
            eyecolor: user.eyecolor,
            eyelong: user.eyelong,
            astigmatism: user.astigmatism,
            bodytest: user.bodytest,
            theorytest: user.theorytest,
            practicaltest: user.practicaltest
        }));

        res.json(result)
    } catch (error) {
        console.error(error)
    }
//   res.send("hey")
})


app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const response = await axios.post(api, newUser);

        res.status(201).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user');
    }
});

// แก้ไขข้อมูล
app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body
        const response = await axios.put(`${api}/${userId}`, updatedUser);

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

// ลบข้อมูล
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await axios.delete(`${api}/${userId}`);

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})