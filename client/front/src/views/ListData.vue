<template>
    <div class="about">
        <h1>All todos by logged user</h1>
        <el-col :span="10" :offset="8">
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="Please input" v-model="datafiltername"></el-input>
                </el-col>
                <el-select v-model="value" placeholder="Select" :span="8">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-row>
        </el-col>
        <div class="container">
            <!-- <transition-group
                name="component-fade"
                mode="out-in"
                duration-enter="1.5"
                duration-leave="2"
            >-->
            <list-item v-for="todo in methosFilterName" :key="todo.id" :todo="todo"></list-item>
            <!-- </transition-group> -->
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
            datafiltername: '',
            todos: []
        };
    },
    methods: {},
    computed: {
        dynamicTodos() {
            return this.todos;
        },
        methosFilterName() {
            let todos = this.todos;
            if (this.datafiltername) {
                todos = todos.filter(el => {
                    return el.name.includes(this.datafiltername);
                    // return el.name.indexOf(this.datafiltername) >= 0;
                });
            }
            return todos;
            //console.log(this.datafiltername);
        },
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
<style scoped>
.el-input {
    margin-bottom: 20px;
}
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