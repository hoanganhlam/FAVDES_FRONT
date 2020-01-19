<template>
    <div class="hero">
        <div class="hero-body">
            <div class="container">
                <span class="title is-2" v-if="error.statusCode === 404">404</span>
                <h1 class="title is-1" v-else>An error occurred</h1>
                <nuxt-link to="/">Home page</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['error'],
    }
</script>
