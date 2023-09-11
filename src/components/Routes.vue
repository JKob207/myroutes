<template>
    <div>
        <h1>Routes</h1>
        <md-field>
            <label>Search</label>
            <md-input v-model="searchText" @input="filterRoutes"></md-input>
        </md-field>
        <md-list>
            <md-list-item v-for="route in filteredRoutes" :key="route.id" :to="'/routes/' + route.id">
                <span class="md-list-item-text">{{route.title}}</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {
    name: "Routes",
    data() {
        return { 
            routes: [],
            searchText: ''
        };
    },
    props: ['user'],
    mounted() {
        this.initializeRoutes();
    },
    computed: {
        filteredRoutes() {
            if (!this.searchText) {
                return this.routes;
            }

            const searchTextLowerCase = this.searchText.toLowerCase();
            return this.routes.filter((route) =>
                route.title.toLowerCase().includes(searchTextLowerCase)
            );
        }
    },
    methods: {
        initializeRoutes() {
            console.log("Initialize routes");
            const token = this.user.token;

            this.$db.listRoutes(token, {}, (err, routes) => {
                if(err) alert(err.message);
                this.routes = routes;
                console.log("Routes: " + this.routes);
            });
        },
        filterRoutes()
        {
            //console.log(this.searchText);
        }
    }
}
</script>

<style scoped>
.md-list-item:hover
{
    background-color: rgba(0, 0, 0, 0.12);
}

</style>