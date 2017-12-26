var key = "uuid";

//表格标题项
var columns = [
    {
        align:'center',
        checkbox : true
    },
    {
        title : '供货商ID',
        align:'center',
        field : 'uuid',
        visible : false
    },
    {
        title : '序号',
        align:'center',
        formatter : function(value,row,index){
            var page = $table.bootstrapTable("getPage");
            var pageSize = page.pageSize,pageNumber = page.pageNumber;
            return page.pageSize*(page.pageNumber-1)+index+1;
        }
    },
    {
        title : '纳税人识别号',
        align:'center',
        field : 'nsrsbh',
    },
    {
        title : '生产企业名称',
        field : 'supplierName',
        align : 'left'
    },
    {
        title : '备案类型',
        align:'center',
        field : 'zfbazt',
        formatter:$thisExamineStatusFormatter
    }
];



$(function(){
	//初始化表头表单
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "nsrsbh",
				type : "text",
				label : "纳税人识别号"
			},
			{
				col : "supplierName",
				type : "text",
				label : "生产企业名称"
			},
			{
				col : "zfbazt",
				label : "备案状态",
				type : "select",
				options  : [
                    {text : "未备案", value : "00"},
					{text : "已备案", value : "12"}
				]
			}
		]
	},"query");

	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "save", content: "确定",className : "glyphicon fa fa-file-text-o"}
		]
	});

	//查询
	$("#thSearchBtn").bind("click",function(){
        queryData("../../../../ghs/findBeiAnPageByCondition");
	}).trigger("click");


	//保存生产企业到到新建页面
	$(document).on("click","#save",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length>0) {
			parent.addRows(selectRows);
            parent.$table.bootstrapTable('removeAll');
            parent.$table.bootstrapTable('append',parent.rows);
            parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		}else {
			layer.msg("请选择至少一家企业进行备案!");
		}
	})
	
});
function $thisExamineStatusFormatter(value,row,index){
    var title = "",className = "";
    switch(value){
        case "0":
            title = "未备案";
            className = "fa fa-times-circle text-danger beia";
            break;
        case "1":
            title = "已备案";
            className = "fa-check-circle-o text-success beia";
            break;
        case "2":
            title = "变更";
            className = "fa-check-circle-o text-success beia";
            break;
    }
    return '<i title="'+title+'" class="fa '+className+'" key='+row.bgd+'>'+title+'</i>';
}