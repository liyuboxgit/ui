//审核历史
var hisColumns = [
	{
        width:'5%',
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			return index+1;
		}
	},
	{
        width:'10%',
		title : '操作人',
		field : 'createName'
	}, 
	{
        width:'20%',
		title : '历史操作',
		field : 'examineStatus',
		formatter : lookInfoFormatter
	}, 
	{
        width:'30%',
		title : '操作时间',
		field : 'createTime'
	}, 
	{
        width:'35%',
		title : '说明',
		field : 'remarks'
	}
];

//初始化数据查询
$(function(){
	$("#uuid").val(serchParam.uuid);
	$("#examineStatus").val(serchParam.examineStatus);
	// console.info(serchParam.uuid+'||'+serchParam.examineStatus);
	$(":radio[value="+serchParam.examineStatus+"]").attr("checked","checked");
    // $("#shRemarks").val(parent.cght);
	queryData({url:"../../../ghs/queryShenHeList?uuid="+$("#uuid").val(),columns:hisColumns,$container:$("#shenheList"),height:204,pagenation:false});
});

//格式化历史操作
function lookInfoFormatter(value, row, index){
    var title = "";
    switch(value){
        case "1":
            title = "审核未通过！";
            break;
        case "2":
            title = "审核通过！";
            break;
        default:
            title = "未审核！";
            break;
    }
    return title;
}

// 保存审核状态
function save() {
	var uuid = $("#uuid").val();
	var shStatus = $("input[name='shStatus']:checked").val();
	var shRemarks = $("#shRemarks").val();
	// alert(shStatus);
    $.ajax({
        url : "../../../ghs/saveShenHeInfo",
        contenType:'application/json',
        type : "POST",
        data : {
            "uuid" : uuid,
            "examineStatus" : shStatus,
            "remarks" : shRemarks,
        },
        success : function (result) {
            if(result.success){
                parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                parent.refreshTable(); //刷新页面
                parent.layer.msg("审核成功!");
            }else{
                parent.layer.msg("审核失败!");
            }
        },
    });
}	    
