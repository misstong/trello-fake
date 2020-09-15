<template>
    <div id='register-login'>
        <a class="logo" href="/"></a>
        <div class='section-wrapper'>
            <div class="account-form">
                <h1>注册Trello</h1>
                <form method="post" @submit.prevent="registerSubmit">
                    <div><input placeholder="输入用户名"  class="form-field2" v-model="user.name"></div>
                    <div><input type="password" placeholder="输入密码"  class="form-field2" v-model="user.password"></div>
                    <div><input type="password" placeholder="再次确认密码"  class="form-field2" v-model="user.rePassword"></div>
                    
                    
                    
                    <input type="submit" value="注册" class='btn btn-success'>
                    <span class="signin-signup-separator">或者</span>
                    <input type="button" value="登录" class="btn">
                </form>    
            </div>      
        </div>  
    </div>
</template>
<script>
export default {
    name:'Register',
    data() {
        return {
            user: {
                name: '',
                password:'',
                rePassword:''
            }
        }
    },
    methods: {
        async registerSubmit() {
            if (this.name.trim()==='' || this.password.trim()==='' || this.rePassword.trim()===''){
                this.$message.error('用户名和密码不能为空')
            }
            if (this.user.password !== this.user.rePassword) {
                    return this.$message.error('两次输入密码不一致');
                }

                try {
                    await this.$store.dispatch('user/register', {
                        ...this.user
                    });

                    this.$router.push({name: 'Login'});
                }catch (e) {console.log('');}
        }
    }
}
</script>