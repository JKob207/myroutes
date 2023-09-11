<template>
    <div class="centered-content">
        <md-content class="md-elevation-1">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="error in errors" :style="{ color: errorsColor }">{{ error }}</li>
                </ul>
            </p>
            <md-content class="md-layout md-alignment-center-center">
                <md-avatar v-if="updatedUser.img" class="md-large">
                    <img :src="updatedUser.img" />
                </md-avatar>
                <md-avatar v-else class="md-large">
                    <img src="https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png" alt="avatar" />
                </md-avatar>
            </md-content>
            <md-field>
                <label>Name</label>
                <md-input v-model="updatedUser.name"></md-input>
            </md-field>
            <md-field>
                <label>Surname</label>
                <md-input v-model="updatedUser.surname"></md-input>
            </md-field>
            <md-field>
                <label>Email</label>
                <md-input v-model="updatedUser.email"></md-input>
            </md-field>
            <md-field>
                <label>Password</label>
                <md-input v-model="updatedUser.password" type="password"></md-input>
            </md-field>
            
            <input id="file" type="file" @change="changeImage" accept="image/*" style="display:none;" />
            <md-button class="md-primary" @click="openImage">Set Image</md-button>
            
            <md-button class="md-primary">Cancel</md-button>
            <md-button class="md-primary md-raised" @click="change">Change</md-button>
        </md-content>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return { 
            updatedUser: {
                email: this.user.email,
                password: this.user.password,
                name: this.user.name,
                surname: this.user.surname,
                img: this.user.img
            },
            errors: [],
            errorsColor: "#ff0000"
        };
    },
    props: ['user'],
    methods:
    {
        change()
        {
            console.log("Change user data");

            const validateResult = this.checkForm();
            if(!validateResult)
            {
                console.error("Correct errors!");
                return;
            }

            this.$db.updateUser(this.user.token, this.updatedUser, (err, user) => {
                if(err) alert(err.message);
            });
        },
        checkForm()
        {
            this.errors = [];

            if(!this.updatedUser.name)
            {
                this.errors.push("Name required.");
            }

            if(!this.updatedUser.surname)
            {
                this.errors.push("Surname required.");
            }

            if(!this.updatedUser.img)
            {
                this.errors.push("Avatar required.");
            }

            if(!this.updatedUser.email)
            {
                this.errors.push("Email required.");
            }else if(!this.validEmail(this.updatedUser.email))
            {
                this.errors.push('Valid email required.');
            }

            if(!this.updatedUser.password)
            {
                this.errors.push("Password required.");
            }else if(this.updatedUser.password.length < 5)
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
        changeImage() {
            console.log("Profile.saveImage()");
            var self = this;
            var element = document.getElementById("file");
            var file = element.files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                Vue.set(self.updatedUser, "img", reader.result);
            };
            reader.readAsDataURL(file);
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