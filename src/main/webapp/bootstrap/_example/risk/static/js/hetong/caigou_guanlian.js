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
                col : "signDate",
                label : "签订日期",
                type : "startEndDate",
                dates  : [
                    {name : "signTimeStart", text : "开始日期"},
                    {name : "signTimeEnd", text : "结束日期"}
                ]
            }
        ]
    },"query");
    //查询
    $("#thSearchBtn").on("click",function(){
        var contractCode = $("input[name='contractCode']:eq(0)").val();
        var signTimeStart = $("input[name='signTimeStart']:eq(0)").val();
        var signTimeEnd = $("input[name='signTimeEnd']:eq(0)").val();

        //初始化可以用于关联的出口合同
        $.ajax({
            url : "../../../../caiGouHeTong/findNotRelatedCkht",
            data : {
                "cght":parent.params.cght,
                "contractCode":contractCode,
                "signTimeStart":signTimeStart,
                "signTimeEnd":signTimeEnd
            },
            type : "post",
            dataType : "json",
            success : function(res){
                queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$chukouTable,queryParams:{},columns:ck_columns,height:300});
                parent.refreshTable();
            }
        });

        //初始化已经关联的出口合同
        $.ajax({
            url : "../../../../caiGouHeTong/findRelatedCkht",
            data : {"cght":parent.params.cght},
            type : "post",
            dataType : "json",
            success : function(res){
                queryData({data:{success:true,data:{thisPageElements:res}},$container:$chukouGlTable,queryParams:{},columns:ckgl_columns,height:300});
                parent.refreshTable();
            }

        });
    });


	var $chukouTable = $("#chukouTable");
	var $chukouGlTable = $("#chukouGlTable");
	
	var ck_columns = [
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
			title : '采购合同uuid',
			field : 'ckht',
			visible : false
		}
	];
	
	var ckgl_columns = [
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
			title : '采购合同uuid',
			field : 'ckht',
			visible : false
		}
	];

    //初始化可以用于关联的出口合同
    $.ajax({
        url : "../../../../caiGouHeTong/findNotRelatedCkht",
        data : {"cght":parent.params.cght},
        type : "post",
        dataType : "json",
        success : function(res){
            queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$chukouTable,queryParams:{},columns:ck_columns,height:300});
        }

    });
	//初始化已关联的出口合同
	// queryData({url:'../../../../exportContract/glcghtInit?cght='+parent.uuid,$container:$caigouGlTable,columns:cggl_columns});
    $.ajax({
        url : "../../../../caiGouHeTong/findRelatedCkht",
        data : {"cght":parent.params.cght},
        type : "post",
        dataType : "json",
        success : function(res){
            queryData({data:{success:true,data:{thisPageElements:res}},$container:$chukouGlTable,queryParams:{},columns:ckgl_columns,height:300});
        }

    });

	//关联
	$("#concatOne").on('click',function(){
		handlerCancat($chukouTable, $chukouGlTable);
	});
	//移除关联
	$("#removeConcat").on('click',function(){
		handlerCancat($chukouGlTable,$chukouTable);
	});
	
	//关联全部
	$("#concatAll").on('click',function(){
		handlerCancat($chukouTable, $chukouGlTable,true);
	});
	//移除全部关联
	$("#removeConcatAll").on('click',function(){
		handlerCancat($chukouGlTable,$chukouTable,true);
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
            url : "../../../../caiGouHeTong/saveAssociatedInfo",
            contenType:'application/json',
            type : "POST",
            data : getGlChuKouIds(),
            success : function (result) {
                if(result.success){
                    layer.msg("更新成功");
                    parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                    parent.refreshTable(); //刷新页面
                }else{
                    layer.msg("更新失败");
                }
            },
        });
	});
	
	//获取参数
	/*function getParams(params){
		params = {
				pageSize : this.pageSize,
				pageNumber : this.pageNumber,
				sortName : this.sortName,
				sortOrder : this.sortOrder
		};
		var uid = $("#uuid").val();
		if(uid){
			params.cght = uid;
		}
		return params;
	}*/
	
	//获取右侧关联合同号的编号数组
	function getGlChuKouIds(){
		return {
			cght : parent.params.cght,
            glckRows : $chukouGlTable.bootstrapTable('getData').map(function(item){return item.ckht;}).join(",")
		}
	}
	
});