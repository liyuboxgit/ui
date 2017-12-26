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

var columns = [
	/*
	{
		align:"center",
		checkbox : true
	},
	*/ 
	{
		title : "序号",
		align:"center",
		width : 20,
		formatter : function(value,row,index){
			/*
			var pageNumber = $(".pagination .active").text();
			var pageSize = $(".pagination-detail .page-size").text();
			return pageSize * (pageNumber-1) + index + 1;
			 */
			return '<font key="'+row.cmcode+'">' + (index + 1) + '</font>';
			/*
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
			*/
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
		field : "unitName"
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
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "cmcode",
				type : "text",
				label : "商品编码"
			},
			{
				col : "stanName",
				label : "商品名称",
				type : "text"
			}
		]
	},"query");
	
	//初始表头按钮
	/*addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "queDing", content: "确定",className : "glyphicon glyphicon-ok"}
		]
	});*/
	
	var $table = $("#table"),selection=parent.selectionHg;
	
	//查询
	$("#thSearchBtn").on("click",function(){
		//queryData("../../../../renwu/findPageByCondition");
		$.getJSON("../../../data/hgdmk2.json",function(result){
			queryData({
				columns:columns,
				data:result,
				$container:$table,
				singleSelect:true,
				onPageChange:function(pageNumber,pageSize){
					selection = null;
				},
				onClickRow : function(row,$element,field){
					selection = row;
					$element.closest("tbody").find("td").css("backgroundColor","");
					$element.closest("tr").find("td").css("backgroundColor","#e1dddd");
				},
				onPostBody:function(data){
					if(selection!=null){
						$table.find("font[key='"+selection.cmcode+"']:eq(0)").closest("td").click();
					}
				}
			});
		});
	}).trigger("click");
	
	//确定
	$("#ok").on("click",function(){
		//var selections = $table.bootstrapTable("getSelections");
		if(selection != null){
			//layer.msg("1");
			var $selectedHgTds = parent.$("#selectedHgTable").find("td");
			var $cmcode = $selectedHgTds.eq(0).find("input[name='cmcode']");
			$cmcode.val(selection.cmcode);
			var $stanName = $selectedHgTds.eq(1);
			$stanName.text(selection.stanName);
			var $unitName = $selectedHgTds.eq(3);
			$unitName.text(selection.unitName);
			var $tsl = $selectedHgTds.eq(7);
			$tsl.text(selection.tsl);
			parent.selectionHg = selection;
			parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		}else{
			layer.msg("请选择一条海关代码！");
			return;
		}
	});
});