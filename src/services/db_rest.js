import axios from 'axios';

const url_base = 'http://localhost:9090';
const url_users = url_base + '/php/users.php';
const url_routes = url_base + '/php/routes.php';

// Users
function addUser(user, cb)
{
    console.log("Add user");
    if(!user) throw new Error("Missing user!");
    if(!user.email) throw new Error("Missing email!");
    if(!user.password) throw new Error("Missing password!");
    if(!user.name) throw new Error("Missing name!");
    if(!user.surname) throw new Error("Missing surname!");

    user.id = String(Date.now());

    console.log("Image: " + user.img);

    axios.post(url_users, user)
    .then((resp) => {
        console.log('success: ' + JSON.stringify(resp.data));
        cb(null, resp.data);
    }).catch((err) => {
        if (err.response) {
            cb(new Error(err.response.status));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });
}

function login(email, password, cb)
{
    console.log("Login");

    if(!email) throw new Error("Missing email");
    if(!password) throw new Error("Missing password!");

    axios.post(url_users + '/login', { email: email, password: password })
    .then((resp) => {
        console.log('success: ' + JSON.stringify(resp.data));
        cb(null, resp.data.id, resp.data);
    }).catch((err) => {
        if (err.response) {
            cb(new Error(err.response.status));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });  
}

function listUsers(token, query, cb)
{
    if(!token) throw new Error("Missing token!");

    query.token = token;
    axios.get(url_users, { params: query })
    .then((resp) => {
        console.log('success: ' + JSON.stringify(resp.data));
        cb(null, resp.data);
    }).catch((err) => {
        if (err.response) {
            cb(new Error(err.response.status));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });
}

function updateUser(token, user, cb)
{
    if(!token) throw new Error("Missing token!");
    if(!user) throw new Error("Missing user!");
    if(!user.email) throw new Error("Missing email!");
    if(!user.password) throw new Error("Missing password!");
    if(!user.name) throw new Error("Missing name!");
    if(!user.surname) throw new Error("Missing surname!");

    const updatedUser = {
        token: token,
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
        img: user.img
    }

    console.log("Update user: " + updatedUser);

    axios.put(url_users, updatedUser)
    .then((resp) => {
        console.log("success");
        cb(null, resp.data);
    })
    .catch((err) => {
        if (err.response) {
            cb(new Error(err.response.status));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });
}

// Routes
function addRoute(token, route, cb)
{
   console.log("Add route");
   if(!token) throw new Error("Missing token!");
   if(!route) throw new Error("Missing route!");
   if(!route.title) throw new Error("Missing title!");
   if(!route.positions) throw new Error("Missing positions");

   const routeObj = {
    title: route.title,
    positions: route.positions,
    userId: token
   }

   console.log(routeObj);

   axios.post(url_routes, routeObj)
    .then((resp) => {
        console.log("Adding route succesfull");
        cb(null, resp.data);
    }).catch((err) => {
        if (err.response) {
            cb(new Error(err.response.status));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });

}

function updateRoute(token, route, cb)
{
    console.log("Update route");
    if(!token) throw new Error("Missing token!");
    if(!route) throw new Error("Missing route!");
    if(!route.title) throw new Error("Missing route title!");
    if(!route.positions) throw new Error("Missing route positions!");
    if(!route.timestamp) throw new Error("Missing route timestamp!");
    if(!route.color) throw new Error("Missing route color!");

    console.log("Route: " + route.title);

    const updatedRoute = {
        id: route.id,
        title: route.title,
        positions: route.positions,
        timestamp: route.timestamp,
        color: route.color,
        visualize: route.visualize,
        userId: route.userId
    }

    axios.put(url_routes, updatedRoute)
    .then((resp) => {
        console.log("success");
        cb(null, resp.data);
    })
    .catch((err) => {
        if (err.response) {
            cb(new Error(err.response.status));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });
}

function listRoutes(token, query, cb)
{
    console.log("listRoutes");

    if(!token) throw new Error("Missing token!");
    
    query.userId = token;

    axios.get(url_routes, { params: query })
    .then((resp) => {
        console.log('success: ' + JSON.stringify(resp.data));
        cb(null, resp.data);
    }).catch((err) => {
        if (err.response) {
            cb(new Error(err.response.data));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });
}

function removeRoute(token, routeId, cb)
{
    console.log("removeRoute");

    if(!token) throw new Error("Missing token!");
    if(!routeId) throw new Error("Missing route id!");

    axios.post(url_routes + '/delete', { routeID: routeId })
    .then((resp) => {
        console.log('success');
        cb(null, resp.data);
    }).catch((err) => {
        if (err.response) {
            cb(new Error(err.response.status));
        } else if (err.request) {
            cb(new Error('No response received'));
        } else {
            cb(err);
        }
    });
}

export default {
    addUser,
    listUsers,
    updateUser,
    login,
    addRoute,
    listRoutes,
    updateRoute,
    removeRoute
   }