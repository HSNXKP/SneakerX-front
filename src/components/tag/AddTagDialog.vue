<template>
			<!--添加标签对话框-->
			<el-dialog title="添加标签" width="50%" :visible.sync="addTagDialogVisible" :before-close="cancelDialogVisible">
			<!--内容主体-->
			<el-form :model="addTagForm" :rules="formRules" ref="addFormRef" label-width="80px">
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="addTagForm.name" placeholder="请填写标签"></el-input>
				</el-form-item>
				<el-form-item label="标签颜色">
					<el-select v-model="addTagForm.color" placeholder="请选择颜色" :clearable="true" style="width: 100%">
						<el-option v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
							<span style="float: left; width: 100px;">{{ item.label }}</span>
							<span style="float: left; width: 100px; height: inherit" :class="`me-${item.value}`"></span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer">
				<el-button @click="cancelDialogVisible">取 消</el-button>
				<el-button type="primary" @click="addTag">确 定</el-button>
			</span>
		</el-dialog>
</template>

<script>
import {mapState} from "vuex";
import {addTag} from "@/api/tag"

export default {
	name:"AddTagDialog",
	data(){
		return{
			formRules: {
					name: [{required: true, message: '请输入标签名称', trigger: 'blur'}]
				},
			colors: [
					{label: '红色', value: 'red'},
					{label: '橘黄', value: 'orange'},
					{label: '黄色', value: 'yellow'},
					{label: '橄榄绿', value: 'olive'},
					{label: '纯绿', value: 'green'},
					{label: '水鸭蓝', value: 'teal'},
					{label: '纯蓝', value: 'blue'},
					{label: '紫罗兰', value: 'violet'},
					{label: '紫色', value: 'purple'},
					{label: '粉红', value: 'pink'},
					{label: '棕色', value: 'brown'},
					{label: '灰色', value: 'grey'},
					{label: '黑色', value: 'black'},
				],
		}
	},
	computed:{
		...mapState(['addTagDialogVisible','addTagForm'])
	},
	methods:{
		cancelDialogVisible() {
				this.addTagForm.color = ''
				this.$refs.addFormRef.resetFields()
				this.$store.commit('addTagDialogVisible',false)
			},
		addTag(){
			this.$refs.addFormRef.validate(valid => {
            if (valid) {
				const token = window.localStorage.getItem('adminToken')
				console.log(this.addTagForm)
                addTag(token,this.addTagForm).then(res =>{
                    if (res.code === 200) {
						this.cancelDialogVisible()
						this.msgSuccess(res.msg)
						this.exportChange()
                    }else{
                        this.msgError(res.msg)
                    }
                }).catch(() => {
					this.msgError("请求失败")
				})
            }
        }) 
	},
			// 返回父组件成功信息 更新tag的数据
			exportChange(){
				this.$emit('successChange','success')
			}
	}
	
}
</script>

<style scoped>

</style>