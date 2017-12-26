$(function(){
    $("#cght").val(parent.cght);
	var config = {
		container:'info',
		columns:[
			/*{col:"goodsCode",label:"货物编号",type:"text",validate:{required:true}},*/
			{col:"goodsName",label:"货物名称",type:"text",validate:{required:true}},
			{col:"numbers",label:"数量",type:"text",validate:{digits:true,required:true}},
			{col:"itemType",label:"规格型号",type:"text",validate:{required:true}},
			{col:"measurementUnit",label:"计量单位",type:"text",validate:{required:true}},
			{col:"price",label:"单价",type:"text",validate:{number:true,required:true}},
			{col:"total",label:"总价",type:"text",validate:{number:true,required:true}}/*,
            {col:"supplier",label:"供货方",type:"text",validate:{required:true},search:true}*/
		]
	};
	var $container = formGenerator(config);
	registerValidate("addInfoForm",config);
	
	$("#saveOrUupdateBtn").on("click",function(){
        if($("#addInfoForm").valid()){
            var data = $("#addInfoForm").serialize();
            //前往新增
            $.ajax({
                url : "../../../../caiGouHeTong/addOrUpdateGoodsDetail",
                contenType:'application/json',
                type : "POST",
                data : data,
                success : function (result) {
                    parent.layer.msg(result.msg);
                    parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                    parent.refreshTable(); //刷新页面
                },
            });
        }
	});
    // initSearchBtn();
});

function initSearchBtn() {
    $("input[name='supplier']").next("a").click(function(){
        openLayer({
            ele:this,
            title : '<i class="text-info fa fa-search" style="padding-right:3px;font-size:12px;"></i>供货商列表',
            area : ["98%","96%"],
            url : "../../../pages/hetong/caigou/ghs_list.html"
        });
    })
}