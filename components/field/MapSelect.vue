<template>
    <div class="a-map">
        <div class="a-input">
            <b-field grouped>
                <div class="control is-expanded is-clearfix">
                    <data-select
                        v-model="data"
                        :multiple="false"
                        :allow-new="false"
                        :dataset="addresses"
                        field="formatted_address"
                        icon="map-marker-plus"
                        placeholder="Somewhere"
                        module="fetch_address"/>
                </div>
                <div class="control">
                    <div class="button" @click="showMap = !showMap">
                        <b-icon icon="google-maps"></b-icon>
                    </div>
                </div>
            </b-field>
        </div>
        <transition name="fade">
            <div class="a-wrap" v-if="showMap" style="margin-top: 1rem">
                <google-map
                    :draggable="true"
                    :cursor="0"
                    width="100%" height="200px"
                    :address="names"
                    :markers="markers"
                    @update-address="onUpdateAdd"
                />
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "AddressMap",
        props: {
            value: {},
            updating: {
                default: false,
                type: Boolean
            }
        },
        data() {
            let value = this.value ? this.value : null
            let addresses = this.value ? [this.value] : []
            return {
                names: addresses.map(x => x ? x.formatted_address : null),
                markers: addresses.map(x => x && x.geometry ? Object.assign(x.geometry.location, {draggable: true}) : {
                    lat: 0,
                    lng: 0,
                    draggable: true
                }),
                data: value,
                addresses: addresses,
                showMap: false
            }
        },
        methods: {
            onUpdateAdd(data) {
                this.addresses = data.addresses
            },
        },
        watch: {
            data() {
                this.markers = this.data && this.data.geometry ? [Object.assign(this.data.geometry.location, {draggable: true})] : []
                this.$emit('input', this.data)
            },
            addresses() {
                if (this.addresses.length) {
                    this.data = this.addresses[0]
                }
            }
        }
    }
</script>

<style lang="scss">
    .a-map {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1rem;
        border: 1px solid #EEEEEE;

        .a-input {
            flex: 0;
        }

        .a-wrap {
            flex: 1;
            position: relative;
        }
    }
</style>
