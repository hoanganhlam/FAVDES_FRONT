<template>
    <div class="posts">
        <div class="level is-mobile">
            <div class="level-left">
                <slot></slot>
            </div>
            <div class="level-right">
                <b-pagination
                    simple
                    :total="data.count"
                    :current.sync="queries.page"
                    :per-page="q.page_size || 9">
                    <b-pagination-button
                        slot-scope="props"
                        :page="props.page"
                        :id="`page${props.page.number}`"
                        tag="router-link"
                        :href="`?page=${props.page.number}`"
                        :to="`?page=${props.page.number}`">
                        {{props.page.number}}
                    </b-pagination-button>
                    <b-pagination-button
                        slot="previous"
                        slot-scope="props"
                        :page="props.page"
                        tag="router-link"
                        :href="`?page=${props.page.number}`"
                        :to="`?page=${props.page.number}`">
                        Previous
                    </b-pagination-button>
                    <b-pagination-button
                        slot="next"
                        slot-scope="props"
                        :page="props.page"
                        tag="router-link"
                        :href="`?page=${props.page.number}`"
                        :to="`?page=${props.page.number}`">
                        Next
                    </b-pagination-button>
                </b-pagination>
            </div>
        </div>
        <div v-if="!loading">
            <div class="columns is-multiline">
                <div v-if="part1.length" class="column is-6">
                    <div class="columns is-multiline">
                        <div class="column is-12" v-for="a in part1" :key="a.id">
                            <activity layout="square" :value="a"/>
                        </div>
                    </div>
                </div>
                <div v-if="part2.length" class="column is-6">
                    <div class="columns is-multiline">
                        <div class="column is-6" v-for="a in part2" :key="a.id">
                            <activity layout="square" :value="a"/>
                        </div>
                    </div>
                </div>
                <div v-if="part3.length" class="column is-12">
                    <div class="columns is-multiline">
                        <div class="column is-3" v-for="a in part3" :key="a.id">
                            <activity layout="square" :value="a"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container small" v-if="data.count">
                <b-pagination
                    :total="data.count"
                    :current.sync="queries.page"
                    :per-page="q.page_size || 9">
                    <b-pagination-button
                        slot-scope="props"
                        :page="props.page"
                        :id="`page${props.page.number}`"
                        tag="router-link"
                        :href="`?page=${props.page.number}`"
                        :to="`?page=${props.page.number}`">
                        {{props.page.number}}
                    </b-pagination-button>
                    <b-pagination-button
                        slot="previous"
                        slot-scope="props"
                        :page="props.page"
                        tag="router-link"
                        :href="`?page=${props.page.number}`"
                        :to="`?page=${props.page.number}`">
                        Previous
                    </b-pagination-button>
                    <b-pagination-button
                        slot="next"
                        slot-scope="props"
                        :page="props.page"
                        tag="router-link"
                        :href="`?page=${props.page.number}`"
                        :to="`?page=${props.page.number}`">
                        Next
                    </b-pagination-button>
                </b-pagination>
            </div>
        </div>
        <div v-else>
            <div class="columns is-multiline">
                <div class="column is-6">
                    <div class="columns is-multiline">
                        <div class="column is-12" v-for="a in 1" :key="a">
                            <div class="card post layout-square">
                                <div class="card-image">
                                    <div class="image is-1by1">
                                        <b-skeleton :rounded="false" height="100%"></b-skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-6">
                    <div class="columns is-multiline">
                        <div class="column is-6" v-for="a in 4" :key="a">
                            <div class="card post layout-square">
                                <div class="card-image">
                                    <div class="image is-1by1">
                                        <b-skeleton :rounded="false" height="100%"></b-skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-12">
                    <div class="columns is-multiline">
                        <div class="column is-3" v-for="a in 4" :key="a">
                            <div class="card post layout-square">
                                <div class="card-image">
                                    <div class="image is-1by1">
                                        <b-skeleton :rounded="false" height="100%"></b-skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        props: {
            q: {
                type: Object,
                default: () => {
                    return {
                        page_size: 9,
                        page: 1
                    }
                }
            },
            value: {
                type: Object,
                default: () => {
                    return {
                        results: [],
                        count: 0
                    }
                }
            }
        },
        data() {
            return {
                data: this.value,
                queries: this.q,
                loading: false,
                part1: [],
                part2: [],
                part3: []
            }
        },
        methods: {
            async fetch(page) {
                this.loading = true;
                this.queries.page = page;
                this.data = await this.$api.activity.list(this.queries);
                this.partials();
                this.loading = false;
            },
            partials() {
                function clone(obj) {
                    if (null == obj || "object" != typeof obj) return obj;
                    const copy = obj.constructor();
                    for (const attr in obj) {
                        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                    }
                    return copy;
                }

                let data = this.data.results ? this.data.results : [];
                const subarray = function (start, end) {
                    if (!end) {
                        end = data.length;
                    }
                    const newArray = clone(data);
                    return newArray.slice(start, end);
                };
                this.part1 = subarray(0, 1);
                this.part2 = subarray(1, 5);
                this.part3 = subarray(5, 9);
            }
        },
        watch: {
            $route() {
                let page = Number.parseInt(this.$route.query.page) || 1;
                this.fetch(page);
            }
        },
        created() {
            this.partials();
        }
    }
</script>

<style scoped>

</style>
