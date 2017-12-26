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
				col : "sellerName",
				type : "text",
				label : "供货商名称",
				xs: 6
			}
		]
	},"query");
	//查询
	$("#thSearchBtn").on("click",function(e){
		var contractCode = $("input[name='contractCode']:eq(0)").val();
		var sellerName = $("input[name='sellerName']:eq(0)").val();

		//初始化可以用于关联的采购合同
		$.ajax({
			url : "../../../../chuKouHeTong/findNotRelatedCght",
			data : {
				"ckht":parentTabWindow.params.ckht,
				"contractCode":contractCode,
				"sellerName":sellerName
			},
			type : "post",
			dataType : "json",
			success : function(res){
				queryData({data:{success:true,data:{thisPageElements:res}},$container:$table,queryParams:{},columns:cg_columns,height:300});
                //parent.refreshTable();
				finishCallback();
			}
		});

        //初始化已关联的采购合同
        $.ajax({
            url : "../../../../chuKouHeTong/findAssociatedCght",
            data : {"ckht":parentTabWindow.params.ckht},
            type : "post",
            dataType : "json",
            success : function(res){
                queryData({data:{success:true,data:{thisPageElements:res}},$container:$caigouGlTable,queryParams:{},columns:cggl_columns,height:300});
                //parent.refreshTable();
                finishCallback();
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
			field : "contractCode"
		}, 
		{
			title : "合同名称",
			field : "contractName"
		},
		{
			title : "采购合同uuid",
			field : "cght",
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
			field : "contractCode"
		}, 
		{
			title : "合同名称",
			field : "contractName"
		},
		{
			title : "采购合同uuid",
			field : "cght",
			visible : false
		}
	];
	
	//初始化可以用于关联的采购合同
	$.ajax({
		url : "../../../../chuKouHeTong/findNotRelatedCght",
		data : {"ckht":parentTabWindow.params.ckht},
		type : "post",
		dataType : "json",
		success : function(res){
			queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:cg_columns,height:300});
		}
	});
	
	//初始化已关联的采购合同
	$.ajax({
		url : "../../../../chuKouHeTong/findAssociatedCght",
		data : {"ckht":parentTabWindow.params.ckht},
		type : "post",
		dataType : "json",
		success : function(res){
			queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$caigouGlTable,queryParams:{},columns:cggl_columns,height:300});
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
				return item.cght;
			});
			ele.bootstrapTable("remove", {
				field : "cght",
				values : selectRows
			});
		}
	}
	
	
	//点击确定
	$("#guablianSubBtn").on("click",function(e){
		//更新关联状态
        $.ajax({
            url : "../../../../chuKouHeTong/saveAssociatedInfo",
            contenType:"application/json",
            type : "POST",
            data : getGlCaiGouIds(),
            success : function (result) {
                if(result.success){
                	parentTabWindow.layer.msg("更新成功");
                    //parent.refreshTable(); //刷新页面
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
			glcgRows : $caigouGlTable.bootstrapTable("getData").map(function(item){return item.cght;}).join(",")
			
		}
	}
	

});