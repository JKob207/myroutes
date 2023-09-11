var users = {
    '1': {
        id: '1',
        email: 'pepe',
        password: 'pepe',
        name: 'Pepe',
        surname: 'Pepe',
        img: '',
        routes: [
            {
                id: '1', title: 'Ruta 1', ts: Date.now(), positions: [{lat:37.7, long:-
                122.4, ts: Date.now()}, {lat:37.7, long:-122.4, ts: Date.now()}]}, {id: '2',
                title: 'Ruta 2', ts: Date.now(), positions: [{lat:37.7, long:-122.4, ts:
                Date.now()}, {lat:37.7, long:-122.4, ts: Date.now()}]
            }
        ]
    },
    '2': {
        id: '2',
        email: 'juan',
        password: 'juan',
        name: 'Juan',
        surname: 'Juan',
        img: '',
        routes: [
            {
                id: '1', title: 'Ruta 1', ts: Date.now(), positions: [{lat:37.7, long:-
                122.4, ts: Date.now()}, {lat:37.7, long:-122.4, ts: Date.now()}]
            }
        ]
    }
};
   

// Users
function addUser(user, cb)
{
    console.log("Add user");
    if(!user) throw new Error("Missing user!");
    if(!user.email) throw new Error("Missing email!");
    if(!user.password) throw new Error("Missing password!");
    if(!user.name) throw new Error("Missing name!");
    if(!user.surname) throw new Error("Missing surname!");

    for(let id in users)
    {
        if(users[id].email == user.email)
        {
            cb(new Error("User already exists!"));
            return;
        }
    }

    let newUser = {
        id: String(Date.now()),
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
        img: user.img || ''
    };
    newUser.id = String(Date.now());
    users[newUser.id] = newUser;
    user.id = newUser.id;
    if (cb) cb(null, user);
}

function login(email, password, cb)
{
    console.log("Login");

    if(!email) throw new Error("Missing email");
    if(!password) throw new Error("Missing password!");

    for (var id in users) {
        if (users[id].email == email) {
            if (users[id].password == password) {
                var user = {
                    id: id,
                    email: users[id].email,
                    name: users[id].name,
                    surname: users[id].surname,
                    img: users[id].img
                }
                if (cb) cb(null, id, user);
                return;
        } else {
            if (cb) cb(new Error('Wrong password'));
            return;
            }
        }
    }
    if (cb) cb(new Error('Invalid credentials'));
       
}

function listUsers(token, query, cb)
{
    if(!token) throw new Error("Missing token!");
    var userId = users[token]? token: null;

    if (!userId) {
        if (cb) cb(new Error('Invalid token'));
        return;
    }

    var results = [];
    for (var id in users) {
        var matches = !query || !Object.keys(query).length;
        if (!matches) {
            for (var cond in query) {
                if (String(users[id][cond]).indexOf(String(query[cond])) != -1) {
                    matches = true;
                    break;
                }
            }
        }

        if (matches) results.push({
            id: users[id].id,
            email: users[id].email,
            name: users[id].name,
            surname: users[id].surname,
            img: users[id].img
        });
    }
    if (cb) cb(null, results);
}

function updateUser(token, user, cb)
{
    if(!token) throw new Error("Missing token!");
    if(!user) throw new Error("Missing user!");
    if(!user.email) throw new Error("Missing email!");
    if(!user.password) throw new Error("Missing password!");
    if(!user.name) throw new Error("Missing name!");
    if(!user.surname) throw new Error("Missing surname!");

    var userId = users[token]? token: null;

    if (!userId) {
        if (cb) cb(new Error('Invalid token'));
        return;
    }

    var result = false;
    for(let id in users)
    {
        if(users[id].id == user.id)
        {
            let newUser = {
                id: user.id,
                email: user.email,
                password: user.password,
                name: user.name,
                surname: user.surname,
                img: user.img
            };
            users[id] = newUser;
            result = true;

            cb(null, newUser);
            return;
        }
    }
    if(!result)
    {
        if (cb) cb(new Error('User not found!'));
        return;
    }
}

function list()
{
    console.log(users);
}

// Routes
function addRoute(token, route, cb)
{

}

function updateRoute(token, route, cb)
{

}

function listRoutes(token, query, cb)
{

}

function removeRoute(token, routeId, cb)
{

}

export default {
    addUser,
    listUsers,
    updateUser,
    login,
    addRoute,
    listRoutes,
    updateRoute,
    removeRoute,
    list
   }