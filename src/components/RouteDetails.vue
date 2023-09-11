<template>
    <div>
        <h1>Route: {{this.route.title}}</h1>
        <md-content class="md-elevation-1">
            <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" :style="{ color: errorsColor }">{{ error }}</li>
                    </ul>
            </p>
            <md-content class="md-layout md-alignment-center-center">
                <md-field>
                    <label>Title</label>
                    <md-input v-model="route.title"></md-input>
                </md-field>
                <md-field>
                    <md-icon>event</md-icon>
                    <label>Date</label>
                    <md-input v-model="route.timestamp" disabled></md-input>
                </md-field>
                <div class="color-input-div">
                    <input type="color" :value="color" @input="event => color = event.target.value" />
                </div>
                <div class="checkbox-input-div">
                    <md-checkbox class="md-primary" v-model="visualize">Visualize</md-checkbox>
                </div>
                <div class="select-div">
                    <md-field>
                        <label for="userList">User owner</label>
                        <md-select v-model="userOwner" name="userList">
                            <md-option v-for="user in userList" :value="user.id" :key="user.token">
                                {{ user.name }} {{ user.surname }}
                            </md-option>
                        </md-select>
                    </md-field>
                </div>
            </md-content>
            <div class="md-layout md-alignment-center-center">
                <md-button class="md-dense md-raised md-primary" @click="saveRouteDetails">
                    Save route
                </md-button>
                <md-button class="md-dense md-raised md-accent" @click="removeDialog = true">
                    Delete route
                </md-button>
            </div>
        </md-content>
        <md-dialog-confirm
            :md-active.sync="removeDialog"
            md-title="You sure you want to delete your route?"
            md-content="This operation cannot be undone!"
            md-confirm-text="Delete"
            md-cancel-text="Cancel"
            @md-cancel="onCancel"
            @md-confirm="deleteRoute" />
        
            <md-dialog-alert
                :md-active.sync="saveRouteDialog"
                md-content="Your route has been saved!"
                md-confirm-text="Ok" />
    </div>
</template>

<script>
export default {
    name: "RouteDetails",
    data() {
        return { 
            id: this.$route.params.id,
            route: [],
            color: '',
            visualize: false,
            removeDialog: false,
            saveRouteDialog: false,
            userOwner: null,
            userList: [],
            errors: [],
            errorsColor: "#ff0000"
        };
    },
    props: ['user'],
    mounted()
    {
        this.initRouteId()
    },
    methods: {
        initRouteId() {
            console.log("Initialize route with id: " + this.id);
            const token = this.user.token;

            this.$db.listRoutes(token, {routeId: this.id}, (err, route) => {
                if(err) alert(err.message);
                this.route = route[0];
                console.log("Route: " + this.route.timestamp);
                this.visualize = this.route.visualize ? true : false;
                this.color = this.route.color;
                
                this.getUsers();
            });
        },
        checkForm()
        {
            this.errors = [];

            if(!this.route.title)
            {
                this.errors.push("Title required.");
            }

            if (!this.errors.length) {
                return true;
            }
        },
        getUsers()
        {
            console.log("Get user list");
            const token = this.user.token;

            this.$db.listUsers(token, {}, (err, users) => {
                if(err) alert(err.message);
                console.log("User list: " + users[0].name);
                
                this.userList = users;
                this.userOwner = this.user.id;
            });

        },
        saveRouteDetails()
        {
            console.log("Change user details");

            const validateResult = this.checkForm();
            if(!validateResult)
            {
                console.error("Correct errors!");
                return;
            }

            const visualizeBooltoInt = this.visualize ? 1 : 0;

            console.log("Current user owner id: " + this.userOwner);

            const updatedRoute = {
                id: this.route.id,
                title: this.route.title,
                positions: this.route.positions,
                timestamp: this.route.timestamp,
                color: this.color,
                visualize: visualizeBooltoInt,
                userId: this.userOwner
            }

            this.$db.updateRoute(this.user.token, updatedRoute, (err, route) => {
                if(err) alert(err.message);
            });

            this.saveRouteDialog = true;
        },
        deleteRoute()
        {
            console.log("Delete route");

            this.$db.removeRoute(this.user.token, this.route.id, (err, res) => {
                if(err) alert(err.message);
                this.$router.push('/routes');
            });
        },
        onCancel()
        {
            console.log("Cancel remove route");
        }
    }
}
</script>

<style scoped>
.centered-content
{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.md-content
{
    padding: 20px;
}

.color-input-div, .checkbox-input-div
{
    width: 100%;
}

.color-input-div input
{
    width: 100%;
    height: 35px;
    border: none;
    padding: 0;
}
</style>