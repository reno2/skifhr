<template>
    <div class="about">
        <h1>All todos by logged user</h1>
        <div class="container">
            <ul>
                <li v-for="(i, el ) in todos">
                    <div
                        class="item"
                    >{{el+1}}. Сумма: {{i.amount}}; Дата: {{i.createdAt}}; Название: {{i.name}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'listData',
    data() {
        return {
            todos: []
        };
    },
    methods: {},
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    created() {
        if (!this.$store.getters.loggedIn) {
            this.$router.push({ name: 'home' });
        } else {
            this.$store
                .dispatch('getUserTodos')
                .then(listData => {
                    // console.log(listData.data.trans_token);
                    this.todos = listData.data.trans_token;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style>
.container {
    max-width: 600px;
    margin: 0 auto;
}
li {
    text-align: left;
    list-style-type: none;
}
</style>