export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					mobileReg:/^(0|86|17951)?(13[0-9]|15[0123456789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,  // 手机号的正则
					userRules: {
						loginName: {
							rules: [{
									required: "true",
									"errorMessage": "账户名不能为空",
								},
								{
									validateFunction: this.validateLoginName
								}
							]
						},
						password: {
							rules: [{
								required: "true",
								"errorMessage": "密码不能为空",
							}]
						},
						phone: {
							rules: [{
									required: "true",
									"errorMessage": "手机号不能为空",
								},
								{
									validateFunction: this.validatePhone
								}
							]
						},
						vCode: {
							rules: [{
								required: "true",
								"errorMessage": "验证码不能为空",
							},
								{
									validateFunction: this.validateVcode
								}]
						}
					},
				}
			},
			methods: {
				// 验证用户名
				validateLoginName(rule, val, date, callback) {
					switch (true) {
						case val.length < 6:
							callback("用户名长度不正确")
							break
						default:
							return true
					}
				},
				// 验证手机号
				validatePhone(rule, val, date, callback){
					switch (true) {
						case !this.mobileReg.test(val):
							callback("手机号格式不正确")
							break
						default:
							return true
					}
				},
				// 验证验证码
				validateVcode(rule, val, date, callback){
					
				}
			}
		})
	}
}
