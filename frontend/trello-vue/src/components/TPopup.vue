<template>
    <div class="popup-container">

        <div @click="open">
            <slot></slot>
        </div>
        <div class="popup" v-show="isShow" ref="popup">
            <div class="popup-header">
                <span class="popup-title">{{title}}</span>
                <a class="popup-header-close" @click="close" ref='close'>
                    <i class="icon icon-close"></i>
                </a>
            </div>
            <div class="popup-content">
                <slot name='content'></slot>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
.popup-container {
    position: relative;
}
</style>
<script>
export default {
    name: 'TPopup',
    props: {
        title:{
            type:String,
            default: 'menu'
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        open() {
            this.isShow = true;

            window.addEventListener('click' , this.close)
            let $popup = this.$refs.popup;
            this.$nextTick(()=>{
                $popup.style.left = '0px';

                let $popupRect = $popup.getBoundingClientRect();
                let left = 0;
                if ($popupRect.right > window.innerWidth) {
                    left = -$popupRect.width + this.$el.offsetWidth;
                }
                $popup.style.left = left+'px'
            })
        },
        close(e) {
            // console.log(this.$refs.close)
            if (!e ||e.path.includes( this.$refs.close ) || !e.path.includes(this.$el)) {
                // console.log(e)
                this.isShow = false
            }
            
        }
    }
}
</script>