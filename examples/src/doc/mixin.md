
##### pageMixin

方法 | 类型       | 说明
--- |----------| :--- | 
mDisabled | function | 返回true，表示无权限；返回false，表示有权限
mHandleWidth | function | 根据传入的width, 返回处理后的width


##### validateMixin

方法 | 类型       | 说明
--- |----------| :--- | 
mBlurRequired | function | 建议下拉框和输入框的校验, 全改为mRequired。 mBlurRequired和mChangeRequired废弃
mChangeRequired | function | change校验
mNameLength | function | 长度最大为64个字符
mValidateName | function | 校验英文,请输入支持英文、下划线、数字,且不能以下划线开头和结尾
mValidateChinese | function | 校验中文,请输入支持中文、英文、数字,且不能以下划线开头和结尾
mValidateIP | function | 校验IP
mValidateHost | function | 校验host
mValidateMobile | function | 校验mobile
mValidateEmail | function | 验证电子邮箱格式
validateNumber | function | 仅支持数字
mPostMessageHeight | function | iframe嵌套子页面向iframe发送自己的高度，入参时页面id
mPostMessage | function | 向iframe发送参数，入参为需要发送的参数

##### function 调用方法 this.mBlurRequired();

