<template>
    <div class="centered-content">
        <!--Login-->
        <md-content v-if="mode == 'login'" class="md-elevation-1">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="error in errors" :style="{ color: errorsColor }">{{ error }}</li>
                </ul>
            </p>
            <md-field>
                <label>Email</label>
                <md-input type="email" v-model="user.email" name="email"></md-input>
            </md-field>
            <md-field>
                <label>Password</label>
                <md-input v-model="user.password" type="password"></md-input>
            </md-field>
            <md-button class="md-primary" @click="mode = 'register', errors = []">Register</md-button>
            <md-button class="md-primary md-raised" @click="login">Login</md-button>
        </md-content>
        <!--Register-->
        <md-content v-else class="md-elevation-1">
            <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" :style="{ color: errorsColor }">{{ error }}</li>
                    </ul>
            </p>
            <md-content class="md-layout md-alignment-center-center">
                <md-avatar v-if="user.img" class="md-large">
                    <img :src="user.img" />
                </md-avatar>
                <md-avatar v-else class="md-large">
                    <img src="https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png" alt="avatar" />
                </md-avatar>
            </md-content>
            <md-field>
                <label>Name</label>
                <md-input v-model="user.name"></md-input>
            </md-field>
            <md-field>
                <label>Surname</label>
                <md-input v-model="user.surname"></md-input>
            </md-field>
            <md-field>
                <label>Email</label>
                <md-input v-model="user.email"></md-input>
            </md-field>
            <md-field>
                <label>Password</label>
                <md-input v-model="user.password" type="password"></md-input>
            </md-field>
            
            <input id="file" @change="saveImage" type="file" accept="image/*" style="display:none;" />
            <md-button class="md-primary" @click="openImage">Set Image</md-button>
            
            <md-button class="md-primary" @click="mode = 'login', errors = []">Cancel</md-button>
            <md-button class="md-primary md-raised" @click="register">Accept</md-button>
        </md-content>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            mode: "login",
            user: {
                email: "",
                password: "",
                name: "",
                surname: "",
                img: ""
            },
            errors: [],
            errorsColor: "#ff0000"
        };
    },
    methods: {
        login() {
            console.log("Login");
            const validateResult = this.checkLoginForm();
            if(!validateResult)
            {
                console.error("Correct errors!");
                return;
            }
            console.log(this.user.email);
            console.log(this.user.password);
            this.$db.login(this.user.email, this.user.password, 
            (err, token, user) => {
                if(err) 
                {
                    //alert(err);
                    if(err.message == "404")
                    {
                        this.errors.push("User not found!");
                    }
                }
                else {
                    Vue.set(this.$user, "token", token);
                    for(let att in user) Vue.set(this.$user, att, user[att]);
                }
            })
        },
        checkLoginForm()
        {
            this.errors = [];

            if(!this.user.email)
            {
                this.errors.push("Email required.");
            }else if(!this.validEmail(this.user.email))
            {
                this.errors.push('Valid email required.');
            }

            if(!this.user.password)
            {
                this.errors.push("Password required.");
            }else if(this.user.password.length < 5)
            {
                this.errors.push("Password should concat at least 5 characters!");
            }

            if (!this.errors.length) {
                return true;
            }
        },
        checkRegisterForm()
        {
            this.errors = [];

            if(!this.user.name)
            {
                this.errors.push("Name required.");
            }

            if(!this.user.surname)
            {
                this.errors.push("Surname required.");
            }

            if(!this.user.img)
            {
                this.errors.push("Avatar required.");
            }

            if(!this.user.email)
            {
                this.errors.push("Email required.");
            }else if(!this.validEmail(this.user.email))
            {
                this.errors.push('Valid email required.');
            }

            if(!this.user.password)
            {
                this.errors.push("Password required.");
            }else if(this.user.password.length < 5)
            {
                this.errors.push("Password should concat at least 5 characters!");
            }

            if (!this.errors.length) {
                return true;
            }
        },
        validEmail: function (email) {
            var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return re.test(email);
        },
        openImage(event) {
            console.log("Profile.openImage()");
            document.getElementById("file").click();
        },
        saveImage() {
            console.log("Profile.saveImage()");
            var self = this;
            var element = document.getElementById("file");
            var file = element.files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                Vue.set(self.user, "img", reader.result);
            };
            reader.readAsDataURL(file);
        },
        register()
        {
            console.log("Register");
            const validateResult = this.checkRegisterForm();
            if(!validateResult)
            {
                console.error("Correct errors!");
                return;
            }
            this.$db.addUser(this.user, (err, user) => {
                if(err) alert(err.message);
                else
                {
                    this.mode = 'login';
                }
            });
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
</style>