$(function(){
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "htbh",
				type : "text",
				label : "合同编号"
			},
			{
				col : "wtfmc",
				type : "text",
				label : "委托方名称"
			}
		]
	},"query");
	//查询
	$("#thSearchBtn").on("click",function(e){

		var htbh = $("input[name='htbh']:eq(0)").val();
		var wtfmc = $("input[name='wtfmc']:eq(0)").val();

		//初始化可以用于关联的采购合同
		$.ajax({
			url : "../../../../chuKouHeTong/findNotRelatedBcht",
			data : {
				"ckht":parentTabWindow.params.ckht,
				"htbh":htbh,
				"wtfmc":wtfmc
			},
			type : "post",
			dataType : "json",
			success : function(res){
				if(res.success){
                    queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:cg_columns,height:300});
                    //parentTabWindow.refreshTable();
                    finishCallback();
                }else{
                    layer.msg("查询失败");
                }
			}
		});

        //初始化已关联的采购合同
        $.ajax({
            url : "../../../../chuKouHeTong/findAssociatedBcht",
            data : {"ckht":parentTabWindow.params.ckht},
            type : "post",
            dataType : "json",
            success : function(res){
                if(res.success){
                    queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$caigouGlTable,queryParams:{},columns:cggl_columns,height:300});
                    //parentTabWindow.refreshTable();
                    finishCallback();
                }else{
                    layer.msg("查询失败");
                }
            }

        });
		processEvent(e);
	});
	
	
	
	var $table = $("#table");
	var $caigouGlTable = $("#caigouGlTable");
	
	var cg_columns = [ 
		{
			//field : "state",
			checkbox : true
		}, 
		{
			title : "合同编号",
			field : "htbh"
		}, 
		{
			title : "合同名称",
			field : "htmc"
		},
		{
			title : "补充合同uuid",
			field : "bcht",
			visible : false
		}
	];
	
	var cggl_columns = [ 
		{
			//field : "state",
			checkbox : true
		}, 
		{
			title : "合同编号",
			field : "htbh"
		}, 
		{
			title : "合同名称",
			field : "htmc"
		},
		{
			title : "补充合同uuid",
			field : "bcht",
			visible : false
		}
	];
	
	//初始化可以用于关联的采购合同
	$.ajax({
		url : "../../../../chuKouHeTong/findNotRelatedBcht",
		data : {"ckht":parentTabWindow.params.ckht},
		type : "post",
		dataType : "json",
		success : function(res){
			if(res.success){
                queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:cg_columns,height:300});
			}else{
                layer.msg("查询失败");
            }
		}
	});
	
	//初始化已关联的采购合同
	$.ajax({
		url : "../../../../chuKouHeTong/findAssociatedBcht",
		data : {"ckht":parentTabWindow.params.ckht},
		type : "post",
		dataType : "json",
		success : function(res){
			if(res.success){
                queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$caigouGlTable,queryParams:{},columns:cggl_columns,height:300});
            }else{
				layer.msg("查询失败");
			}
		}
		
	});
	//关联
	$("#concatOne").on("click",function(e){
		handlerCancat($table, $caigouGlTable);
		processEvent(e);
	});
	//移除关联
	$("#removeConcat").on("click",function(e){
		handlerCancat($caigouGlTable,$table);
		processEvent(e);
	});
	
	//关联全部
	$("#concatAll").on("click",function(e){
		handlerCancat($table, $caigouGlTable,true);
		processEvent(e);
	});
	//移除全部关联
	$("#removeConcatAll").on("click",function(e){
		handlerCancat($caigouGlTable,$table,true);
		processEvent(e);
	});
	
	//处理关联
	function handlerCancat(ele,target,isAll){
		if(isAll){
			ele.bootstrapTable("checkAll");
			var allSRows = ele.bootstrapTable("getAllSelections");
			target.bootstrapTable("append", allSRows);
			ele.bootstrapTable("removeAll");
		}else{
			var selectRows =  ele.bootstrapTable("getSelections");
			target.bootstrapTable("append", selectRows);
			selectRows = selectRows.map(function(item) {
				return item.bcht;
			});
			ele.bootstrapTable("remove", {
				field : "bcht",
				values : selectRows
			});
		}
	}
	
	
	//点击确定
	$("#guablianSubBtn").on("click",function(e){
		//更新关联状态
        $.ajax({
            url : "../../../../chuKouHeTong/saveAssociatedInfoBcht",
            contenType:"application/json",
            type : "POST",
            data : getGlCaiGouIds(),
            success : function (result) {
                if(result.success){
                	parentTabWindow.layer.msg("更新成功");
                    //parentparentWindowshTable(); //刷新页面
                    finishCallback();
                }else{
                    layer.msg("更新失败");
                }
            }
        });
        processEvent(e);
	});
	
	//获取右侧关联合同号的编号数组
	function getGlCaiGouIds(){
		return {
			ckht : parentTabWindow.params.ckht,
			//glcgRows : JSON.stringify($caigouGlTable.bootstrapTable("getData"))
			glcgRows : $caigouGlTable.bootstrapTable("getData").map(function(item){return item.bcht;}).join(",")
			
		}
	}
	

});