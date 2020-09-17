import TMessage from './TMessage.vue'
import Vue from 'vue'

const TMessageClass = Vue.extend(TMessage);

let instances = []

function Message(data) {
    data = data || {}
    if (typeof data === 'string') {
        data = {
            message: data
        }
    }

    data.onClose = () => {
        Message.close(instance)
    }

    let instance = new TMessageClass({data})

    instance.$mount()
    document.body.appendChild(instance.$el)

    let offset = 20
    let offsetTop = offset
    instances.forEach(inst=>{
        offsetTop+= inst.$el.offsetHeight + offset
    })
    instance.$el.style.top = offsetTop + 'px'
    instances.push(instance);
    
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

Message.close = function(instance) {
    let index = instances.indexOf(instance)
    let removeHeight = instance.$el.offsetHeight + instance.offset
    instances = instances.filter(inst => inst !== instance)

    for (let i = 0; i < index; i++) {
        instances[i].$el.style.top = parseFloat(instances[i].$el.style.top) - removeHeight + 'px';
    }

}
export default Message 