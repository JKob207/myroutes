<template>
    <div class="centered-content">
        <md-card>
            <md-card-header>
                <div class="md-title">Record route</div>
            </md-card-header>
            <md-card-content class="flex-column">
                <md-field>
                    <label>Title</label>
                    <md-input v-model="title"></md-input>
                </md-field>
                <span class="missingTitleError" v-if="titleError">Missing title!</span>
            </md-card-content>
            <md-card-actions class="center-buttons">
                <md-button @click="startTracking" v-if="!isTracking">Start</md-button>
                <md-button @click="stopTracking" v-else>Stop</md-button>
            </md-card-actions>
        </md-card>
        <div class="map-div">
            <div ref="mapContainer" class="map-container"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            title: "",
            titleError: false,
            map: null,
            marker: null,
            isTracking: false,
            positions: []
        };
    },
    props: ['user'],
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            console.log("Initialize map");
            this.map = new google.maps.Map(this.$refs.mapContainer, {
                center: { lat: 0, lng: 0 },
                zoom: 10,
            });

            // Create a marker to display current position
            this.marker = new google.maps.Marker({
                map: this.map,
            });
        },
        startTracking() {
            if(!this.title) 
            {
                this.titleError = true;
                throw new Error("Missing title");
            }

            console.log("Start tracking...");
            if (navigator.geolocation) {
                this.isTracking = true;
                navigator.geolocation.watchPosition(this.updatePosition);
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        },
        updatePosition(position)
        {
            console.log("Update position");
            const latLng = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );

            this.marker.setPosition(latLng);

            this.map.setCenter(latLng);
            this.map.setZoom(15);

            this.positions.push({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: position.timestamp,
            });
        },
        stopTracking() {
            console.log("Stop tracking route");

            this.titleError = false;
            this.isTracking = false;
            console.log(this.positions);
            
            const userID = this.user.id;
            const routeObj = {
                title: this.title,
                positions: this.positions
            }

            this.$db.addRoute(userID, routeObj, (err, user) => {
                if(err) alert(err.message);
            });

            this.title = "";
            this.map = null;
            this.marker = null;
            this.positions = [];
            this.initializeMap();
        }
    }
}
</script>

<style scoped>
.centered-content
{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 85vh;
}

.flex-column
{
    display: flex;
    flex-direction: column;
}

.missingTitleError
{
    color: red;
    margin: 0 auto;
    font-size: .9em;
}

.map-div
{
    width: 100vw;
}

.map-container {
  height: 400px;
}

</style>