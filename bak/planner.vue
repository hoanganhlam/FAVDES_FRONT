<template>
    <div>
        <NuxtChild></NuxtChild>
    </div>
</template>

<script>
    export default {
        name: "planner",
        data() {
            return {}
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
        }

        .title[contenteditable=true] {
        }

        .schedule {
            margin-top: 2rem;

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

            .banner-control {
                opacity: 0;
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                border-radius: 0;
                margin-left: unset;
            }

            &:hover {
                .banner-control {
                    opacity: 1;
                    transition: opacity 0.5s, visibility 0.5s;
                }
            }
        }
    }

    .subheader {
        padding: .5rem 0;
        background: whitesmoke;

        .button,
        .switch {
            margin-right: 1rem;
            font-size: 14px;
        }
    }

    [contenteditable][placeholder]:empty:before {
        content: attr(placeholder);
        color: #DDDDDD;
    }
</style>
