
$(function(){
    //基本信息
    var config = {
        container:"info",
        columns:[
            {col:"exrateId",label:"汇率ID",type:"text",type:"hidden",sm:"12"},
            {col:"exrateDate",label:"汇率日期",type:"date",validate:{required:true,date:true,dateLEInput:"exrateDate"}},
            {col:"exrateHy",label:"汇率值",type:"text",validate:{required:true}},
            {col:"exrateObject",label:"汇率对象",type : "select",validate:{required:true},options : getDictsExt("currency")}
        ]
    };
    //基本信息添加到页面
    formGenerator(config);
    //验证表单
    registerValidate("addInfoForm",config);
    //添加或修改保存
    $("#saveOrUupdateBtn").on("click",function(e){
        var exrateId= $(":input[name='exrateId']").val();
        //校验每一个月份只有一个汇率
        if(exrateId==""||exrateId==null){
         var exrateObject=$(":input[name='exrateObject']").val();
         var exrateDate=$(":input[name='exrateDate']").val();
            $.ajax({
                url:'../../../xthl/CheckXthlCount',
                type:'POST',
                dataType:'json',
                data:{
                    "exrateDate":exrateDate,
                    "exrateObject":exrateObject
                },
                success:function(result){
                    debugger
                    if(result.data==0){
                        submitdata();
                    }else{
                        layer.msg("该月的汇率已存在，该月不能再次添加汇率!");
                        return false;
                    }
                }
            })
        }else{
            submitdata();
        }

    });
});
function submitdata() {
    if($("#addInfoForm").valid()){
        var data = $("#addInfoForm").serialize();
        $.ajax({
            url : "../../../xthl/saveXthlXX",
            contenType:'application/json',
            type : "POST",
            data : data,
            success : function (result) {
                if(result.success){
                    parent.layer.msg(result.msg);
                }else{
                    parent.layer.msg(result.msg);
                }
                parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                parent.refreshTable(); //刷新页面
            }
        });
    }
}