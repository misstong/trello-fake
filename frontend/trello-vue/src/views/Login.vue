<template>
    <div id="register-login">
        <a class='logo' href="/"></a>
        <div class="section-wrapper">
            <div class="account-form">
                <h1>登录到Trello</h1>
                <form id='register-form' method="POST" @submit.prevent="loginSubmit">
                    <div>
                         <label> 
                        <input v-model='user.name' placeholder="请输入用户名" class="form-field" />
                        </label>
                    </div>
                    <div>
                        <input type="password" v-model="user.password" class="form-field" placeholder="输入密码" />
                    </div>
                    <div>
                        <input type="submit" class='btn btn-success' value='登录'>
                        <span class="signin-signup-separator">或者</span>
                        <input type="button" class="btn" value="注册"/>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user:
            {
                name: '',
                password: ''
            }
        }
    },

    methods: {
        async loginSubmit() {
            if (this.user.name.trim() ==='' || this.user.password.trim()===''){
                //return  this.$message.error('用户名和密码不能为空');
                return this.$message.error('用户名和密码不能为空')
                // console.log('用户名和密码不能为空')
                // return 
            }

            try{
                await this.$store.dispatch('user/login',{
                    ...this.user
                })
                this.$router.push({name: 'Home'})
            }catch(e) {console.log('');throw e}
        }
    }
    
}
</script>