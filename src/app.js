import express from 'express';
import {v4 as uuid} from 'uuid';
import {addUser, delereUser, updateUser, users} from './users.js'

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    return res.json(users);
})

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    const user = users.find((user) => user.id === userId);

    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    const {name, email, id} = user;

    return res.status(200).json({id, name, email});
});

app.post('/users', (req, res) => {
    const {name , email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: 'Name, email and password are required'});
    }

    if(users.some((user) => user.email === email)){
        return res.status(400).json({message: 'User already exists'});
    }

    const newUser = {
        id : uuid(),
        name,
        email,
        password,
    };

    addUser(newUser);

    return res.status(201).json({message: 'User created successfully'});
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const user = users.find((user) => user.id === userId);

    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    delereUser(userId);

    return res.status(200).json({message: 'User deleted successfully'});
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;

    const user = users.find((user) => user.id === userId);

    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    const {name, email, password} = req.body;

    const updatedUser = updateUser(userId, {name, email, password});
    
    return res.status(200).json(updatedUser);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});