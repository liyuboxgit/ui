var key = "bgd", bgdWithOneServiceType = true;
$(function(){
	
	addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "ok", content: "确定",className : "glyphicon glyphicon-export"}
        ]
    });
	var $table = $("#table");
	var $ok = $("#ok"); //确定按钮
	var selectRowData = null; //点击选择的行数据
	var columns = [
		{
			checkbox : true,
			class : "hide"
		},
		{
	        title : "序号",
	        align:"center",
	        formatter : function(value,row,index){
	        	return index+1;
	        }
		},{
			title : "海关代码id",
			field : "hgdmk",
			visible : false
		},
		{
			title : "关单号id",
			field : "bgd",
			visible : false
		},
		{
		    title : "商品编码",
		    field : "cmcode"
		}, 
		{
		    title : "商品名称",
		    field : "cmname",
		    formatter : function(value,row,index){
		    	return labelTrimFormatter(value,row,index,15);
		    }
		}, 
		{
		    title : "有效期开始",
		    field : "staTime"
		}, 
		{
		    title : "有效期结束",
		    field : "endTime"
		}, 
		{
		    title : "征税率",
		    field : "zsl"
		}, 
		{
		    title : "退税率",
		    field : "tsl"
		},
		{
		    title : "单位",
		    field : "unitName",
		    class : "hide"
		}
	];
	
	var bgdId = parentTabWindow.params.BGD;
	var GOODS_CODE = parentTabWindow.params.GOODS_CODE;
	
    tableListInit();
    function tableListInit(){
    	ajaxHelper("../../../../sbpcdl/queryChooseCode?bgd="+bgdId+"&cmcode="+GOODS_CODE,{},function(result){
    		var arr = [];
    		if(result.success && result.data && result.data.length>0){
    			arr = result.data
    		}
    		queryData({	
    			data: {data:{thisPageElements:arr}},
    			$container : $table,
    	    	columns : columns,
    	    	height : 340,
    	    	singleSelect : true,
    	    	onClickRow : function(row,$element,field){
    	    		selectRowData = row;
    	    		$element.closest("tbody").find("td").css("backgroundColor","");
    	    		$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
    	    	},
    	    	onDblClickRow : function(row,$element,field){
    	    		this.onClickRow(row,$element,field);
    	    		$ok.click();
    	    	}
    		});
		});
    }
    
    //确定按钮
	$ok.on("click",function(e){
        if (selectRowData == null) {
        	layer.msg("请选择一个商品代码!");
        } else {
            parentTabWindow.$("#tableList").bootstrapTable("updateByUniqueId",{
        		id : parentTabWindow.params.BGDMX,
        		row : {
        			yxzCode : selectRowData.cmcode,
        			hgdmk : selectRowData.hgdmk,
        			unitName : selectRowData.unitName
        		}
        	}).bootstrapTable("uncheckAll");
            //parentTabWindow.layer.close(parentTabWindow.layer.getFrameIndex(window.name));//成功后关闭页面
            finishCallback();
        }
        processEvent(e);
	});
});
