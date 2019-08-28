<template>
    <div id="app">
        <div id="nav">
            <div class="nav__section">
                <router-link to="/">Home</router-link>

                <router-link v-if="!loggedIn" to="/singin">Singin</router-link>
                <router-link v-if="!loggedIn" to="/login">Login</router-link>
                <router-link v-if="loggedIn" to="/logout">Logout</router-link>
                <router-link v-if="loggedIn" to="/add">Add Data</router-link>
                <router-link v-if="loggedIn" to="/listdata">List data</router-link>
                <router-link v-if="loggedIn" to="/user-info">User info</router-link>
            </div>
        </div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {};
    },
    methods: {},
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    created() {
        console.log(this.loggedIn);
    }
};
</script>
<style lang="scss">
body {
    margin: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px 0;
    background: #eee;
    display: flex;
    justify-content: flex-end;
    .nav__section {
        display: flex;
        justify-content: space-evenly;
        width: 500px;
        a {
            font-weight: bold;
            color: #2c3e50;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 14px;
            border-bottom: 1px solid transparent;
            &.router-link-exact-active {
                color: #42b983;
            }
            &:hover {
                border-bottom: 1px solid #333;
            }
        }
    }
}
</style>
