/*
海关代码库ID	hgdmk	
商品代码	cmcode	
标准商品全名	stan_name	
标准商品标识	stan_name_flag	
商品名称	cmname	
商品类别	goods_type	
单位代码	unit_code	
标准单位标识	stan_unit_flag	
单位	unit_name
标志	remark	
备注	memo	
基本商品标志	base_flag
特殊商品标识	special_flag	
退税率	tsl		
征税率	zsl		
从量定额征税	cldezs	
从价定律征税	cjdlzs	
税种	sz	
结束时间	end_time		
开始时间	sta_time
*/
/*
var  hgspdmkArray = [];
$.ajax({
    url:"../../../../lcygdsh/selectAll",
    type:"POST",
    dataType:"json",
    data:{},
    success:function(result){
    	hgspdmkArray = result.data;
    }
});
*/

/**
 @author 周小建
 @time 2017-11-01
 @description “海关商品代码库”表格列配置
 */
var hgColumns = [
	{
		title : "序号",
		align:"center",
		width : 20,
		formatter : function(value,row,index){
			return index + 1;
		}
	},
	{
		title : "商品编号",
		align:"left",
		field : "cmcode"
	},
	{
		title : "商品名称",
		align:"left",
		field : "stanName",
		formatter : function(value,row,index){
			if(value && value.length>50){
				value = value.substring(0,50)+"...";
			}
			return value;
		}
	}, 
	{
		title : "单位",
		align:"center",
		field : "stanUnitFlag"
	},
	{
		title :"商品类别",
		field :"goodsType"
	},
	{
		title : "退税率",
		align:"center",
		field : "tsl"
	}, 
	{
		title : "征税率",
		align:"center",
		field : "zsl"
	},
	{
		title : "税种",
		align:"center",
		field : "sz"
	}
];

$(function(){
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “海关商品代码库”表格
	 */
	var $hgTable = $("#hgTable");
	//var selection=parent.selectionHg;
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “海关商品代码库”表格选中行
	 */
	var selection=null;
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “海关商品代码库”表格查询区域的按钮
	 */
	var $buttons = $("#hgSearchBox").next().find("button");
	
	//查询出这条出口货物对应的多条海关商品
	//alert(parent.params.goodsCode);
	/*var type = document.baseURI.split("?")[1].split("=")[1];
	alert(type);*/
    $.ajax({
        url : "../../../../kptzd/findHgspm",
        type : "post",
        data : {"exp_time":parent.params.expTime,"spbm":parent.params.goodsCode},
        dataType : "json",
        success : function(res){
        	////////////////////////
        	var shuju = [{
        			"cmcode": "A",
        			"stanName":"电视监控系统配件 防爆液晶显示器",
        			"legalNum": 1,
        			"specificationModel": "X-000",
        			"unitName": "套",
        			"unitPrice": 9662.39,
        			"destinationAreaName" : "美国",
        			"totalPrice": 9662.39,
        			"currency" : "人民币",
        			"tsl": "10%",
        			"company": "扬州某点电缆股份有限公司",
        			"checked": true
        		},
        		{
        			"cmcode":"B",
        			"stanName": "电视监控系统配件 控制器内变压器 ",
        			"legalNum": 2,
        			"specificationModel": "ZJYP-4-2 220VAC/15VAC*⑴",
        			"unitName": "套",
        			"unitPrice": 146.16,
        			"destinationAreaName" : "英国",
        			"totalPrice": 292.32,
        			"currency" : "人民币",
        			"tsl": "10%",
        			"company": "南京某自动化系统工程有限公司",
        			"checked" : "aaa"
        		}];
        	////////////////////////
            //queryData({columns:hgColumns,data:{success:true,data:{thisPageElements:shuju}},$container:$hgTable,height:415,
        	queryData({columns:hgColumns,data:{success:true,data:{thisPageElements:res.data}},$container:$hgTable,height:415,
            	onClickRow : function(row,$element,field){
					selection = row;
					$element.closest("tbody").find("td").css("backgroundColor","");
					$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
				},
            	onDblClickRow :function(row,$element,field){
					this.onClickRow(row,$element,field);
					$buttons.eq(2).click();
				}
            });
        }
    });
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “海关商品代码库”确定按钮的单击事件处理函数，将选中行回传给“已选取的海关商品代码库”。
	 */
	$buttons.eq(2).on("click",function(){
		//var selectRows = $hgTable.bootstrapTable('getSelections');
		//var cmcode = selectRows[0].cmcode;
		var cmcode = selection.cmcode;
		if(selection == null){
			layer.msg("请选择一条海关代码！");
			return;
		}else{
			/*
			 // 更新父页面中选中的行
			parent.$("#classifyedTable").bootstrapTable("updateRow",{
				index: parent.updateRowIndex,
				row:{goodsCode:selection.cmcode}
			});
			*/
			// 改变父页面中选中的行的背景色
			//parent.$("#classifyedTable").find("tbody tr:eq('"+parent.updateRowIndex+"')").find("td").css("backgroundColor","red");
			
			$.ajax({
		        url : "../../../../kptzd/editCkhw",
		        type : "post",
		        data : {"cmcode":cmcode,"spbm":parent.params.goodsCode,"rwbh":parent.lcparams.rwbh},//海关代码库中的code，报关单上的code
		        dataType : "json",
		        success : function(res){
		        	if(res.success){
		        		$("#cmcode",window.parent.document).val(cmcode);
		        		parent.$("#classifyedTable").find("tbody tr:eq('"+parent.updateRowIndex+"')").find("td").addClass("bg-danger");
						parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		        	}else{
		        		parent.layer.msg("操作失败!");
		        	}
		        }
		    });
			
		}
	});
});