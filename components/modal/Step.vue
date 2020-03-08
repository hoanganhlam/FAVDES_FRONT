<template>
    <div class="container small">
        <div class="card-modal">
            <header class="modal-card-head">
                <div class="level modal-card-title">
                    <div class="level-left">
                        <div class="button is-text" @click="$parent.close()">
                            <b-icon size="is-small" icon="arrow-left"></b-icon>
                            <span>back</span>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="buttons">
                            <div class="button is-text" @click="$parent.close()">Save</div>
                        </div>
                    </div>
                </div>
            </header>
            <section class="modal-card-body">
                <div class="container small">
                    <h1 class="title is-2" placeholder="Untitled" contenteditable></h1>
                    <div class="properties">
                        <div class="columns is-gapless">
                            <div class="column is-3 v-center">
                                <b-icon size="is-small" icon="calendar"></b-icon>
                                <span>Date</span>
                            </div>
                            <div class="column is-8">
                                <b-datetimepicker rounded placeholder="Click to select..."></b-datetimepicker>
                            </div>
                        </div>
                        <div class="columns is-gapless ">
                            <div class="column is-3 v-center">
                                <b-icon size="is-small" icon="map-marker"></b-icon>
                                <span>Place</span>
                            </div>
                            <div class="column is-8">
                                <b-input placeholder="Somewhere"></b-input>
                            </div>
                        </div>
                        <div class="columns is-gapless ">
                            <div class="column is-3 v-center">
                                <b-icon size="is-small" icon="link"></b-icon>
                                <span>Link</span>
                            </div>
                            <div class="column is-8">
                                <b-input placeholder="Somewhere"></b-input>
                            </div>
                        </div>
                    </div>
                    <div class="description" contenteditable placeholder="Note"></div>
                </div>
            </section>
            <footer class="modal-card-foot">
            </footer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Step"
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
