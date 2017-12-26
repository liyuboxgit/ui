var key = 'dbtsk';
//表格标题项
var columns = [ {
		checkbox : true
	},{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},{
		title : '税收收入退还书号码',
		align:'center',
		field : 'thsh',
		formatter : lookInfoFormatter
	}, {
		title : '代办退税总税额',
		align:'left',
		field : 'dbtse'
	}, {
		title : '暂缓退税总税额',
		align:'left',
		field : 'zhtse'
	}, {
		title : '税收收入退还书金额',
		align:'center',
		field : 'thje'
	}, {
		title : '反馈日期',
		align:'left',
		field : 'fkrq'
	}, {
    title : '经办人',
        align:'left',
        field : 'jbr'
	}
];


$(function(){
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "thsh",
				type : "text",
				label : "税收收入退还书号码"
			},
			{
				col : "thje",
				label : "税收收入退还书金额范围",
				type : "startEndMoney",
				dates  : [
					{name : "thjeMix", text : "最小值"},
					{name : "thjeMax", text : "最大值"}
				]
			},
			{
				col : "fkrq",
				label : "反馈日期范围",
				type : "startEndDate",
				dates  : [
					{name : "fkrqStart", text : "开始日期"},
					{name : "fkrqEnd", text : "结束日期"}
				]
			},
			{
				col : "nsrsbh",
				label : "生产企业纳税人识别号",
				type : "text"
			},
			{
				col : "nsrmc",
				label : "生产企业名称",
				type : "text"
			}
		]
	},"query");
	
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"},
            {id: "export", content: "导出",className : "glyphicon glyphicon-export"},
			{id: "delete", content: "删除",className : "glyphicon glyphicon-trash"}
		]
	});
	
	//查询
	$("#thSearchBtn").bind("click",function(){
		queryData("../../../dbtsk/getlist");
	}).trigger("click");
	
	//预览打印（导出）
	$(document).on("click","#export",function(){
		var selectRows = $table.bootstrapTable('getSelections');
		var selectKey = selectRows.map(function(item) {
			return item.dbtsk;
		});
		if (selectRows.length === 1) {
			//可以点击一个按钮事件触发下面的代码进行导出
			window.open("../../../dbtsk/exceldbtsk?dbtsk="+selectKey,"_blank");
		}else {
			// layer.msg("请选择一条数据进行打印!");
			layer.msg("请选择一条数据进行导出!");
		}
	})
	
	//删除
	$(document).on('click', '#delete', function() {
		
		var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length >= 1) {
            layer.confirm('确定要删除吗?', {
                btn : [ "确定" ]
            }, function() {
                var selectRows = $table.bootstrapTable('getSelections');
                selectRows = selectRows.map(function(item) {
                    return item.dbtsk;
                });
                var keys = selectRows.join(",");
                $.ajax({
                    url:'../../../dbtsk/deletedbtsk',
                    type:'post',
                    dataType:'json',
                    data:{
                        "dbtsk":keys,
                        "state":"0"
                    },
                    success:function(result){
                        $table.bootstrapTable('remove', {
                            field : 'dbtsk',
                            values : selectRows
                        });

                        layer.msg('删除成功!');
                    }
                })
            });
        }else {
            layer.msg("请选择一条数据进行删除!");
        }

	});

	
	//查看详情
	$(document).on("click",".lookInfo", function(){
		var title = params.thsh;
		layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>查看退税款明细信息【税收收入退还书号码：<font color="red">' + title + '</font>】',
            area : [ "98%", "96%" ],
			content : "../../pages/mingxi/add.html?editflag=detail&mark=update&tempTime="+new Date().getTime(),
			success : function(layero, index) {
			   var currentFrame = layero.find("iframe")[0].contentWindow.document;
/*				   $.ajax({
			        url:'../../../dbtsk/querydbtsk',
			        type:'GET',
			        dataType:'json',
			        data:{
			            "dbtsk":selectRows[0].dbtsk
			        },
			        success:function(result){
//			        	debugger;
			        	console.log(result);
			           $("#addInfoForm input[name='wlys']",currentFrame).val(selectRows[0].wlys);
		               setFormData('addInfoForm',currentFrame,result.data);
			           $.each(result.data,function(k,v){
			        	   $("#addInfoForm :input[name="+k+"]",currentFrame).val(v);
			           });
			            
			        }
			    })*/
			   $.each(params,function(k,v){
	        	   $("#addInfoForm :input[name="+k+"]",currentFrame).val(v);
	           });
			}
		});
		
	});

	//新增
	$(document).on("click", "#add", function() {
		var title = popupPreHandler(this,3);
		openLayer({
			ele:this,
//			id : $(this).attr("key"),
            area : [ "98%", "96%" ],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>新增代办退税税款明细',
			url : "../../pages/mingxi/add.html?mark=add"
		});
	})
	
	
	
	//修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			var title = params.thsh;
			layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : '<i class="glyphicon glyphicon-pencil" style="padding-right:3px;font-size:12px;"></i>修改退税款明细【税收收入退还书号码：<font color="red">' + title + '</font>】',
                area : [ "98%", "96%" ],
				//offset : 't',
				//move : false,
				content : "../../pages/mingxi/add.html?mark=update",
				success : function(layero, index) {
				   var currentFrame = layero.find("iframe")[0].contentWindow.document;
/*				   $.ajax({
				        url:'../../../dbtsk/querydbtsk',
				        type:'GET',
				        dataType:'json',
				        data:{
				            "dbtsk":selectRows[0].dbtsk
				        },
				        success:function(result){
//				        	debugger;
				        	console.log(result);
				           $("#addInfoForm input[name='wlys']",currentFrame).val(selectRows[0].wlys);
			               setFormData('addInfoForm',currentFrame,result.data);
				           $.each(result.data,function(k,v){
				        	   $("#addInfoForm :input[name="+k+"]",currentFrame).val(v);
				           });
				            
				        }
				    })*/
				   $.each(selectRows[0],function(k,v){
		        	   $("#addInfoForm :input[name="+k+"]",currentFrame).val(v);
		           });
				}
			});
		} else {
			layer.msg("请选择一条数据进行编辑!");
		}
	});
	
});