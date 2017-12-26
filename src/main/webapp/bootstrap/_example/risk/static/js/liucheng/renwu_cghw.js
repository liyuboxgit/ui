//选择出口商品页面的iframe方式（已经不用）修改成了在本页面中操作
$(function(){
	ajaxHelper("../../../../caiGouHeTong/queryForList","",
		function(result){
			var options = [{text : "请选择", value : ""}];
			for(var i=0;i<result.data.length;i++){
				var item = result.data[i];
				options.push({value:item.cght,text:item.contractCode});
			}
			//初始化查询
			formGenerator({
				container :  "advSearchBox",
				columns : [
					{
						//col : "contractCode",
						col : "cght",
						label : "采购合同",
						type : "select",
						/*
						options  : [
							{text : "请选择", value : ""},
							{text : "英国", value : "英国"}
						]
						*/
						//options : getDictsExt("nation")
						options : options
					},
					{
						col : "goodsName",
						type : "text",
						label : "商品名称"
					}
				]
			},"query");
		}
	)
	
	//添加表头确定按钮
	/*addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "queDingChoose", content: "确定",className : "glyphicon glyphicon-plus"},
		]
	});*/
	
	//选择商品的货物清单
	var $goodsList = $("#goodsList");
	
	// 货物清单表头项
	var columns = [ 
		{
			align:'center',
			checkbox : true
		},
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){
				/*
				var pageNumber = $(".pagination .active").text();
				var pageSize = $(".pagination-detail .page-size").text();
				return pageSize * (pageNumber-1) + index + 1;
				 */
				//return index + 1;
				var page = $goodsList.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
			}
		},
		{
			title : '物资名称',
			field : 'goodsName',
			formatter: labelTrimFormatter
		}, 
		{
			title : '数量',
			field : 'numbers'
		}, 
		{
			title : '可分数量',
			field : 'kfNumber'
		}, 
		{
			title : '自己数量',
			field : 'zjNumber'
		}, 
		{
			title : '规格型号',
			field : 'itemType',
			formatter: labelTrimFormatter
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
		}, 
		{
			title : '供货方',
			field : 'supplier',
			formatter: labelTrimFormatter
		}
	];
	
	/*
	//货物清单测试数据
	var data = {
	    "success": true, 
	    "msg": null, 
	    "data": {
	        "pageSize": 10, 
	        "pageNo": 1, 
	        "totalCount": 5, 
	        "lastPageNo": 3, 
	        "nextPageNo": 2, 
	        "firstPage": false, 
	        "lastPage": false, 
	        "thisPageElements": [
	        	{
	    			"name": "电视监控系统配件 防爆液晶显示器 ",
	    			"number": 1,
	    			"guige": "X-000",
	    			"danwei": "套",
	    			"oneMoney": 9662.39,
	    			"totalMoney": 9662.39,
	    			"company": "南京某自动化系统工程有限公司"
	    		},
	    		{
	    			"name": "电视监控系统配件 控制器内变压器 ",
	    			"number": 2,
	    			"guige": "ZJYP-4-2 220VAC/15VAC",
	    			"danwei": "套",
	    			"oneMoney": 146.16,
	    			"totalMoney": 292.32,
	    			"company": "南京某自动化系统工程有限公司"
	    		},
	    		{
	    			"name": "40钻机橡胶配件 ZJ40 钻井平台防滑板 ",
	    			"number": 50,
	    			"guige": "510*510*30 天然橡胶",
	    			"danwei": "件",
	    			"oneMoney": 1074.23,
	    			"totalMoney": 53711.54,
	    			"company": "宝鸡某石油机械厂"
	    		},
	    		{
	    			"name": "铜芯塑料绝缘电力电缆 VVR ",
	    			"number": 0.6,
	    			"guige": "3*6+1*4mm21kVGB/T127*⑴",
	    			"danwei": "km",
	    			"oneMoney": 13569.23,
	    			"totalMoney": 8141.54,
	    			"company": "扬州某点电缆股份有限公司"
	    		},
	    		{
	    			"name": "铜芯塑料绝缘电力电缆 VVR ",
	    			"number": 0.2,
	    			"guige": "3*2.5+1*1.50.6/1kV GB/*⑴",
	    			"danwei": "km",
	    			"oneMoney": 7634.85,
	    			"totalMoney": 1526.97,
	    			"company": "扬州某点电缆股份有限公司"
	    		}
	        ], 
	        "thisPageLastElementNumber": 20, 
	        "previousPageNo": 0, 
	        "thisPageFirstElementNumber": 11
	    }
	};
	*/
	
	//查询
	$("#thSearchBtn").on("click",function(){
		//queryData({data:data,$container:$goodsList,height:284});
		queryData({url:"../../../../caiGouHeTong/querySelectedCkhthwList",$container:$goodsList,columns:columns,pageList:[5,10],pageSize:5,height:284});
	}).trigger("click");
	
	//删除
	$("#cacel").on("click",function(){
		var selectRows = $goodsList.bootstrapTable('getSelections');
		layer.confirm('确定要删除吗?', {
			btn : [ "确定" ]
		}, function() {
			//var selectRows = $goodsList.bootstrapTable('getSelections');
			var rowName=selectRows.map(function(item) {
				return item.name;
			});
			$goodsList.bootstrapTable('remove', {
				field : 'name',
				values : rowName
			});
			
			layer.msg('删除成功!');
			//var keys = selectRows.join(",");
			/*
		    $.ajax({
		        url:'../../../../exportContract/delCkht',
		        type:'post',
		        dataType:'json',
		        data:{
		            "uuids":keys
		        },
		        success:function(result){
		        	
		        	$table.bootstrapTable('remove', {
						field : 'ckht',
						values : selectRows
					});
					
					layer.msg('删除成功!');
					
		        }
		    })
		    */
		    
		});
	});
	
	//确定
	$("#queDingChoose").on("click",function(){
		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		parent.refreshTable(); //刷新页面
	});
	
	
	//添加或修改保存
	$("#saveOrUupdateBtn").on("click",function(e){
		if($('#addInfoForm').validate().form()){
		    var data = $("#addInfoForm").serialize();
		    var uuid = $("#addInfoForm input[name='ckht']").val();
		    if(uuid == ''){
		    	//前往新增
		        $.ajax({
		            url : "../../../../exportContract/editCkht",
		            contenType:'application/json',
		            type : "POST",
		            data : data,
		            success : function (result) {
		                if(result.success){
		                	parent.layer.msg("添加成功");
		                }else{
		                	parent.layer.msg("添加失败");
		                }
	            		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	            		parent.refreshTable(); //刷新页面
		            }
		        });
		        
		    } else {
		  	  //前往修改
		        $.ajax({
		            url : "../../../../exportContract/editCkht",
		            contenType:'application/json',
		            type : "POST",
		            data : data,
		            success : function (result) {
		                if(result.success){
		                	parent.layer.msg("修改成功");
		                }else{
		                	parent.layer.msg("修改失败");
		                }
	            		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	            		parent.refreshTable(); //刷新页面
		            }
		        });
		    }
		} 
	});
	
});