<template>
    <ul class="popup-menu-list">
        <li v-for="item of items" :key="item.name" :class="{separator:item.separator}" @click="execute(item.command)">{{item.name}}</li>
    </ul>
</template>
<script>
export default {
    name:'TPopupMenu',
    props: {
        items:{
            type: Array,
            default(){
                return []
                // return [{name: 'a', command: 'logout', separator: true}]
            }
        }
    },
    methods: {
        execute(command){
            this.$emit('command', command)
        }
    }
}
</script>