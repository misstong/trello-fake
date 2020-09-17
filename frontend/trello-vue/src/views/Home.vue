<template>
    <div id='home'>
        <t-header></t-header>
        <main >
            <h2>
                <span class="icon icon-board"></span>
                我的看板
            </h2>
            <ul class="board-items">
                <router-link class="board-item" 
                    v-for="board of boards"
                    :key="board.id"
                    tag="li"
                    :to="{name: 'Board', params: {id: board.id}}">
                    <span class="title">{{board.name}}</span>    
                </router-link>
                <li class="board-item create-new-board">
                    <textarea class="title form-field-input" placeholder="创建新看板" ref='newBoardName' @blur="postBoard"></textarea>
                </li>
            </ul>
        </main>
    </div>
    
</template>
<style scoped>
#home main h2 .icon{
    color: #0079bf;
    font-size: 1em;
}
.form-field-input:focus {
    background: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
}
#home main h2{
    height: 32px;
    line-height: 32px;
}

#home main{
    margin: 10px;
    flex-grow: 1;
}
#home .board-item {
    width: 300px;
    height: 200px;
    box-sizing: border-box;
    background: rgb(0, 121, 191);
    cursor: pointer;
    margin: 10px;
}
#home .board-item .title {
    margin: 20px;
    height: 160px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    display: inline-block;

    width: 100%;
    margin-left: 0;
    line-height: 160px;
    text-align: center;
}

 #home .create-new-board {
    background-color: rgba(9,30,66,.04);
}

.form-field-input {
    display: block;
    margin: -4px 0;
    padding: 4px 8px;
    resize: none;
    border: none;
    border-radius: 3px;
    outline: none;
    width: 100%;
    height: 28px;
    min-height: 20px;
    max-height: 256px;
    background: transparent;
    box-sizing: border-box;
    box-shadow: none;
    cursor: pointer;
    color: #172b4d;
    line-height: 20px;
    font-size: 16px;
    font-weight: 600;
    transition: .3s ease;
}
#home .create-new-board .title {
    color: #172b4d;
}

/*
#home .create-new-board .title {
    margin-left: 0;
    color: #172b4d;
    width: 100%;
    text-align: center;
    line-height: 160px;
} */

#home .board-items {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
}
</style>

<script>
import THeader from '@/components/THeader'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        THeader
    },
    computed: mapState('board', {
        boards: state => state.boards,
        inited: state => state.inited
    }),
    created(){
        if (!this.inited) {
            this.$store.dispatch('board/getBoards')
        }
    },
    methods: {
        async postBoard(){
            let val = this.$refs.newBoardName.value;

            if (val.trim() !== '') {
                try {
                    await this.$store.dispatch('board/postBoard', {name: val})
                    this.$message.success('面板创建成功')
                } catch (error) {
                    console.log('')
                }
                
            }
        }
    }

}
</script>