var branch = parent.branch;
$(function(){
	if(typeof(serchParam.branch) != "undefined"){
		branch = serchParam.branch;
	}
    //初始化查询
	if(branch == '0'){
		//外贸
        formGenerator({
            container :  "advSearchBox",
            columns : [
                {
                    col : "contractCode",
                    type : "text",
                    label : "合同编号"
                },
                {
                    col : "buyerName",
                    type : "text",
                    label : "买方名称"
                }
            ]
        },"query");
	}else{
		//代理
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
                    label : "卖方名称"
                }
            ]
        },"query");
	}

    //查询
    $("#thSearchBtn").on("click",function(){

        var contractCode = $("input[name='contractCode']:eq(0)").val();
        var sellerName = $("input[name='sellerName']:eq(0)").val();
        var buyerName = $("input[name='buyerName']:eq(0)").val();

        //初始化可以用于关联的出口合同
        $.ajax({
            url : "../../../../wuLiuYunShu/findNotRelatedCkht",
            data : {
                "wlys":parent.params.wlys,
                "contractCode":contractCode,
                "sellerName":sellerName,
                "buyerName":buyerName,
				"branch":branch
            },
            type : "post",
            dataType : "json",
            success : function(res){
            	if(res.success){
                	queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:cg_columns,height:300});

            	}else{
            		layer.msg(res.msg)
                    queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:cg_columns,height:300});

                }
            },
			error:function(a,b,c){

			}
        });
        //初始化已关联的出口合同
        $.ajax({
            url : "../../../../wuLiuYunShu/findAssociatedCkht",
            data : {"wlys":parent.params.wlys},
            type : "post",
            dataType : "json",
            success : function(res){
            	debugger
                if(res.success){
                    queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$caigouGlTable,queryParams:{},columns:cggl_columns,height:300});

                }else{
                    layer.msg(res.msg);
                }
            }
        });


    });

	var $table = $("#table");
	var $caigouGlTable = $("#caigouGlTable");
	
	var cg_columns = [ 
		{
			// field : 'state',
			checkbox : true
		}, 
		{
			title : '合同编号',
			field : 'contractCode'
		}, 
		{
			title : '合同名称',
			field : 'contractName'
		},
		{
			title : '出口合同uuid',
			field : 'ckht',
			visible : false
		}
	];
	
	var cggl_columns = [ 
		{
			//field : 'state',
			checkbox : true
		}, 
		{
			title : '合同编号',
			field : 'contractCode'
		}, 
		{
			title : '合同名称',
			field : 'contractName'
		},
		{
			title : '出口合同uuid',
			field : 'ckht',
			visible : false
		}
	];

	//初始化可以用于关联的出口合同
	$.ajax({
		url : "../../../../wuLiuYunShu/findNotRelatedCkht",
		data : {
			"wlys":parent.params.wlys,
			"branch":branch
		},
		type : "post",
		dataType : "json",
		success : function(res){
			if(res.success){
                queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:cg_columns,height:300});
			}else{
				layer.msg(res.msg);
                queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$table,queryParams:{},columns:cg_columns,height:300});
            }
		}
		
	});
	
	//初始化已关联的出口合同
	$.ajax({
		url : "../../../../wuLiuYunShu/findAssociatedCkht",
		data : {"wlys":parent.params.wlys},
		type : "post",
		dataType : "json",
		success : function(res){
			if(res.success){
                queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$caigouGlTable,queryParams:{},columns:cggl_columns,height:300});
			}else{
				layer.msg(res.msg);
			}
		}
	});
	
	//$("#wlys").val(parent.params.wlys);
	
	//关联
	$("#concatOne").on('click',function(){
		handlerCancat($table, $caigouGlTable);
	});
	//移除关联
	$("#removeConcat").on('click',function(){
		handlerCancat($caigouGlTable,$table);
	});
	
	//关联全部
	$("#concatAll").on('click',function(){
		handlerCancat($table, $caigouGlTable,true);
	});
	//移除全部关联
	$("#removeConcatAll").on('click',function(){
		handlerCancat($caigouGlTable,$table,true);
	});
	
	
	//处理关联
	function handlerCancat(ele,target,isAll){
		
		if(isAll){
			ele.bootstrapTable('checkAll');
			var allSRows = ele.bootstrapTable('getAllSelections');
			target.bootstrapTable('append', allSRows);
			ele.bootstrapTable('removeAll');
		}else{
			var selectRows =  ele.bootstrapTable('getSelections');
			target.bootstrapTable('append', selectRows);
			selectRows = selectRows.map(function(item) {
				return item.ckht;
			});
			ele.bootstrapTable('remove', {
				field : 'ckht',
				values : selectRows
			});
		}
	}
	
	
	//点击确定
	$("#guablianSubBtn").on('click',function(){
		//更新关联状态
        $.ajax({
            url : "../../../../wuLiuYunShu/saveAssociatedInfoCkht",
            contenType:'application/json',
            type : "POST",
            data : getGlCaiGouIds(),
            success : function (result) {
                if(result.success){
                	layer.msg("更新成功");
                    parent.refreshTable(); //刷新页面
                }else{
                	layer.msg("更新失败");
                }
            },
        });
		
	});
	
	//获取右侧关联合同号的编号数组
	function getGlCaiGouIds(){
		return {
			wlys : parent.params.wlys,
			//glcgRows : JSON.stringify($caigouGlTable.bootstrapTable('getData'))
			glckRows : $caigouGlTable.bootstrapTable('getData').map(function(item){return item.ckht;}).join(",")
		}
	}
	
});