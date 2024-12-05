export const users = [{
    name: 'guss',
    email: 'eu@oguss.com',
    password: '1234'
}];

export const addUser = (user) => {
    users.push(user);
};

export const delereUser = (userId) => {
    users.filter((user) => user.id === userId);
};

export const updateUser = (userId, updates) => {
    const userIndex = users.findIndex((user) => user.id === userId);

    users[userIndex] = {...users[userIndex], ...updates };

    return users[userIndex];
};