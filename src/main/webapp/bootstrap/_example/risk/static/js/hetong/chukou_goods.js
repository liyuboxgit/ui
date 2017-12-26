//获取参数
function getParams(params){
	params = {
			pageSize : this.pageSize,
			pageNumber : this.pageNumber,
			uuid : parentTabWindow.params.ckht,
			sortName : this.sortName,
			sortOrder : this.sortOrder
	};
	return params;
}

var isEdit = false;
var ckht="";
var url="";
var uuid = "";
var branch = "0";
var columns = [
	{
		checkbox : true
	},
	{
		title : "合同货物ID",
		align:"center",
		field : "ckhthw",
		visible : false
	}, 
	{
		title : "序号",
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : "货物名称",
		field : "goodsName"
	}, 
	{
		title : "数量",
		field : "numbers"
	}, 
	{
		title : "规格型号",
		field : "itemType"
	}, 
	{
		title : "计量单位",
		field : "measurementUnit"
	}, 
	{
		title : "单价",
		field : "price"
	}, 
	{
		title : "总价",
		field : "total"
	}
];

$(function() {
	if(typeof(serchParam.branch) != "undefined" && serchParam.branch != null && serchParam.branch.length != 0){
		branch = serchParam.branch;
	}
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
		]
	});
	ckht = parentTabWindow.params.ckht;
	$("#ckht").val(parentTabWindow.params.ckht);

	$("#examineStatus").val(parentTabWindow.params.examineStatus);
	//加载数据
	queryData("../../../../chuKouHeTong/findGoodsPageByCondition?ckht="+ckht);
	
	//添加
	$(document).on("click", "#add", function(e) {
		ckht = parentTabWindow.params.ckht;
		/*
		openLayer({
			//id : parentTabWindow.uuid,
			title : "添加物资",
			url : "../../hetong/chukou/addGood.html"
		});
		*/
		isEdit = false;
		openTab("添加物资","hetong/chukou/addGood.html");
		processEvent(e);
	});

	//修改
	$(document).on("click","#update",function(e) {
		isEdit = true;
		var selectRows = $table.bootstrapTable("getSelections");
		if (selectRows.length === 1) {
			params = selectRows[0];
			/*
			layer.open({
				type : 2,
				skin : "myLayui", // 样式类名
				title : "修改物资信息",
				area : [ "98%", "96%" ],
				content : "../../hetong/chukou/addGood.html?tempTime="+new Date().getTime(),
				success : function(layero, index) {
					//console.log(selectRows[0]);
				    var currentFrame = layero.find("iframe")[0].contentWindow.document;
				    $.ajax({
				        url:"../../../../chuKouHeTong/selectCkhwByPrimaryKey",
				        type:"GET",
				        dataType:"json",
				        data:{
				            "ckhthw":selectRows[0].ckhthw
				        },
				        success:function(result){
				           //$("#addInfoForm input[name='ckhthw']",currentFrame).val(selectRows[0].ckhthw);
				        	//console.log(result);
		                   setFormData("addInfoForm",currentFrame,result.data)
				        }
				    })
				}
			});
			*/
			openTab("修改物资信息","hetong/chukou/addGood.html?tempId="+selectRows[0].ckhthw);
		} else {
			layer.msg("请选择一条数据进行编辑!");
		}
		processEvent(e);
	});
	
	//导入
	$(document).on("click", "#import", function(e) {
        ckht = parentTabWindow.params.ckht;
		openLayer({
			title : "导入文件",
			area : [ "60%", "60%" ],
			url : "../../hetong/chukou/import.html?type=ckhthw&branch="+branch+"&ckht="+ckht
		});
		processEvent(e);
	});
});