<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>name: {{todo.name}}</span>
                <el-button
                    @click="removeItem(todo._id, this)"
                    style="float: right;"
                    type="danger"
                    icon="el-icon-delete"
                    ref="target"
                    circle
                ></el-button>
                <el-button style="display:none;float: right; padding: 3px 0" type="text">Удалить</el-button>
            </div>
            <div class="todo-content">
                <div class="todo-content__item todoc">
                    <div class="todoc__l">amount:</div>
                    <div class="todoc__r">{{todo.amount}}</div>
                </div>
                <div class="todo-content__item todoc">
                    <div class="todoc__l">created date:</div>
                    <div class="todoc__r">{{todo.createdAt| moment("DD.MM.YYYY HH:mm")}}</div>
                </div>
                <div class="todo-content__item todoc">
                    <div class="todoc__l">category</div>
                    <div class="todoc__r">{{todo.category}}</div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'list-Item',
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {};
    },
    methods: {
        removeItem(el, t) {
            console.log(this.$el);
            this.$store
                .dispatch('removeItem', { id: el })
                .then(res => {
                    console.log(this);
                    this.$el.remove();
                    //this.$el.classList.add('hide');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    created() {}
};
</script>
<style lang="scss">
/* .hide {
    transition: all 100ms;
    opacity: 0;
} */
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
    transition: opacity 2s;

    transform: translateY(0px);
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 200ms ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
.todoc {
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    .todoc__l {
        font-weight: 900;
    }
}
</style>