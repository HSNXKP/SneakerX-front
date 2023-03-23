<template>
 <el-dialog title="修改密码" :visible.sync="updatePasswordDialogVisible" width="30%" :before-close="updatePasswordDialogClosed">
            <div>
              <el-form :model="updatePasswordForm" :rules="rules"  ref="ruleForm" label-width="100px">
                <el-form-item label="输入旧密码" prop="oldPassword">
                  <el-input type="password" v-model="updatePasswordForm.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="输入新密码" prop="pass">
                  <el-input type="password" v-model="updatePasswordForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="newPassword">
                  <el-input type="password" v-model="updatePasswordForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitPassword">修 改</el-button>
                  <el-button @click="updatePasswordDialogClosed" >取 消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-dialog>
</template>

<script>
import {mapState} from "vuex";
import {updatePassword} from "@/api/user";

export default {
  name: "UpdatePasswordDialog",
  computed: {
			...mapState(['updatePasswordDialogVisible','updatePasswordForm','user'])
		},
  data() {
    // 2-5 修改密码校验规则 一定要放最前面
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.updatePasswordForm.oldPassword !== '') {
          this.$refs.ruleForm.validateField('newPassword');
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.updatePasswordForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      rules: {
        oldPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
     
    };
  },
  methods:{
    updatePasswordDialogClosed(){
        this.$refs.ruleForm.resetFields();
        this.$store.commit('updatePasswordDialogVisible',false)
    },
    submitPassword(){
        console.log(this.updatePasswordForm)
        this.updatePasswordForm.id=this.$store.state.user.id
        this.$refs.ruleForm.validate(valid => {
            if (valid) {
                updatePassword(this.updatePasswordForm).then(res =>{
                    if (res.code === 200) {
                        this.updatePasswordDialogClosed()
                        this.$store.commit('user', '')
                        window.localStorage.removeItem('userInfo')
                        window.localStorage.removeItem('adminToken')
                        // 如果不是在首页，跳转到首页
                        this.$router.push('/home')
                    }else{
                        this.msgError(res.msg)
                    }
                }).catch(() => {
					this.msgError("请求失败")
				})
            }
        }) 
    }
  }
};
</script>

<style>
</style>