var cght="";
var url="";
var columns = [
	{
		checkbox : true
	},
	{
		title : '合同货物ID',
		align:'center',
		field : 'cghthw',
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
	}/*,
	{
		title : '供货方',
		field : 'supplier'
	}*/
];

$(function() {
    formGenerator({
        container :  "advSearchBox",
        columns : [
            {
                col : "goodsName",
                label : "货物名称",
                type : "text"
            }
        ]
    },"query");
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
		]
	});

	//加载数据
    //查询
    $("#thSearchBtn").bind("click",function(){
        queryData("../../../../caiGouHeTong/findGoodsPageByCondition?cght="+parent.params.cght);
    }).trigger("click");

    //添加
	$(document).on("click", "#add", function() {
        cght = parent.params.cght;
		openLayer({
			// id :parent.params.cght,
			title : "添加物资",
			url : "../../../pages/hetong/caigou/addGood.html"
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
				content : "../../../pages/hetong/caigou/addGood.html?tempTime="+new Date().getTime(),
				success : function(layero, index) {
					   var currentFrame = layero.find("iframe")[0].contentWindow.document;
					   $.ajax({
					        url:'../../../../caiGouHeTong/queryCghtHwForObject',
					        type:'POST',
					        dataType:'json',
					        data:{
					            "goodsId":selectRows[0].goodsId,
					        },
					        success:function(result){
					           $("#addInfoForm input[name='goodsId']",currentFrame).val(selectRows[0].goodsId);
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
        cght = parent.params.cght
        url="../../../../caiGouHeTong/multifileUpload?type=cghthw&cght="+cght;
		openLayer({
			title : "导入文件",
			area : [ "60%", "60%" ],
			url : "../../../pages/hetong/caigou/import.html"
		});
	});
	
});
