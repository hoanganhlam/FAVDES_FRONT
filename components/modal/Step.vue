<template>
    <div class="container small">
        <div class="card-modal">
            <header class="modal-card-head">
                <div class="level modal-card-title is-mobile">
                    <div class="level-left">
                        <div class="button is-text" @click="handleBack">
                            <b-icon size="is-small" icon="arrow-left"></b-icon>
                            <span>back</span>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="buttons">
                            <div class="button is-text" @click="handleSave">Save</div>
                            <div class="button is-text" @click="handleDelete()">
                                <b-icon size="is-small" icon="delete"></b-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section class="modal-card-body">
                <div class="container small">
                    <ce elm="h1" :editable="true" placeholder="Untitled" class="title is-2" v-model="data.title"></ce>
                    <div class="properties">
                        <div class="notification">
                            <div class="media">
                                <div class="media-left">
                                    <b-icon icon="lightbulb"></b-icon>
                                </div>
                                <div class="media-content"><b>Tips</b>: add destination and date to estimate distance and time</div>
                            </div>
                        </div>
                        <div class="columns is-gapless is-mobile">
                            <div class="column is-3 v-center">
                                <b-icon size="is-small" icon="calendar"></b-icon>
                                <span>Date</span>
                            </div>
                            <div class="column is-8">
                                <b-datetimepicker rounded placeholder="Click to select..."
                                                  v-model="data.start_time"></b-datetimepicker>
                            </div>
                        </div>
                        <div class="columns is-gapless is-mobile">
                            <div class="column is-3 v-center">
                                <b-icon size="is-small" icon="clock-outline"></b-icon>
                                <span>Duration</span>
                            </div>
                            <div class="column">
                                <b-timepicker
                                    v-model="duration"
                                    placeholder="Type or select..."
                                    :incrementMinutes="minutesGranularity"
                                    :incrementHours="hoursGranularity"
                                    editable>
                                </b-timepicker>
                            </div>
                        </div>
                        <div class="columns is-gapless is-mobile">
                            <div class="column is-3 v-center">
                                <b-icon size="is-small" icon="map-marker"></b-icon>
                                <span>Place</span>
                            </div>
                            <div class="column is-8">
                                <data-select
                                    :multiple="false"
                                    field="title"
                                    v-model="data.destination" :icon="null"
                                    :allow-new="true"
                                    placeholder="Destination"
                                    require-modify
                                    module="destination"/>
                            </div>
                        </div>
                        <div class="columns is-gapless is-mobile">
                            <div class="column is-3 v-center">
                                <b-icon size="is-small" icon="link"></b-icon>
                                <span>Link</span>
                            </div>
                            <div class="column is-8">
                                <b-input v-model="data.options.link" placeholder="Somewhere"></b-input>
                            </div>
                        </div>
                    </div>
                    <ce elm="p" :editable="true" placeholder="Note" class="" v-model="data.note"></ce>
                </div>
            </section>
            <footer class="modal-card-foot">
            </footer>
        </div>
    </div>
</template>

<script>
    const DEFAULT = {
        title: null,
        note: null,
        destination: null,
        schedule: null,
        start_time: null,
        end_time: null,
        options: {}
    }
    export default {
        name: "Step",
        props: {
            value: {},
            schedule: {
                type: Object,
                default: null
            }
        },
        data() {
            let duration = null
            if (this.value.start_time && this.value.end_time) {
                let  diff =(new Date(this.value.end_time).getTime() - new Date(this.value.start_time).getTime()) / 1000;
                diff /= 60;
                duration = new Date("July 1, 2020")
                duration.setMinutes(Math.abs(Math.round(diff)))
            }
            return {
                data: this.value ? this.value : DEFAULT,
                duration,
                loading: false,
                minutesGranularity: 15,
                hoursGranularity: 1
            }
        },
        methods: {
            handleBack() {
                if (!this.valid()) {
                    this.handleDelete()
                } else {
                    this.$parent.close()
                }
            },
            async handleSave() {
                if (!this.valid()) return
                if (this.schedule && this.schedule.id && this.currentUser) {
                    this.loading = true
                    if (this.data.id) {
                        await this.$api.task.update(this.data.id, {
                            ...this.cleanData(this.data)
                        })
                    } else {
                        await this.$api.task.post({
                            ...this.cleanData(this.data),
                            schedule: this.schedule.id
                        })
                    }
                    this.loading = false
                }
                this.$emit('save', this.data)
            },
            async handleDelete() {
                if (this.currentUser && this.data.id) {
                    await this.$api.task.delete(this.data.id)
                }
                this.$emit('delete', this.data)
                this.$parent.close()
            },
            valid() {
                let check = true
                if ([null, ''].includes(this.data.title)) {
                    check = false
                }
                return check
            }
        },
        watch: {
            data: {
                deep: true,
                handler() {
                    this.$emit('input', this.data)
                }
            },
            value() {
                this.data = this.value
            },
            duration() {
                if (this.duration && this.data.start_time) {
                    const h = this.duration.getHours()
                    const m = this.duration.getMinutes()
                    this.data.end_time = new Date(this.data.start_time.getTime() + h * 60 + m * 60000)
                }
            }
        }
    }
</script>

<style lang="scss">
    .properties {
        margin-bottom: 1rem;

        .columns.is-gapless {
            margin-bottom: .5rem;

            .is-3 {
                .icon {
                    margin-right: .5rem;
                }
            }

            .taginput-container,
            .input {
                border: 0;
            }
        }
    }

    .v-center {
        display: flex;
        align-items: center;
    }
</style>
