<template>
    <MglMap :style="{width: width, height: height}" :accessToken="accessToken" :mapStyle.sync="mapStyle"
            :center="center" @load="onMapLoaded" :zoom="zoom">
        <MglMarker v-for="(marker, i) in markers" :key="marker.id" :coordinates="getLocation(marker.geometry)"
                   color="red"
                   :draggable="true" @dragend="listener(i, $event)"/>
    </MglMap>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker} from "vue-mapbox";

    export default {
        name: 'MapBox',
        components: {
            MglMap,
            MglMarker
        },
        props: {
            addresses: {
                type: Array,
                default: () => {
                    return []
                }
            },
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data() {
            return {
                markers: this.addresses,
                accessToken: 'pk.eyJ1IjoiaG9hbmdhbmhsYW0iLCJhIjoiY2s1M2UybnI3MDdvNzN0bWNzY2ZzejY3ZiJ9.5I5sSMztCsYsWxzJ_2ttKw',
                mapStyle: 'mapbox://styles/mapbox/streets-v11'
            };
        },
        methods: {
            getLocation(geo) {
                return [geo.location.lng, geo.location.lat]
            },
            onMapLoaded(event) {
                this.map = event.map;
                this.$emit("mapCreated", this.map);
            },
            listener(index, e) {
                let location = e.marker._lngLat
                this.$api['reverse_geo'].list(location).then(res => {
                    this.$emit('moved', {index, addresses: res})
                })
            }
        },
        watch: {
            addresses() {
                this.markers = this.addresses
            }
        },
        computed: {
            center() {
                if (this.markers.length) {
                    return this.getLocation(this.markers[0].geometry)
                }
                return [0, 0]
            },
            zoom() {
                if (this.markers.length) {
                    let sizes = this.markers[0].formatted_address.split(",")
                    return sizes.length * 3
                }
                return 6
            }
        }
    };
</script>
