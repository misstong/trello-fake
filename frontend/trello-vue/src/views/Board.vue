<template>
    <div id='board'>
        <t-header></t-header>
        <main v-if="board">
            <!-- <div> </div> -->
            <h2>{{board.name}}</h2>
            <div class="board">
                <t-list :key="list.id"
                    v-for="list of lists"
                    :data="list"
                   
                    ></t-list>
 <!-- @dragStart="dragStart"
                    @dragMove="dragMove"
                    @dragEnd="dragEnd" -->
                <div class="list-wrap no-content" :class="{'list-adding': listAdding}"> 
                    <div class="list-add" @click="showListAdding">
                        <span class="icon icon-add"></span>
                        <span>添加另一个列表</span>
                    </div>

                    <div class="list">                
                        <div class="list-card-add-form">
                            <input class="form-field-input" ref="newListName" placeholder="为这张卡片添加标题..."/>
                        </div>
                        <div class="list-add-confirm">  
                            <button class="btn btn-success" @click="addNewList">添加列表</button>
                            <span class="icon icon-close" @click="hideListAdding"></span>
                        </div>
                    </div>
                </div>

                
            </div>
        </main>
        <router-view></router-view>
    </div>
    

</template>
<style scoped>
#board {
  width: 100%;
  height: 100%;
  /* display: flex;
  flex-direction: column; */
  overflow: hidden;
}

#board main{
    background: rgb(0, 121, 191);
    width: 100%;
    height: 100%;
    padding: 10px;
}

#board main h2 {
    height: 32px;
    line-height: 32px;
    color: white;
}

.board{
    display: flex;
}

.list-wrap {
    width:300px ;
}

.list-add{
    padding: 4px 10px;
    background: hsla(0,0%,100%,.24);
    border-radius: 3px;
    line-height: 32px;
    color: white;
    cursor: pointer;
}
.list-add:hover {
    background-color: hsla(0,0%,100%,.32);
}
.no-content .list{
    display: none;
}
.no-content.list-adding .list{
    display: block;
}
.list-adding .list-add{
    display: none;
}
.list-card-add-form .form-field-input {
    font-weight: normal;
    background: #fff;
    border-radius: 3px;
    overflow: scroll;
}
.list-card-add-form{
    margin: 5px;
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
.list {
    background: #ebecf0;
    padding: 5px 5px 3px;
    border-radius: 3px;
}
.list-add-confirm{
    line-height: 20px;
    margin: 10px 3px 3px;
}
.list-add-confirm .btn {
    margin-bottom: 0;
}
</style>

<script>
import THeader from '@/components/THeader'
import TList from '@/components/TList'
export default {
    name: 'board',
    components: {
        THeader,
        TList
    },
     data() {
            return {
                listAdding: false
            }
        },
    computed: {
        board() {
            return this.$store.getters['board/getBoard'](this.$route.params.id)
        },
        lists(){
            return this.$store.getters['list/getLists'](this.$route.params.id)
        }
    },
    created() {
        if(!this.board){
            this.$store.dispatch('board/getBoard', this.$route.params.id);
        }
        if(!this.lists.length) {
            this.$store.dispatch('list/getLists', this.$route.params.id)
        }
    },
    methods: {
        hideListAdding() {
            this.listAdding = false
        },

        showListAdding() {
            this.listAdding = true
            this.$nextTick(()=>{
                this.$refs.newListName.focus()
            })
        },
        async addNewList() {
            const name = this.$refs.newListName.value.trim()
            if(name) {
                try{
                     await this.$store.dispatch('list/postList',{name,boardId: this.board.id})
                     
                    this.$message.success('提交成功')
                    this.$refs.newListName.value=''
                    this.listAdding=false
                    // this.$store.dispatch('list/test')
                    // console.log('afger')

                } catch(e){
                    console.log('')
                }
                
            }else{
                this.$refs.newListName.focus()
            }
        }
    }
}
</script>