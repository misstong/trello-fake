<template>
    <div class="list-wrap list-wrap-content" :data-order="data.order">
        <div class="list-placeholder" ref="listPlaceholder"></div>
        <div class="list" ref="list">
            <div class="list-header" ref="listHeader">
                <textarea class="form-field-input" ref="newBoardListName" :value="data.name" @mousedown.prevent @blur="editListName"></textarea>
                <div class="extras-menu" @mousedown.self.prevent>
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
/* .list-wrap.list-placeholder {
    display: none;
} */
.list-wrap .list-placeholder {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0;
    background-color: rgba(0,0,0,.12);
    border-radius: 3px;
}
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
    position: relative;
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
            listAdding: false,
            drag: {
                    isDown: false,
                    isDrag: false,
                    downClientX: 0,
                    downClientY: 0,
                    downElementX: 0,
                    downElementY: 0
                },
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
    mounted(){
        // console.log(this.dragDown)
        console.log('dragstart',this)//dragStart函数在_events里
        this.$refs.listHeader.addEventListener('mousedown', this.dragDown)
        document.addEventListener('mousemove', this.dragMove);
            document.addEventListener('mouseup', this.dragUp);
    },
    methods: {
        dragDown(e){
            console.log('mousedown',e)
            this.drag.isDown = true
            this.drag.downClientX = e.clientX;
            this.drag.downClientY = e.clientY;

            const el = this.$refs.list
            let pos = el.getBoundingClientRect();
            this.drag.downElementX = pos.x 
            this.drag.downElementY = pos.y
            console.log(pos)
        },
        dragMove(e){
            if(this.drag.isDown){
                let listElement = this.$refs.list
                let x = e.clientX - this.drag.downClientX
                let y = e.clientY - this.drag.downClientY

                if (x > 10 || y > 10) {
                    if (!this.drag.isDrag) {
                        this.drag.isDrag = true
                        
                        this.$refs.listPlaceholder.style.height = listElement.offsetHeight + 'px';
                        listElement.style.position = "absolute"
                        listElement.style.zIndex = 99999;
                        listElement.style.transform = 'rotate(5deg)';
                        document.body.appendChild(listElement);//因为父元素是list设了position:relative,拖拽中元素是absolute于body所以加到document中
                    
                        this.$emit('dragStart', {
                            component: this
                        })
                    }
                    listElement.style.left = this.drag.downElementX + x + 'px';
                    listElement.style.top = this.drag.downElementY + y + 'px';

                    this.$emit('dragMove',{
                        component: this,
                        x: e.clientX,
                        y: e.clientY
                    })
                }

            }
        },
        dragUp(e){//移动过程中里面的listElement会更换父节点，外面的list元素会在前后移动，移完后放回原父节点
            if(this.drag.isDown) {
                if(this.drag.isDrag) {
                    let listElement = this.$refs.list;
                    this.$refs.listPlaceholder.style.height = 0;
                    listElement.style.position = 'relative';
                        listElement.style.zIndex = 0;
                        listElement.style.left = 0;
                        listElement.style.top = 0;
                        listElement.style.transform = 'rotate(0deg)';
                    this.$el.appendChild(listElement);
                    this.$emit('dragEnd', {
                            component: this
                        });
                }else {
                        if (e.path.includes(this.$refs.newBoardListName)) {
                            this.$refs.newBoardListName.select();
                        }
                    }
                this.drag.isDown = this.drag.isDrag = false;
            }

        },
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