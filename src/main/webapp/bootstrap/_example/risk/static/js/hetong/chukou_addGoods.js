var config = null;
$(function(){
	$("#ckht").val(parentTabWindow.ckht);
	config = {
		container:"info",
		columns:[
			{col:"goodsName",label:"货物名称",type:"text",validate:{required:true}},
			{col:"numbers",label:"数量",type:"text",validate:{required:true,number:true,strictPositiveNum:true,decimalDigits:4}},
			{col:"itemType",label:"规格型号",type:"text",validate:{required:true}},
			{col:"measurementUnit",label:"计量单位",type:"text",validate:{required:true}},
			{col:"price",label:"单价",type:"text",validate:{required:true,number:true}},
            {col:"total",label:"总价",type:"text",validate:{required:true,number:true}},
			//{col:"currency",label:"币制",type:"select",validate:{required:true},options:getDicts("currency")}
            {col:"currency",label:"币制",type:"ComplexSelect",comboWidth:340,validate:{required:true},options:getDicts("currency")}
		]
	};
	var $container = formGenerator(config);
	registerValidate("addInfoForm",config);
	//如果是修改物资信息
	if(parentTabWindow.isEdit){
		setFormData("addInfoForm",document,parentTabWindow.params)
	}
	$("#saveOrUupdateBtn").on("click",function(e){
		if($("#addInfoForm").valid()){
			var data = $("#addInfoForm").serialize();
		    //var uuid = $("#addInfoForm input[name='ckhthw']").val();
	        $.ajax({
	            url : "../../../../chuKouHeTong/addOrUpdateGoodsDetail",
	            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	            type : "POST",
	            data : data,
	            success : function (result) {
	                if(result.success){
	                	parentTabWindow.layer.msg(result.msg);
	                }else{
	                	parentTabWindow.layer.msg("操作失败！");
	                }
	        		//parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	        		//parent.refreshTable(); //刷新页面
	                finishCallback();
	            }
	        });
		}
		processEvent(e);
	});
});