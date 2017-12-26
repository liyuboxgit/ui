var key = "ckht";

var ckht = "";
var examineStatus = "";
var uploadurl="";
var branch="0";
var oldContractCode = "";
//表格标题项
var columns = [
	{
		//field : "state",
		align:"center",
		checkbox : true
	},
	{
		title : "序号",
		align:"center",
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : "合同ID",
		align:"center",
		field : "ckht",
		visible : false
	},
	{
		title : "合同编号",
		align:"center",
		field : "contractCode",
		align : "left",
		formatter : lookInfoFormatter
	}, 
	{
		title : "合同名称",
		align:"center",
		field : "contractName",
		align : "left",
		formatter : labelTrimFormatter
	}, 
	{
		title : "签订日期",
		align:"center",
		field : "signDate"
	}, 
	{
		title : "买方",
		align:"center",
		field : "buyerName",
		align : "left",
		formatter : labelTrimFormatter
	}, 
	{
		title : "卖方",
		align:"center",
		field : "sellerName",
		align : "left",
		formatter : labelTrimFormatter,
		visible : false
	}, 
	{
		title : "出口国别",
		align:"center",
		field : "exportCountry",
		formatter : nullFormatter
	}, 
	{
		title : "贸易方式",
		align:"center",
		field : "serviceType"
	}, 
	{
		title : "货物清单",
		field : "projects",
		align : "center",
		formatter: viewDetail
	}, 
	{
		title : "审核状态",
		field : "examineStatus",
		align : "center",
		formatter : examineStatusFormatter
	}, 
	{
		title : "关联状态",
		field : "associatedState",
		align: "center",
		formatter : formatterGlStatus
	}
];

/*
$(window).on("load", function (e) {  
	$("select[name='exportCountry']").selectpicker({  
        selectedText: "cat"  
   }); 
   processEvent(e);
}); 
*/

$(function(){
	if(typeof(serchParam.branch) != "undefined"){
        branch = serchParam.branch;
	}
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
			},
			{
				col : "exportCountry",
				label : "出口国别",
				width:200,
				comboWidth:800,//下拉列表的宽度
				//pageGroup:10, //分页显示默认为10
				//simplePagenav : true,
				//type : "select",
				//type : "MultiSelect",
				//type : "SimpleSelect",
				//type : "PopularSelect",
				//type : "ComplexSelect",
				type:"AlmightySelect", //按abcd可分组的值
				//multi:true, //多值选择
				//value : "101",//默认值
				//value:"101,313,401,338",//默认值
				//options : getDictsExt("nation")
				options : getSpecialDicts("nation")
			},
			{
				col : "serviceType",
				label : "贸易方式",
				//simplePagenav : false,
				//type : "select",
				//type : "MultiSelect",
				type : "SimpleSelect",
				//type : "PopularSelect",
				//type : "ComplexSelect",
				//type:"AlmightySelect",
				width : 100,
				comboWidth:340,
				//pageGroup:6,
				//simplePagenav : true,
				//value : "0110",
				//comboTitle : "simple",
				//multi:true,
				//options : getDictsExt("maoyifs")
				options : getDicts("maoyifs")
			},
			{
				col : "signDate",
				label : "签订日期",
				type : "startEndDate",
				dates  : [
					{name : "signDateStart", text : "开始日期"},
					{name : "signDateEnd", text : "结束日期"}
				]
			},
			{
				col : "examineStatus",
				label : "审核状态",
				//type : "select",
				type:"tile",
				options  : [
					{text : "请选择", value : ""},
					{text : "已通过", value : "2"},
					{text : "未通过", value : "1"},
					{text : "未审核", value : "0"}
				]
			},
			{
				col : "associatedState",
				label : "关联状态",
				//type : "select",
				type:"tile",
				options  : [
					{text : "请选择", value : ""},
					{text : "已关联", value : "1"},
					{text : "未关联", value : "0"}
				]
			}
		]
	},"query");
	/*
	$("select").select2({
		language: "zh-CN", //设置 提示语言
		width: "100px", //设置下拉框的宽度
		height: "22px",
		placeholder: "请选择"
	});
	*/
	//setselect2("select[name='exportCountry']");
	//setselect2("select[name='serviceType']");
	
	/*
	$("select[name='exportCountry']").select2({
		language: "zh-CN", //设置 提示语言
		width: "100%", //设置下拉框的宽度
		placeholder: "请选择",
	});
	*/
	
	//console.log(serchParam.type);
	//console.log($("select[name='associatedState']").length)
	$("select[name='examineStatus']").val(serchParam.type);
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
			//{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"}
			//{id: "shenhe", content: "审核",className : "glyphicon glyphicon-pawn"}
		]
	});
	
	//查询
	$("#thSearchBtn").on("click",function(e){
		//queryData("../../../../chuKouHeTong/findPageByCondition?branch="+branch);
		queryData({url:"../../../../chuKouHeTong/findPageByCondition?branch="+branch,$container:$("#table"),columns:columns});
		processEvent(e);
	}).trigger("click");
	
	//导入
	$("#import").on("click", function(e){
		//openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../../pages/hetong/chukou/import.html?type=ckht&branch="+branch});
		openTab("导入文件","hetong/chukou/import_ckht.html?type=ckht&branch="+branch);
		processEvent(e);
	});
	
	//添加
	$("#add").on("click", function(e){
        oldContractCode = "";
        /*
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加出口合同',
			url : "../../../pages/hetong/chukou/add.html?branch="+branch
		});
		*/
        openTab("添加出口合同","hetong/chukou/add.html?branch="+branch);
        processEvent(e);
	});

	//修改
	$("#update").on("click",function(e){
		var selectRows = $table.bootstrapTable("getSelections");
		var selectRowsd = $table.bootstrapTable("getSelections");
		if (selectRows.length === 1) {
			selectRows = selectRows.map(function(item) {
				return item.examineStatus;
			});
			if(selectRows.indexOf("2")>=0){
				layer.msg("选中的出口合同审核已通过，不可修改!");
				return;
			}
			selectRowsd = selectRowsd.map(function(item) {
				return item.associatedState;
			});
			if(selectRowsd.indexOf("1")>=0){
				layer.msg("选中的出口合同已经关联采购合同，不可修改!");
				return;
			}
			var selectRows = $table.bootstrapTable("getSelections");
			params = selectRows[0];
            oldContractCode = selectRows[0].contractCode;
            /*
			layer.open({
				type : 2,
				skin : "myLayui", // 样式类名
				title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改出口合同信息【合同名称：<font color="red">'+params.contractName+'</font>】',
				area : ["98%","96%"],
				content : "../../../pages/hetong/chukou/add.html?editflag=edit&branch="+branch+"&tempTime="+new Date().getTime()
			});
			*/
            openTab('修改出口合同【<font color="red">'+params.contractName.substring(0,8)+(params.contractName.length>8?'...':'')+'</font>】',"hetong/chukou/add.html?editflag=edit&branch="+branch+"&tempId="+params.contractCode);
		} else {
			layer.msg("请选择一条数据进行编辑!");
		}
		processEvent(e);
	});

	//删除(此功能暂时未开放)
	$("#delete").on("click", function(e){
		var selectRows = $table.bootstrapTable("getSelections");
		selectRows = selectRows.map(function(item) {
			return item.examineStatus;
		});
		if(selectRows.indexOf("2")>=0){
			layer.msg("选中的出口合同存在审核已通过，不可删除!");
			return;
		}
		var selectRowsd = $table.bootstrapTable("getSelections");
		selectRowsd = selectRowsd.map(function(item) {
			return item.associatedState;
		});
		if(selectRowsd.indexOf("1")>=0){
			layer.msg("选中的出口合同已经关联采购合同，不可删除!");
			return;
		}
		layer.confirm("确定要删除吗?", {
			btn : [ "确定" ]
		}, function() {
			var selectRows = $table.bootstrapTable("getSelections");
			selectRows = selectRows.map(function(item) {
				return item.ckht;
			});
			var keys = selectRows.join(",");
			/*
			var ajaxIndex = "";
		    $.ajax({
		        url:"../../../../chuKouHeTong/delete",
		        type:"post",
		        dataType:"json",
		        data:{
		            "uuids":keys
		       },
		        success:function(result){
		        	
		        	//$table.bootstrapTable("remove", {
					//	field : "ckht",
					//	values : selectRows
					//});
		        	//parentTabWindow.refreshTable();
		        	 *
		        	$table.bootstrapTable("refresh",{pageNumber:1});
					layer.msg("删除成功!");
					closeLoading(ajaxIndex);
		       },
		       beforeSend : function(){
		       		ajaxIndex = showLoading();
		       }
		   })*/
			ajaxHelper("../../../../chuKouHeTong/delete",{"uuids":keys},function(result){
				//parentTabWindow.refreshTable();
	        	$table.bootstrapTable("refresh",{pageNumber:1});
				layer.msg("删除成功!");
			});
		});
		processEvent(e);
	});

	// 审核
	$("#shenhe").on("click",function(e){
		//单个审核 暂时不支持批量审核
		var selectRows = $table.bootstrapTable("getSelections");
		ckht = selectRows[0].ckht;
		examineStatus = selectRows[0].examineStatus;
		if (selectRows.length == 1) {
			/*
			openLayer({
				id : selectRows[0].ckht,
				ele:this,
				
				title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>出口合同审核【合同名称：<font color="red">'+selectRows[0].contractName+'</font>】',
				area :  [ "60%", "90%" ],
				url : "../../../pages/hetong/chukou/shenhe.html"
			});
			*/
			openTab('审核出口合同【<font color="red">'+selectRows[0].contractName.substring(0,8)+(selectRows[0].contractName.length>8?'...':'')+'</font>】',"hetong/chukou/shenhe.html?tempId="+selectRows[0].contractCode);
		} else {
			layer.msg("请选择一条数据进行审核!");
		}
		processEvent(e);
	});


	//查看详情
	$(document).on("click",".lookInfo", function(e){
		/*		
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口合同详情【合同名称：<font color="red">'+title+'</font>】',
			url : "../../../pages/hetong/chukou/detail.html"
		});
		*/
		/*
		layer.open({
			type : 2,
			skin : "myLayui", // 样式类名
			title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>查看出口合同信息【合同名称：<font color="red">'+params.contractName+'</font>】',
			area : ["98%","96%"],
			content : "../../../pages/hetong/chukou/add.html?editflag=detail&branch="+branch+"&tempTime="+new Date().getTime()
		});
		*/
		openTab('合同信息【<font color="red">'+params.contractName.substring(0,8)+(params.contractName.length>8?'...':'')+'</font>】',"hetong/chukou/add.html?editflag=detail&branch="+branch+"&tempId="+params.contractCode);
		processEvent(e);
	});

	//查看货物清单
	$(document).on("click",".searchBtn", function(e){
		var title = popupPreHandler(this,3);
		/*
		openLayer({
			ele:this,
			//id : $(this).attr("key"),
			title : '货物清单【合同名称：<font color="red">'+title+'</font>】',
			url : "../../hetong/chukou/goods.html?branch="+branch
		});
		*/
		openTab('货物清单【<font color="red">'+title.substring(0,8)+(title.length>8?'...':'')+'</font>】',"hetong/chukou/goods.html?branch="+branch+"&tempId="+params.contractCode);
		processEvent(e);
	});	

	//查看关联信息
	var glurl = "";
	/*
	if(branch == "0"){
		//关联采购合同
		glurl = "../../../pages/hetong/chukou/guanlian.html";
	}else{
		//关联补充合同
		glurl = "../../../pages/hetong/chukou/guanlian2.html";
	}
	*/
	if(branch == "0"){
		//关联采购合同
		glurl = "hetong/chukou/guanlian.html";
	}else{
		//关联补充合同
		glurl = "hetong/chukou/guanlian2.html";
	}
	
	$(document).on("click",".glBtn", function(e){
		var title = popupPreHandler(this,3);
		/*
		openLayer({
			ele:this,
			//id: $(this).attr("key"),
			title:'<i class="glyphicon glyphicon-random" style="padding-right:3px;font-size:12px;"></i>关联信息【合同名称：<font color="red">'+title+'</font>】',
			url:glurl
		});
		*/
		openTab('关联信息【<font color="red">'+title.substring(0,8)+(title.length>8?'...':'')+'</font>】',glurl+"?tempId="+params.contractCode);
		processEvent(e);
	});
});

function examineStatusFormatter(value,row,index){
    var title = "",className = "";
    switch(value){
        case "1":
            title = "审核未通过";
            className = "fa-times-circle text-danger";
            break;
        case "2":
            title = "审核已通过";
            className = "fa-check-circle-o text-success";
            break;
        default:
            title = "未审核";
            className = "fa-question-circle-o text-warning";
            break;
   }
    return '<a href="javascript:;"><span onclick="shenhe(\''+row.ckht+'\',\''+row.contractName+'\',\''+row.examineStatus+'\',\''+row.contractCode+'\')"><i title="'+title+'" class="fa '+className+'"></i></span></a>';
}

function shenhe(ckht,contractName,examineStatus,contractCode){
	/*
    openLayer({
        id : ckht,
        ele:this,
        
        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>出口合同审核【合同名称：<font color="red">'+contractName+'</font>】',
        area :  [ "60%", "90%" ],
        url : "../../../pages/hetong/chukou/shenhe.html?examineStatus="+examineStatus+"&ckht="+ckht
   });*/
	openTab('出口合同审核【<font color="red">'+contractName.substring(0,8)+(contractName.length>8?'...':'')+'</font>】',"hetong/chukou/shenhe.html?examineStatus="+examineStatus+"&ckht="+ckht+"&tempId="+contractCode);
}