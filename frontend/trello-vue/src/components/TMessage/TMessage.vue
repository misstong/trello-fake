<template>
    <div :class="[
        'message',
        'message-' + type,
        center ? 'is-center' : ''
    ]"
    :style="{top: offset+'px'}"
    v-if="!closed">
        <p class="message-content">提示信息：{{message}}</p>
        <i class="icon icon-close"></i>
    </div>
</template>


<script>
import { setTimeout } from 'timers'
export default {
    name: 'TMessage',
    data() {
        return {
            message: '默认信息',
            type: 'info',
            center: true,
            offset: 20,
            closed: false,
            duration: 1000,
            timer: null,
            onClose: null
        }
    },
    mounted() {
        console.log('mounted')
        this.timer = setTimeout(()=>{
            if(!this.closed) {
                this.close()
            }
            if(this.onClose) {
                this.onClose()
            }
        }, this.duration)
    },
    methods: {
        close(){
            this.closed = true
            if (typeof this.onClose === 'function'){
                this.onClose()
            }
        }
    }

}
</script>