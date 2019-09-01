<template>
    <div class="home">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <img alt="Vue logo" src="../assets/logo.png" />
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="search trans">
                        <el-input v-model="searchString" placeholder="Approved by"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-search" @click="findItem">Find</el-button>
                    </el-form-item>
                </el-form>

                <list-search-results :results="this.searchResults"></list-search-results>
                <HelloWorld msg="Simple vue api" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from '@/components/HelloWorld.vue';
import ListSearchResults from './ListSearchResults';

export default {
    name: 'home',
    data() {
        return {
            searchString: '',
            searchResults: []
        };
    },
    components: {
        HelloWorld,
        ListSearchResults
    },
    computed: {
        searchData() {
            return this.searchResults;
        }
    },
    methods: {
        findItem() {
            if (this.$store.getters.loggedIn) {
                if (this.searchString.length > 0) {
                    this.$store
                        .dispatch('simpleTransSearch', {
                            string: this.searchString
                        })
                        .then(token => {
                            console.log(token.data.data.length);
                            if (token.data.data.length > 0) {
                                console.log(token.data);
                                this.searchResults = token.data.data;
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            alert(err.data);
                        });
                } else {
                    alert('nothing to search');
                }
            } else {
                this.$router.push({ name: 'login' });
            }
        }
    }
};
</script>
<style scoped>
.serche {
    width: 100%;
    padding: 10px 18px;
}
</style>
