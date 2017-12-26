var key = "ckht";

var ckht = "";
var examineStatus = "";
var url="";

//表格标题项
var columns = [ 
	{
		//field : 'state',
		align:'center',
		checkbox : true
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
		title : '合同ID',
		align:'center',
		field : 'ckht',
		visible : false
	},
	{
		title : '合同编号',
		align:'center',
		field : 'contractCode',
		align : 'left',
		formatter : lookInfoFormatter
	}, 
	{
		title : '合同名称',
		align:'center',
		field : 'contractName',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '签订日期',
		align:'center',
		field : 'signDate'
	}, 
	{
		title : '买方',
		align:'center',
		field : 'buyerName',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '卖方',
		align:'center',
		field : 'sellerName',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '出口国别',
		align:'center',
		field : 'exportCountry',
		formatter : nullFormatter
	}, 
	{
		title : '贸易方式',
		align:'center',
		field : 'serviceType'
	}
];

$(function(){
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "contractCode",
				type : "text",
				label : "合同编号"
			},
			{
				col : "contractName",
				type : "text",
				label : "合同名称"
			}
		]
	},"query");
//	console.log(serchParam.type);
//	console.log($("select[name='associatedState']").length)
	$('select[name="examineStatus"]').val(serchParam.type);
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "saveOrUupdateBtn", content: "确定",className : "glyphicon glyphicon-saved"}
		]
	});
	
	//查询
	$("#thSearchBtn").on("click",function(){
		queryData("../../../../ghs/queryForList");
	}).trigger("click");

	//查看详情
	$(document).on("click",".lookInfo", function(){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口合同详情【合同名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/hetong/chukou/detail.html"
		});
	});

	//查看货物清单
	$(document).on("click",".searchBtn", function(){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			area : ["80%","90%"],
			title : '货物清单【合同名称：<font color="red">'+title+'</font>】',
			url : "../../hetong/chukou/goods.html"
		});
	});	

	//查看关联信息
	$(document).on("click",".glBtn", function(e){
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id: $(this).attr("key"),
            area : ["80%","90%"],
			title:'<i class="glyphicon glyphicon-random" style="padding-right:3px;font-size:12px;"></i>关联信息【合同名称：<font color="red">'+title+'</font>】',
			url:"../../../pages/hetong/chukou/guanlian.html"
		});
	});
	//保存
	$("#saveOrUupdateBtn").on("click",function(e){
		
		/*
		if($("#addInfoForm").valid()){
			var fjids = $("#fj1").val()+","+$("#fj2").val()+","+$("#fj3").val()+","+$("#fj4").val();
			$("#fjids").val(fjids);
		    var data = $("#addInfoForm").serialize();
		    var uuid = $("#addInfoForm input[name='ckht']").val();
	        $.ajax({
	            url : "../../../../chuKouHeTong/addOrUpdate",
	            contenType:'application/json',
	            type : "POST",
	            data : data,
	            success : function (result) {
	                if(result.success){
	                	parent.layer.msg(result.msg);
	                }else{
	                	parent.layer.msg("添加失败!");
	                }
	        		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	        		parent.refreshTable(); //刷新页面
	            }
	        });
		}
		*/
		var type = parent.colType;
		var selectRows = $table.bootstrapTable('getSelections');
		var htmlArray = [];
		if(selectRows.length == 1){
			/*
			for(var j > 0;j < selectRows.length;j++){
				
			}
			
			var  ids = selectRows.map(function(item,index,arr){
				return item.contractCode;
			});
			console.log(ids)
			for(var i=0;i<ids.length;i++){
				htmlArray.push(ids[i]);
			}
			*/
			//alert(type);
			//alert(selectRows[0]);
			parent.$(":input[name='"+type+"']").val(selectRows[0][type]);
//			console.log($(".tab-content div input:eq(0)"))
//			parent.layer.msg("保存成功!");
			parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
			//parent.refreshTable();//关闭页面后刷新页面
		}else{
			layer.msg("只能选择一条记录!");
		}
		
		
	});
});

function examineStatusFormatter(value,row,index){
    var title = "",className = "";
    switch(value){
        case "2":
            title = "审核未通过";
            className = "fa-times-circle text-danger";
            break;
        case "1":
            title = "审核已通过";
            className = "fa-check-circle-o text-success";
            break;
        default:
            title = "未审核";
            className = "fa-question-circle-o text-warning";
            break;
    }
    return '<a href="javascript:;"><span onclick="shenhe(\''+row.ckht+'\',\''+row.contractName+'\',\''+row.examineStatus+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
}

function shenhe(ckht,contractName,examineStatus){
    openLayer({
        id : ckht,
        ele:this,
        
        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>出口合同审核【合同名称：<font color="red">'+contractName+'</font>】',
        area :  [ "60%", "90%" ],
        url : "../../../pages/hetong/chukou/shenhe.html?examineStatus="+examineStatus+"&ckht="+ckht,
    });
}

