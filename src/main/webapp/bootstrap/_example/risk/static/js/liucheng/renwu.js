var key = "rwbh";
var rwbh="";
var currentSelectRow = null;
var columns = [ //表格标题项
	{
		align:"center",
		checkbox : true
	}, 
	{
		title : "序号",
		align:"center",
		formatter : function(value,row,index){
			/*
			var pageNumber = $(".pagination .active").text();
			var pageSize = $(".pagination-detail .page-size").text();
			return pageSize * (pageNumber-1) + index + 1;
			 */
			//return index + 1;
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : "任务编号",
		align:"left",
		field : "rwbh",
		formatter0 : lookInfoFormatter
	},
	{
		title : "任务名称",
		align:"left",
		field : "taskName"
		//formatter : lookInfoFormatter
	}, 
	{
		title : "出口国别",
		align:"center",
		field : "destinationAreaName"
	}, 
	{
		title : "出口口岸",
		align:"center",
		field : "exportPortName"
	}, 
	/*
	{
		title : "业务类型",
		align:"center",
		field : "type"
	},
	{
		title : "运输方式",
		align:"center",
		field : "yunshufangshi"
	}, 
	{
		title : "当前环节",
		align:"center",
		field : "huanjie"
	}, 
	*/
	{
		title : "发起人",
		align:"center",
		field : "createName"
	}, 
	{
		title : "发起时间",
		align:"center",
		field : "createTime"
	},
	{
        title : "当前环节",
        align:"left",
        field : "dqhj",
        formatter : function (value,row,index) {
			if(value=="0"){
				return "待处理";
			}else if(value=="1"){
                return "预关单审核";
			}else if(value=="2"){
                return "报关单审核";
            }else if(value=="3"){
                return "开票通知";
            }else if(value=="4"){
                return "收票确认";
            }else if(value=="5"){
                return "发票认证";
            }else if(value=="6"){
                return "申报";
			}else if(value=="7"){
                return "备案";
            }else if(value=="10"){
				return "处理完毕";
			}
        }
    },
	{
		title : "操作",
		align : "center",
		field : "dqhj",
		//formatter : operationFormatter
		formatter : function(value,row,index){
			if(value=="0"){
                return '<a href="javascript:void(0);" class="handleBtn">处理</a>';
            }else {
                return '<a href="javascript:void(0);" class="handleBtn">查看</a>';
			}
		}
	}
];

$(function(){
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "rwbh",
				type : "text",
				label : "任务编号"
			},
            {
                col : "taskName",
                type : "text",
                label : "任务名称"
            },
			{
				col : "destinationAreaName",
				label : "出口国别",
				type : "select",
				options : getDictsExt("nation")
			},
			{
				col : "exportPortName",
				label : "出口口岸",
				type : "select",
				options : getDictsExt("exportPortName")
			},
			{
				col : "serviceType",
				label : "贸易方式",
				type : "select",
				options : getDictsExt("maoyifs")
			},
			{
				col : "transportMode",
				label : "运输方式",
				type : "select",
				options : getDictsExt("transportMode")
			},
			{
				col : "dqhj",
				label : "当前环节",
				type : "select",
				// options : getHuanJie()
				options : getDqhj()
			},
			/*
			{
				col : "examineStatus",
				label : "发起时间",
				type : "startEndDate",
				dates  : [
					{name : "signDateStart", text : "开始日期"},
					{name : "signDateEnd", text : "结束日期"}
				]
			}
			*/
		]
	},"query");
	
	setselect2("select[name='destinationAreaName']");
	setselect2("select[name='exportPortName']");
	setselect2("select[name='serviceType']");
	setselect2("select[name='transportMode']");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"},
			{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"}
		]
	});
	
	//查询
	$("#thSearchBtn").bind("click",function(e){
		queryData("../../../renwu/findPageByCondition?branch="+serchParam.branch);
		processEvent(e);
	}).trigger("click");

	//添加
	$("#add").bind("click", function(e){
		currentSelectRow = null;
		/*
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加',
			//area : ["80%","85%"],
			url : "../../pages/liucheng/zhangsan/renwu_edit.html"
		});
		*/
		openTab("添加任务","liucheng/zhangsan/renwu_edit.html");
		processEvent(e);
	});
	
	/*
	$("#add").bind("click", function(){
		currentSelectRow = null;
		window.parent.setParentWindow('添加', '../../pages/liucheng/zhangsan/renwu_edit.html', 500, 400);
	});
	*/

	//修改
	$("#update").bind("click",function(e){
		var selectRows = $table.bootstrapTable("getSelections");
		if(selectRows.length === 1){
			currentSelectRow = selectRows[0];
            $.ajax({
                url:"../../../renwu/checkUpdate",
                type:"post",
                dataType:"json",
                data:{rwbh:currentSelectRow.rwbh},
                success:function(result){
                   if(result.success){
                       /*
                       layer.open({
                           type : 2,
                           skin : "myLayui", // 样式类名
                           title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改任务【任务名称：<font color="red">'+selectRows[0].taskName+'</font>】',
                           area : ["98%","96%"],
                           content : "../../pages/liucheng/zhangsan/renwu_edit.html?tempTime="+new Date().getTime(),
                           success : function(layero,index){
                               //var currentFrame = layero.find("iframe")[0].contentWindow.document;
                               //setFormData("renWuForm",currentFrame,selectRows[0]);
							   
								$.ajax({
								url:"../../../renwu/selectByPrimaryKey",
								type:"GET",
								dataType:"json",
								data:{rwbh:selectRows[0].rwbh},
								success:function(result){
								$("#addInfoForm input[name='rwbh']",currentFrame).val(selectRows[0].rwbh);
								setFormData('renWuForm',currentFrame,result.data)
								}
								});
								
							   
								ajaxHelper("../../../renwu/selectByPrimaryKey",{rwbh:selectRows[0].rwbh},function(result){
								setFormData("renWuForm",currentFrame,selectRows[0]);
								});
								
                           }
                       });
                       */
                   		openTab('修改任务【<font color="red">'+selectRows[0].taskName.substring(0,8)+(selectRows[0].taskName.length>8?'...':'')+'</font>】',"liucheng/zhangsan/renwu_edit.html?tempId="+selectRows[0].rwbh);	
				   }else {
                       currentSelectRow = null;
                       layer.msg(result.msg);
				   }
                }
            });


		}else{
			currentSelectRow = null;
			layer.msg("请选择一条数据进行编辑!");
		}
		processEvent(e);
	});

	//删除
	$("#delete").bind("click", function(e){
		layer.confirm("确定要删除吗?",{btn :["确定"]},function(){
			var selectRows = $table.bootstrapTable("getSelections").map(function(item){return item.rwbh;});
			/*
			$table.bootstrapTable("remove",{
				field : "rwbh",
				values : selectRows
			});
			$table.bootstrapTable("refresh",{pageNumber:1});
			layer.msg("删除成功!");
			*/
			
			var keys = selectRows.join(",");
		    $.ajax({
		        url:"../../../renwu/delete",
		        type:"post",
		        dataType:"json",
		        data:{rwbhs:keys,branch:serchParam.branch},
		        success:function(result){
		        	$table.bootstrapTable("remove",{
						field : "rwbh",
						values : selectRows
					});
					$table.bootstrapTable("refresh",{pageNumber:1});
					layer.msg(result.msg);
		        }
		    });
		});
		processEvent(e);
	});

	//查看详情
	$(document).on("click", ".lookInfo",function(e) {
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>任务详情【任务名称：<font color="red">'+params.taskName+'</font>】',
			url : "../../pages/liucheng/detail.html"
		});
		processEvent(e);
	});
	
	//角色名称
	var name = sessionStorage.getItem("name");
	//不同的处理页面
	var handleUrl = "";
	switch(name){
		case "张三":
			//handleUrl = "../../pages/liucheng/zhangsan/handle.html";
			handleUrl = "liucheng/zhangsan/handle.html";
			break;
		case "李四":
			//handleUrl = "../../pages/liucheng/lisi/handle.html";
			handleUrl = "liucheng/lisi/handle.html";
			break;
		case "王五":
			//handleUrl = "../../pages/liucheng/wangwu/handle.html";
			handleUrl = "liucheng/wangwu/handle.html";
			break;
		case "赵六":
			//handleUrl = "../../pages/liucheng/zhaoliu/handle.html";
			handleUrl = "liucheng/zhaoliu/handle.html";
			break;
		case "田七":
			//handleUrl = "../../pages/liucheng/tianqi/handle.html";
			handleUrl = "liucheng/tianqi/handle.html";
			break;
		case "钱八":
			//handleUrl = "../../pages/liucheng/qianba/handle.html";
			handleUrl = "liucheng/qianba/handle.html";
			break;
		case "郑九":
			//handleUrl = "../../pages/liucheng/zhengjiu/handle.html";
			handleUrl = "liucheng/zhengjiu/handle.html";
			break;
		default:
			//handleUrl = "../../pages/liucheng/zhangsan/handle.html";
			handleUrl = "liucheng/zhangsan/handle.html";
			break;
	}
	
	//处理操作
	$(document).on("click",".handleBtn",function(e){
		/*
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-tasks" style="padding-right:3px;font-size:12px;"></i>处理【任务名称：<font color="red">'+params.taskName+'</font>】',
			area : ["100%","100%"],
			url : handleUrl+"?rwbh="+params.rwbh+"&xyybgd="+params.xyybgd + "&dqhj="+params.dqhj+"&jggwBm"+serchParam.jggwBm+"&znDm"+serchParam.znDm
		});
		*/
		openTab('【任务名称：<font color="red">'+params.taskName+'</font>】',handleUrl+"?rwbh="+params.rwbh+"&xyybgd="+params.xyybgd + "&dqhj="+params.dqhj+"&jggwBm"+serchParam.jggwBm+"&znDm"+serchParam.znDm);
		
		processEvent(e);
	});
    //当前环节
    function getDqhj(){
        return [
            {text:"请选择",value:""},
            {text:"待处理",value:"0"},
            {text:"预关单审核",value:"1"},
            {text:"报关单审核",value:"2"},
            {text:"开票通知",value:"3"},
            {text:"收票确认",value:"4"},
            {text:"发票认证",value:"5"},
            {text:"申报",value:"6"},
            {text:"备案",value:"7"},
            {text:"处理完毕",value:"10"}

        ];
    }
});