<template>
<header>

    <div class="left">
        <router-link :to='{name: "Home"}' class="btn btn-icon">
            <i class="icon icon-home"></i>
        </router-link>
        <router-link :to='{name: "Home"}' class="btn btn-icon">
            <i class="icon icon-board"></i>
                <span class="txt">看板</span>
        </router-link>
    </div>
    <router-link :to='{name: "Home"}' class="logo"></router-link>
    <div class="right">
        <a href="" class="btn btn-icon">
            <i class="icon icon-add"></i>
        </a>
        <t-popup>
            <button class="avatar">
                    <span>tt</span>
             </button>
              <t-popup-menu slot="content" :items='menuItems' @command='command'></t-popup-menu>
        </t-popup>
       
    </div>
</header>
    
    
</template>
<script>
import TPopup from '@/components/TPopup';
import TPopupMenu from '@/components/TPopupMenu'

export default {
    name:'THeader',
    components:{
        TPopup,
        TPopupMenu
    },
    data(){
        return {
            menuItems: [
                {name:'退出', command:'logout'}
            ]
        }
    },
    methods:{
        command(cmd) {
            switch(cmd){
                case 'logout':
                    this.logout()
                    break
                default:
                    break
            }
            

        },
        logout() {
            // this.$store.dispatch('user/logout')
            console.log('logout')
            //todo
            this.$router.push({name:'Login'})
        }
    }
}
</script>