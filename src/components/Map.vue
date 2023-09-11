<template>
    <div class="centered-content">
        <h1>Map</h1>
        <div class="map-div">
            <div ref="mapContainer" class="map-container"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Map",
    data() {
        return { 
            routes: []
        };
    },
    props: ['user'],
    mounted()
    {
        this.getRoutes();
    },
    methods: {
        getRoutes()
        {
            console.log("Get routes to visualize");
            const token = this.user.token;

            this.$db.listRoutes(token, {visualize: true}, (err, routes) => {
                if(err) alert(err.message);
                this.routes = routes;
                console.log("Routes: " + this.routes);
                
                this.initializeMap()
            });
        },
        initializeMap()
        {
            console.log("Initialize map");

            this.map = new google.maps.Map(this.$refs.mapContainer, {
                center: { lat: 0, lng: 0 },
                zoom: 10,
            });

            //For test only
            for(let i = 0;i<this.routes.length;i++)
            {
                let positions = JSON.parse(this.routes[i].positions);
                let bounds = new google.maps.LatLngBounds();
                let routeCoordinates = [];

                positions.forEach((position) => {
                    const latLng = new google.maps.LatLng(
                    position.latitude,
                    position.longitude
                    );
                    routeCoordinates.push(latLng);
                    bounds.extend(latLng);
                });

                let color = this.routes[i].color;

                let routePath = new google.maps.Polyline({
                    path: routeCoordinates,
                    geodesic: true,
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });

                this.map.fitBounds(bounds);

                routePath.setMap(this.map);
            }
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

.map-div
{
    width: 100vw;
}

.map-container {
  height: 400px;
}
</style>