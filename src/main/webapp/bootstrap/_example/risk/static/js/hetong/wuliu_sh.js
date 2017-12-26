//审核历史
var hisColumns = [
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			return index+1;
		}
	},
	{
		title : '操作人',
		field : 'createName'
	}, 
	{
		title : '历史操作',
		field : 'examineStatus',
		formatter : lookInfoFormatter
	}, 
	{
		title : '操作时间',
		field : 'createTime'
	}, 
	{
		title : '说明',
		field : 'remarks'
	}
];

//初始化页面的数据
$(function(){
    $("#wlys").val(serchParam.wlys);
    $("#examineStatus").val(serchParam.examineStatus);
    $(":radio[value="+serchParam.examineStatus+"]").attr("checked","checked");
	queryData({url:"../../../../wuLiuYunShu/findShPageByCondition?wlys="+$("#wlys").val(),columns:hisColumns,$container:$("#shenheList"),height:240,pagenation:false});
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
/*
 * 保存审核状态
 */
function save() {
	var wlys = $("#wlys").val();
	var shStatus = $("input[name='shStatus']:checked").val();
	var shRemarks = $("#shRemarks").val();
    $.ajax({
        url : "../../../../wuLiuYunShu/saveShenHeInfo",
        contenType:'application/json',
        type : "POST",
        data : {
            "wlys" : wlys,
            "shStatus" : shStatus,
            "shRemarks" : shRemarks,
        },
        success : function (result) {
            if(result.success){
            	layer.msg("审核成功");
            }else{
            	layer.msg("审核失败");
            }
    		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
    		parent.refreshTable(); //刷新页面
        },
    });
}	    