<template>
<!-- {name: 'Card', params:{listId: data.boardListId, cardId: data.id}} -->
    <router-link :to="{name: 'Card', params:{listId: data.boardListId, cardId: data.id}} " class="list-card">
        <div class="list-card-cover" v-if="data.coverPath" :style="'background-image: url('+data.coverPath+');'"></div>
        <div class="list-card-title">{{data.name}}</div>
        <div class="list-card-badges">
            <div class="badge">
                <span class="icon icon-description"></span>
            </div>
            <div class="badge">
                <span class="icon icon-comment"></span>
                <span class="text">{{data.commentCount}}</span>
            </div>
            <div class="badge">
                <span class="icon icon-attachment"></span>
                <span class="text">{{data.attachments.length}}</span>
            </div>
        </div>
    </router-link>
</template>
<style scoped>
.list-card{
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    text-decoration: none;
    cursor: pointer;
    z-index: 0;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
}
.list-card:hover {
    background-color: #f4f5f7;
    border-bottom: rgba(9, 30, 66, .25);
}
.list-card-cover{
    height: 200px;
    border-radius: 3px 3px 0 0;
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
    /* background-color:#fff ; */
}
.list-card-badges{
    display: flex;
}
.list-card-title{
    color: #172b4d;
    padding: 6px 8px 2px;
    z-index: 10;
    display: block;
    margin: 0 0 4px;
    /* background-color:#fff ; */
    z-index: 10;
}
.list-card-badges .badge .icon {
    color: #5e6c84;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
}
.list-card-badges .badge{
    min-height: 20px;
     margin: 0 4px 4px 0;
    padding: 2px;
    max-width: 100%;
    display: inline-block;
}
.list-card-badges .badge .text {
    line-height: 20px;
    color: #5e6c84;
    font-size: 14px;
}
</style>
<script>
export default {
    name: 'TCard',
    props:{
        data: {
            type: Object
        },
        boardId: {
            type: Number
        }
    },
    data() {
        return {
            nextPath: `/board/${this.boardId}/list/${this.data.boardListId}/card/${this.data.id}`}
    }

}
</script>