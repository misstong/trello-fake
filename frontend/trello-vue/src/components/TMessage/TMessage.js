import TMessage from './TMessage.vue'
import Vue from 'vue'

const TMessageClass = Vue.extend(TMessage);

function Message(data) {
    data = data || {}
    if (typeof data === 'string') {
        data = {
            message: data
        }
    }

    let instance = new TMessageClass({data})

    instance.$mount()
    document.body.appendChild(instance.$el)
    
}
['info','success','error','warning'].forEach(type=>{
    Message[type] = function(data) {
        if(typeof data === 'string'){
            data = {
                message: data
            }
        }
        data.type = type
        Message(data)
    }
})
export default Message 