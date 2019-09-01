<template>
    <div class="about">
        <h1>All todos by logged user</h1>
        <div class="container">
            <transition-group
                name="component-fade"
                mode="out-in"
                duration-enter="1.5"
                duration-leave="2"
            >
                <list-item v-for="todo in todos" :key="todo.id" :todo="todo"></list-item>
            </transition-group>
        </div>
    </div>
</template>
<script>
import ListItem from './ListItem';
export default {
    name: 'listData',
    components: {
        ListItem
    },
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

.fade-enter {
    opacity: 0;
    transform: translateY(40px);
}

.fade-enter-to {
    transition: opacity 25s;

    transform: translateY(0px);
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 4s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>