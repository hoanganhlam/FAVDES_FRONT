<template>
    <div class="hero">
        <div class="hero-body">
            <div class="container">
                <activity-list :value="activityRes" :q="queries">
                    <h1 class="widget_title">
                        <b-icon icon="map-marker" size="is-small"></b-icon>
                        <span>{{address.formatted_address}}</span>
                    </h1>
                </activity-list>
            </div>
        </div>
    </div>
</template>

<script>
    import Destination from "../../components/card/Destination";

    export default {
        name: "AddressPage",
        components: {Destination},
        async asyncData({params, $api, query, store}) {
            let res = await $api.address.get(params.id);
            let queries = {
                page_size: 9,
                address: res.id,
                page: query.page ? Number.parseInt(query.page) : 1
            };
            let activityRes = await $api.activity.list(queries);
            res.address_components = res.address_components ? res.address_components.reverse() : [];
            store.commit('config/SET_TARGET', res);
            store.commit('config/SET_TARGET_MODEL', 'address');
            return {
                address: res,
                activityRes,
                queries
            }
        },
        data() {
            return {
                hidden: false
            }
        },
        watchQuery: true,
        head() {
            return {
                title: this.address["formatted_address"]
            }
        },
        mounted() {
            this.toTop();
        }
    }
</script>

<style lang="scss">
</style>
