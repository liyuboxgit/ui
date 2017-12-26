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
		field : 'nsrsbh',
		align : 'left',
        formatter : lookInfoFormatter
	},
	{
		title : '生产企业名称',
		field : 'supplierName',
		align : 'left'
	}, 
	/*{
		title : '企业备案日期',
		align:'center',
		field : 'qybaTime'
	}, 
	{
		title : '企业备案状态',
		align:'center',
		field : 'qybazt',
        formatter : $thisExamineStatusFormatter
	},*/
	{
		title : '外综服备案日期',
		field : 'zfbaTime',
		align : 'center'
	},
	{
		title : '外综服备案状态',
		field : 'zfbazt',
		align : 'center',
        formatter : $thisNoExamineStatusFormatter
	}
];

/*function $thisExamineStatusFormatter(value,row,index){//
	var title = "",className = "";
	switch(value){
		case "1":
			title = "已备案";
			className = "fa-check-circle-o text-success beia";
			break;
        case "2":
            title = "已备案";
            className = "fa-check-circle-o text-success beia";
            break;
		case "0":
			title = "未备案";
			className = "fa fa-times-circle text-danger beia";
			break;
		default:
			title = "未备案";
			className = "fa fa-times-circle text-danger beia";
			break;
	}
	return '<i title="'+title+'" class="fa '+className+'" key='+row.bgd+'>'+title+'</i>';
}*/

function $thisNoExamineStatusFormatter(value,row,index){
	var title = "",className = "";
	switch(value){
		case "1":
			title = "已备案";
			className = "fa-check-circle-o text-success beia";
			break;
		case "0":
			title = "未备案";
			className = "fa fa-times-circle text-danger beia";
			break;
		case "2":
			title = "变更";
			className = "fa-check-circle-o text-success beia";
			break;
		default:
			title = "未备案";
			className = "fa fa-times-circle text-danger beia";
			break;
	}
	return '<i title="'+title+'" class="fa '+className+'" key='+row.bgd+'>'+title+'</i>';
}
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
                label : "外综服备案状态",
                type : "select",
                options  : [
                    {text : "请选择", value : ""},
                    {text : "未备案", value : "00"},
                    {text : "已备案", value : "12"}
                ]
            },
			{
				col : "zfbaTime",
				label : "外综服备案日期范围",
				type : "startEndDate",
				dates  : [
					{name : "zfbaTimeStart", text : "开始日期"},
					{name : "zfbaTimeEnd", text : "结束日期"}
				]
			}
		]
	},"query");
	
	setselect2("select[name='zfbazt']");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
/*			{id: "export", content: "导出",className : "glyphicon glyphicon-export"},
*/			{id: "print", content: "打印生产企业备案表",className : "glyphicon glyphicon-pawn"}
		]
	});

	//查询
	$("#thSearchBtn").bind("click",function(){
		queryData("../../../../ghs/findBeiAnPageByCondition");
	}).trigger("click");

	//更多
	$("#other").on('click',function(){
		var searchBox = $(".searchBox");
		if(searchBox.outerHeight() == 80){
			$(".searchBox").animate({height:"40px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-down"></i>更多');
		}else{
			$(".searchBox").animate({height:"80px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-up"></i>收起');
		}
	});

    //预览打印
    $(document).on("click","#print",function(){
        var selectRows = $table.bootstrapTable('getSelections');
        var selectKey = selectRows.map(function(item) {
            return item.uuid;
        });
        if (selectRows.length === 1) {
            window.open("../../../../shenBaoBeiAn/beianbiao?uuid="+selectKey);
        }else {
            layer.msg("请选择一条数据进行打印!");
        }
    })

    //查看详情
    $(document).on("click", ".lookInfo", function() {
        var title = params.supplierName;
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>生产企业详情【企业名称：<font color="red">'+title+'</font>】',
            url : "../../../pages/shenbaobeian/shengchanqiye/detail2.html?editflag=detail"
            // url : "../../../pages/shenbaobeian/shengchanqiye/detail.html"
        });
    });
	//备案
	$(document).on("click",".beia", function(){
		openLayer({
			ele:this,
			id : $(this).attr("key"),
            area : ["85%","85%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>备案历史明细',
			url : "../../../pages/shenbaobeian/shengchanqiye/zfba_list.html"
		});
	});
});