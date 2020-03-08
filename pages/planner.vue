<template>
    <div>
        <NuxtChild></NuxtChild>
    </div>
</template>

<script>
    export default {
        name: "planner",
        data() {
            return {
                options: {
                    sections: []
                },
                dates: [],
                active: null,
                showSetting: false,
                showStep: false
            }
        }
    }
</script>

<style lang="scss">
    .planner {
        margin-bottom: 3rem;

        .button.is-text {
            margin-left: -0.75rem;
        }

        .banner {
            max-height: 250px;
            overflow: hidden;
        }

        .content {
            padding: 1.5rem 1rem 1rem;

            .widget_title {
                font-size: 1rem;
            }
        }

        .title[contenteditable=true] {
        }

        .description {
            margin-bottom: 1.5rem;
        }

        .schedule {
            .level {
            }

            .step {
                box-shadow: 0 0 5px 1px #EEE;

                h4 {
                    margin-bottom: 0;
                    font-size: 1rem;
                }
            }
        }

        .has-banner {
            position: relative;

            .button.is-text {
                position: absolute;
                bottom: 0;
                left: 0;
                border-radius: 0;
                margin-left: unset;
            }
        }
    }

    .subheader {
        .navbar {
            background-color: unset;
        }
    }

    [contenteditable][placeholder]:empty:before {
        content: attr(placeholder);
        color: #DDDDDD;
    }

    .value {

    }
</style>
