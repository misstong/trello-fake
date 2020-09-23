<template>
    <div class="list-wrap list-wrap-content">

        <div class="list">
            <div class="list-header">
                <textarea class="form-field-input" ref="newBoardListName" :value="data.name" @blur="editListName"></textarea>
                <div class="extras-menu">
                    <span class="icon icon-more"></span>
                </div>
            </div>
            <div class="list-cards">
                <t-card v-for="card of cards" :key="card.id" :data="card" :boardId="data.boardId"></t-card>
            </div>
            <div class="list-footer" :class="{'list-adding': listAdding}">
                <div class="list-card-add" @click="showListCardAddForm">
                    <span class="icon icon-add"></span>
                    <span>添加另一张卡片</span>
                </div>
                <div class="list-card-add-form">
                    <textarea class="form-field-input" placeholder="为这张卡片添加标题……" ref="newListName"></textarea>
                </div>
                <div class="list-add-confirm">
                    <button class="btn btn-success" @click="addNewCard">添加卡片</button>
                    <span class="icon icon-close" @click="hideListCardAddForm"></span>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
.form-field-input{
    background: transparent;
    resize: none;
    display: block;
    margin: -4px 0;
    padding: 4px 8px;
    outline: none;
    color: #172b4d;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    box-sizing: border-box;
    border: none;
    border-radius: 3px;
    width: 100%;
    height: 28px;
}
.form-field-input:focus {
    background: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
}
.list-wrap {
    width:300px ;
    border-radius: 3px;
    box-sizing: border-box;
    display: inline-block;
    margin: 0 4px;
}
.list-header{
    padding: 10px 36px 10px 8px;
}
.list {
    position: relative;
    background: #ebecf0;
}
.list-header .extras-menu{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
}
.list-header .extras-menu .icon-more {
    color: #6b778c;
}
.list-header .extras-menu .icon-more:hover {
    background-color: rgba(9,30,66,.08);
    color: #172b4d;
}
.icon-close:hover{
    cursor: pointer;
}
.list-card-add {
    line-height: 32px;
    text-decoration: none;
    color: #5e6c84;
    border-radius: 3px;
    padding: 0 8px 0 0;
    cursor: pointer;
}
.list-card-add .icon {
    color: #5e6c84;
}
.list-add-confirm{
    line-height: 32px;
    padding: 5px;
    display: none;
}
.list-add-confirm .btn{
    margin: 0;
}
.list-card-add-form{
    padding: 0 4px;
    display: none;
}
.list-card-add-form .form-field-input {
    font-weight: normal;
    background: #fff;
}
.list-card-add-form textarea {
    margin: 0;
    padding: 8px;
    height: 54px;
}
.list-adding .list-card-add-form,.list-adding .list-add-confirm {
    display: block;
}
.list-adding .list-card-add{
    display: none;
}
.list-cards{
    margin: 0 4px;
    padding: 0 4px;
     overflow-y: auto;
    overflow-x: hidden;
}

</style>
<script>
import TCard from './TCard'
export default {
    name:'TList',
    components: {
        TCard
    },
    props: {
        data: {
            type: Object
        }
    },
    data(){
        return {
            listAdding: false
        }
    },
    computed: {
        cards() {
            return this.$store.getters['card/getCards'](this.data.id);
        }
    },

    async created() {
        if (!this.cards.length) {
            await this.$store.dispatch('card/getCards', this.data.id);
        }
    },
    methods: {
       async editListName() {
            let {value} = this.$refs.newBoardListName;
            console.log('innerhtml', this.$refs.newBoardListName)
            console.log(this.data.name)
            if(value!==this.data.name){
                await this.$store.dispatch('list/editList', {
                    boardId: this.data.boardId,
                    id: this.data.id,
                    name: value
                })
            }
        },
        hideListCardAddForm(){
            this.listAdding = false
            this.$refs.newListName.value = '';
        },
        showListCardAddForm() {
            this.listAdding = true
            this.$nextTick(()=>{
                this.$refs.newListName.focus()
            })
        },
        addNewCard() {
                let {value} = this.$refs.newListName;

                if (value.trim() !== '') {
                    try {
                        this.$store.dispatch('card/postCard', {
                            boardListId: this.data.id,
                            name: value
                        });

                        this.$message.success('添加成功');

                        this.listAdding = false;
                    } catch (e) {console.log('')}
                } else {
                    this.$refs.newListName.focus();
                }
            }
    }
}
</script>