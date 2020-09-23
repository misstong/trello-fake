<template>
    <div class="window-overlay" style="display: block" v-if="list && card">
        <div class="popup">
            <div class="popup-header">
                <div class="popup-title">
                    <div class="popup-title-icon">
                        <span class="icon icon-card"></span>
                    </div>
                    <div class="popup-title-text">
                        <textarea class="form-field-input" @blur="editCardName" :value="card.name"></textarea>
                    </div>
                    <div class="popup-title-detail">
                        在列表 {{list.name}} 中
                    </div>
                </div>
                <div class="popup-header-close">
                    <i class="icon icon-close" @click="$router.back()"></i>
                </div>
            </div>
            <div class="popup-content">
                <div class="window-module">
                    <div class="title">
                        <div class="title-icon">
                            <span class="icon icon-description"></span>
                        </div>
                        <div class="title-text">
                            <h3>描述</h3>
                            <button class="btn btn-edit">编辑</button>
                        </div>
                    </div>
                    <p class="description">
                        <textarea class="form-field-input" @blur="editCardDescription" :value="card.description"></textarea>
                    </p>
                </div>

                <div class="window-module">
                    <div class="title">
                        <div class="title-icon">
                            <i class="icon icon-attachment"></i>
                        </div>
                        <div class="title-text">
                            <h3>附件</h3>
                        </div>
                    </div>
                    <ul class="attachments" v-if="Array.isArray(card.attachments)">
                        <li class="attachment" v-for="attachment of card.attachments" :key="attachment.id">
                            <div class="attachment-thumbnail" :style="`background-image: url(${server.staticPath}${attachment.path})`"></div>
                            <p class="attachment-detail">
                                <span class="attachment-thumbnail-name"><strong>{{attachment.detail.name}}</strong></span>
                                <span class="attachment-thumbnail-descriptions">
                                    <span class="datetime">
                                        {{attachment.createdAt | dateTime}}
                                    </span>
                                    <span> - </span>
                                    <u @click="removeAttachment(attachment.id)">删除</u>
                                </span>
                                <span class="attachment-thumbnail-operation">
                                    <i class="icon icon-card-cover"></i>
                                    <u v-if="attachment.isCover" >移除封面</u>
                                    <u v-else @click="setCover(attachment.id)">设为封面</u>
                                </span>
                            </p>
                        </li>
                    </ul>
                    <div>
                        <button class="btn btn-edit" @click="$refs.attachment.click()">添加附件</button>
                        <input type="file" ref="attachment" style="display: none" @change="uploadAttachment">
                    </div>
                </div>
                <div class="window-module">
                    <div class="title">
                        <div class="title-icon">
                            <i class="icon icon-activity"></i>
                        </div>
                        <div class="title-text">
                            <h3>评论</h3>
                        </div>
                    </div>
                    <t-comment :card-id="card.id"></t-comment>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.attachment-thumbnail-operation .icon-card-cover{
    height: 20px;
    width: 20px;
    line-height: 20px;
}
.attachment-thumbnail-operation{
    margin: 5px 0;
}
.attachment-thumbnail{
    height: 80px;
    width: 112px;
    background-color: rgba(9,30,66,.04);
    margin-right: 10px;
}
.attachment{
    display: flex;
    margin: 10px 0;
}
.attachment-detail{
    display: flex;
    flex-direction: column;
}
.window-overlay .popup-header {
    text-align: left;
}
.window-overlay .popup {
    left: 50%;
    transform: translateX(-50%);
    margin: 48px 0 80px;
    min-width: 768px;
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
.popup-header {
    position: relative;
    margin: 8px 0;
    text-align: center;
}
.window-overlay .popup-title-icon {
    position: absolute;
    top: 0;
    left: 0;
}
.popup-header-close {
    position: absolute;
    top: -8px;
    right: 0;
    padding: 5px 12px 10px 8px;
}
.popup-header-close .icon {
    color: #6b778c;
    cursor: pointer;
}
.popup-header-close .icon:hover {
    color: #172b4d;
}
.window-overlay .icon {
    color: #42526e;
}
.popup-title{
    position: relative;
    margin: 0 12px;
    padding: 0 32px;
    box-sizing: border-box;
    line-height: 32px;
    color: #5e6c84;
    display: block;
}
.window-overlay{
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.64);
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
.window-overlay .popup-title-text {
    height: 32px;
    line-height: 32px;
}
.window-overlay .popup-title-text .form-field-input {
    font-size: 22px;
}
.window-overlay .popup-title-icon {
    position: absolute;
    top: 0;
    left: 0;
}
.window-module {
    margin: 0;
    padding: 0 32px;
}
.window-module .title {
    position: relative;
}
.window-module .title-icon {
    position: absolute;
    top: 0;
    left: -32px;
}
.window-module .title-text {
    height: 32px;
    line-height: 32px;
}
.window-module .title-text h2, .window-module .title-text h3 {
    display: inline-block;
    color: #172b4d;
}
.window-module .description {
    margin: 10px 0;
}
.window-module .description .form-field-input:focus {
    height: 80px;
}
</style>
<script>
 import dateTime from '@/filters/dateTime';
 import TComment from '@/components/TComment'
export default {
    name:'Card',
    components: {
        TComment
    },
     computed: {
            server() {
                return this.$store.state.server;
            },
            list() {
                console.log('card getlist',typeof this.$route.params.listId)
                console.log(this.$store.state.list)
                return this.$store.getters['list/getList'](this.$route.params.listId)
            },
            card() {
                console.log('card getcard')
                return this.$store.getters['card/getCard'](this.$route.params.cardId)
            }
        },
    filters: {
            dateTime
        },
    methods: {
        uploadAttachment(){
            let file = this.$refs.attachment.files[0]
            try {
                this.$store.dispatch('card/uploadAttachment', {
                    boardListCardId: this.card.id,
                    file
                })

                this.$refs.attachment.value='' //不置空，提交后再取消会报错
                this.$message.success('上传成功')
            } catch (error) {
                console.log('')
            }
        },
        editCardDescription(e){
            let {value} = e.target;
            if (value!== this.card.description) {
                 try {
                        this.$store.dispatch('card/editCard', {
                            id: this.card.id,
                            description: value,
                        });

                        this.$message.success('卡片简介修改成功');
                    } catch (e) {console.log('')}
            }
        },
        editCardName(e) {
            let {value} = e.target;
            if (value!== this.card.name) {
                try {
                        this.$store.dispatch('card/editCard', {
                            id: this.card.id,
                            name: value,
                        });

                        this.$message.success('卡片名称修改成功');
                    } catch (e) {
                        console.log('')
                    }
            }
        },
        removeAttachment(id){
            try {
                    this.$store.dispatch('card/removeAttachment', {
                        cardId: this.card.id,
                        id
                    });

                    this.$message.success('封面移除成功');
                } catch (e) {
                    console.log('')
                }
        },
        setCover(id) {
            try {
                this.$store.dispatch('card/setCover', {
                    cardId: this.card.id,
                    id
                });

                this.$message.success('封面设置成功');
            } catch (e) {
                console.log('')
            }
        }
    }
}
</script>