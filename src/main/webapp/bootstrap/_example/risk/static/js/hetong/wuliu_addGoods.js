$(function(){
	$("#wlys").val(parent.wlys);
	var config = {
		container:'info',
		columns:[
			// {col:"cargoNumber",label:"货物编号",type:"text",validate:{required:true}},
			{col:"goodsName",label:"货物名称",type:"text",validate:{required:true}},
			{col:"numbers",label:"数量",type:"text",validate:{required:true,number:true,strictPositiveNum:true,decimalDigits:4}},
			{col:"itemType",label:"规格型号",type:"text",validate:{required:true}},
			{col:"measurementUnit",label:"计量单位",type:"text",validate:{required:true}},
			{col:"price",label:"单价",type:"text",validate:{required:true,number:true}},
            {col:"total",label:"总价",type:"text",validate:{required:true,number:true}},
            // {col:"currency",label:"币制",type:"select",validate:{required:true},options:getDicts("currency")},
			/*{col:"supplier",label:"供货方",type:"text",validate:{required:true}},
			{col:"nsrsbh",label:"纳税人识别号",type:"text",validate:{required:true}},*/
		]
	};
	var $container = formGenerator(config);
	registerValidate("addInfoForm",config);
	
	$("#saveOrUupdateBtn").on("click",function(){
		var data = $("#addInfoForm").serialize();
        $.ajax({
            url : "../../../../wuLiuYunShu/addOrUpdateGoodsDetail",
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            type : "POST",
            data : data,
            success : function (result) {
                if(result.success){
                    parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                    parent.refreshTable(); //刷新页面
                	parent.layer.msg(result.msg);
                }else{
                	parent.layer.msg("更新失败");
                }
            },
        });
	});
	
});