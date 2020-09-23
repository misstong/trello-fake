<template>
    <div>
        <div class="comment-post">
            <div class="avatar"><span>T</span></div>
            <div class="comment-content-box editing">
                <textarea class="comment-content-input" placeholder="添加评论..." ref="content"></textarea>
                <button class="btn btn-edit" @click="postNewComment">保存</button>
            </div>
        </div>
        <div class="comments">
            <li class="comment" v-for="comment of comments.rows" :key="comment.id">
                <div class="avatar">
                    <span>{{comment.user.name[0].toUpperCase()}}</span>
                </div>
                <div class="description">
                    <div class="header">
                        <strong>{{comment.user.name}}</strong>
                        <span> at </span>
                        <i>{{comment.createdAt|dateTime}}</i>
                    </div>
                    <div class="content">
                        {{comment.content}}
                    </div>
                </div>
            </li>
        </div>
        <div class="comment-pagination">
             <t-pagination :pages="comments.pages" :page="comments.page" @changePage="changePage"></t-pagination>
        </div>
    </div>
</template>
<style scoped>
.comment-content-box.editing .btn-edit {
    display: inline-block;
}
.comment-content-box .btn-edit {
    display: none;
}
.comment-content-box{
    padding: 10px 10px 5px 10px;
    border-radius: 3px;
    border: none;
    width: 100%;
    transition: .1s ease;
    box-shadow: 0 1px 2px -1px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
}
.comment-post .avatar, .comment .avatar {
    margin-right: 10px;
    background-color: rgba(9,30,66,.04);
    height: 40px;
    width: 45px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
}

.comment-post, .comment {
    display: flex;
}
.comment-post, .comments {
    margin: 20px 0 20px -32px;
}
.comment-content-box.editing .comment-content-input {
    height: 100px;
}
.comment-content-input {
    box-sizing: content-box;
    border: none;
    width: 100%;
    height: 20px;
    min-height: 20px;
    background: #fff;
    line-height: 20px;
    transition: .1s ease;
    resize: none;
}
.comment{
    margin-bottom: 20px;
}
.description{
    background: #fff;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 1px 1px 4px rgba(9,30,66,.25);
}
</style>
<script>
import TPagination from "@/components/TPagination";
import dateTime from '@/filters/dateTime';

export default {
    name: 'TComment',
    computed:{
        user(){
            return this.$store.state.user.info
        }
    },
    components: {
        TPagination
    },
    filters:{
        dateTime
    },
     props: {
            cardId: {
                type: Number,
                required: true
            }
        },
    data() {
            return {
                comments: {}
            }
        },
         async created() {

            await this.getComments();

        },
    methods: {
        async getComments(page = 1) {
                try {

                    let rs = await this.$store.dispatch('comment/getComments', {
                        boardListCardId: this.cardId,
                        page
                    });

                    this.comments = rs.data;
                } catch (e) {
                    console.log('')
                }
            },

        async postNewComment(){
             let {value} = this.$refs.content;

                try{
                    if (value.trim() !== '') {
                         await this.$store.dispatch('comment/postComment', {
                            boardListCardId: this.cardId,
                            content: value
                        });

                        this.$message.success('评论成功');

                        await this.getComments();
                    }
                    this.$refs.content.value = '';
                    this.$refs.content.focus();
                } catch (e) {
                    console.log('')
                }
        },
        async changePage(page) {
                await this.getComments(page);
            }

    }
}
</script>