var key = "sbpc";
var barq,ssq,sbpch;//为子窗口提供使用

function lookInfoFormatter_(value, row, index){
	if(value){
		var title = value;
		if(value.length>15){
			value = value.substr(0,15)+"..."
		}

		return '<a href="javascript:void(0);" barq="'+(row["bzrq"])+'" ssq="'+(row["ssq"])+'" sbpch="'+(row["sbpch"])+'" title="'+title+'" key="'+(row[key?key:"id"])+'" class="text-info lookInfo">' + value + '</a>';
	}else{
		return "";
	}
}

var columns = [ 
	{
		field : 'select',
		align:'center',
		checkbox : true
	},
	{
		title : '申报批次编号',
		align:'center',
		field : 'sbpc',
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
		title : '所属期',
		field : 'ssq',
		align:'center'
	}, 
	{
		title : '申报批次',
		align:'center',
		field : 'sbpch',
		formatter : lookInfoFormatter_
	},
	/*{
		title : '申报日期',
		field : 'sbrq',
		align:'center'
	},*/
	{
		title : '备案状态',
		field : 'bazt',
		align:'center',
		formatter : function(value, row, index){
			if(value=="0")
				return "未备案";
			else
				return "已备案";
		}
	}, 
	/*{
		title : '企业办税员',
		align:'center',
		field : 'createName'
	},*/
	{
		title : '备案日期',
		align:'center',
		field : 'bzrq'
	}
];

$(function(){
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "ssq",
				type : "text",
				label : "所属期",
			},
			{
				col : "sbpch",
				type : "text",
				label : "申报批次",
			},
			/*{
				col : "sbrq",
				label : "申报日期",
				type : "date"
			},
			{
				col : "createName",
				type : "text",
				label : "企业办税员",
			},*/
			{
				col : "bazt",
				type : "select",
				label : "备案状态",
				options  : [
					{text : "请选择", value : ""},
					{text : "已备案", value : "1"},
					{text : "未备案", value : "0"}
				]
			},
			/*{
				col : "baCreateName",
				type : "text",
				label : "备案人",
			},*/
			{
                col : "bzrq",
                label : "备案时间",
                type : "startEndDate",
                dates  : [
                    {name : "signTimeStart", text : "开始日期"},
                    {name : "signTimeEnd", text : "结束日期"}
                ]
            }
		]
	},"query");
	
	setselect2("select[name='bazt']");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "beiAn", content: "生成备案",className : "glyphicon fa fa-file-text-o"}
		]
	});
	
	//查询
	$("#thSearchBtn").on("click",function(){
		queryData("../../../../shenBaoBeiAn/findPageByCondition");
	}).trigger("click");



	//查看详情
	$(document).on("click", ".lookInfo", function() {
		var title = $(this).attr("title");
		barq = $(this).attr("barq");
		ssq = $(this).attr("ssq");
		sbpch = $(this).attr("sbpch");
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			area : ['100%','100%'],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>备案信息【<font color="red">'+title+'</font>】',
			url : "../../system/beian/detail.html"
		});
	});
	

	
	$(document).on("click","#beiAn",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.sbpc;
		});
		
		for(var el=0;el< selectRows.length;el++){
			if(selectRows[el].bazt=='1'){//已备案的批次不能重复备案
				layer.msg('已备案的批次不能重复备案');
				return;
			}
		}

		if (selectRows.length>0) {
			$.ajax({
				url:'../../../../shenBaoBeiAn/beiAn',
				type:'POST',
				data:{param:(selectKey||[]).join(",")},
				success:function(ret){
					if(ret.success){
                        layer.msg("备案生产成功!");
						refreshTable();
					}
				},error:function(err){
					alert("e"+err);
				}
			});
		}else {
			layer.msg("请至少选择一个批次进行备案!");
		}
	})
});