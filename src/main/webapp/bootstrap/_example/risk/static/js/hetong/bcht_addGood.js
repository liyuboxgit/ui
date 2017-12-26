$(function(){
    $("#bcht").val(parent.bcht);
    var config = {
        container:'info',
        columns:[
            {col:"bchthw",label:"货物ID",type:"text",type:"hidden"},
            {col:"goodsName",label:"货物名称",type:"text",validate:{required:true}},
            {col:"numbers",label:"数量",type:"text",validate:{required:true,number:true,strictPositiveNum:true,decimalDigits:4}},
            {col:"itemType",label:"规格型号",type:"text"/*,validate:{required:true}*/},
            {col:"measurementUnit",label:"计量单位",type:"text",validate:{required:true}},
            /*{col:"measurementUnit",label:"计量单位",type:"select",validate:{required:true},
             options:[
             {
             value:"请选择",text:"请选择",selected:true
             },
             {
             value:"台",text:"台"
             },
             {
             value:"包",text:"包"
             }
             ]
             },*/
            {col:"price",label:"单价",type:"text",validate:{number:true,required:true}},
            {col:"total",label:"总价",type:"text",validate:{number:true,required:true}}
        ]
    };
    var $container = formGenerator(config);
    registerValidate("addInfoForm",config);

    $("#saveOrUupdateBtn").on("click",function(){
        if($("#addInfoForm").valid()){
            var data = $("#addInfoForm").serialize();
            console.info(data);
            //前往新增
            $.ajax({
                url : "../../../../buchonghetonghw/saveBuChonghtHw",
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
    $("#info :input[name='numbers']").on("blur",function(){
    	var numbers = $(this).val();
    	var total = $("#info :input[name='total']").val();
    	var ret;
    	if(total!=''&&numbers!=''){
    		 ret =  (total/numbers).myToFixed(4);
    	}else{
    		return;
    	}
    	$("#info :input[name='price']").val(ret);
    });
    $("#info :input[name='total']").on("blur",function(){
    	var total = $(this).val();
    	var numbers = $("#info :input[name='numbers']").val();
    	var ret;
    	if(total!=''&&numbers!=''){
    		 ret =  (total/numbers).myToFixed(4);
    	}else{
    		return;
    	}
    	$("#info :input[name='price']").val(ret);
    });
});