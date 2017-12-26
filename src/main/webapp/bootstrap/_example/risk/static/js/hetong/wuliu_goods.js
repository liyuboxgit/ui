//获取参数
function getParams(params){
	params = {
			pageSize : this.pageSize,
			pageNumber : this.pageNumber,
			uuid : parent.params.wlys,
			sortName : this.sortName,
			sortOrder : this.sortOrder
	};
	return params;
}

var wlys="";
var url="";
var uuid = '';

//刷新数据
function refreshTable(){
	$('#table').bootstrapTable("refresh");
}

var columns = [
	{
		checkbox : true
	},
	{
		title : '合同货物ID',
		align:'center',
		field : 'wlyshw',
		visible : false
	}, 
	{
		title : '序号',
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : '货物名称',
		field : 'goodsName'
	}, 
	{
		title : '数量',
		field : 'numbers'
	}, 
	{
		title : '规格型号',
		field : 'itemType'
	}, 
	{
		title : '计量单位',
		field : 'measurementUnit'
	}, 
	{
		title : '单价',
		field : 'price'
	}, 
	{
		title : '总价',
		field : 'total'
	}
];
$(function() {
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
		]
	});
    wlys = parent.params.wlys;
	//加载数据
	queryData("../../../../wuLiuYunShu/findGoodsPageByCondition?uuid="+wlys);

	$("#wlys").val(parent.params.wlys);
	$("#examineStatus").val(parent.params.examineStatus);
	
	//添加
	$(document).on("click", "#add", function() {
		openLayer({
			id : parent.params.wlys,
			title : "添加物资",
			url : "../../hetong/wuliu/addGood.html"
		});
	});

	//修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改物资信息",
				area : [ "98%", "96%" ],
				content : "../../hetong/wuliu/addGood.html?tempTime="+new Date().getTime(),
				success : function(layero, index) {

				   var currentFrame = layero.find("iframe")[0].contentWindow.document;
				   $.ajax({
				        url:'../../../../wuLiuYunShu/selectWlhwByPrimaryKey',
				        type:'GET',
				        dataType:'json',
				        data:{
				            "wlyshw":selectRows[0].wlyshw,
				        },
				        success:function(result){
				          // $("#addInfoForm input[name='ckhthw']",currentFrame).val(selectRows[0].ckhthw);
		                   setFormData('addInfoForm',currentFrame,result.data)
				        },
				    })
				}
			});
		} else {
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});
	
	//导入
	$(document).on('click', '#import', function() {
        wlys = parent.params.wlys;
		openLayer({
			title : "导入文件",
			area : [ "60%", "60%" ],
			url : "../../hetong/wuliu/import.html?type=wlyshw&wlys="+wlys
		});
	});
});
