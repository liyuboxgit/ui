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
var selection=null; //选择的商品库的数据都要传回到页面
/**
 @author 周小建
 @time 2017-11-01
 @description “海关商品代码库”表格列配置
 */
var hgColumns = [
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
			var page = $hgTable.bootstrapTable("getPage");
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
			/*
			if(value && value.length>50){
				value = value.substring(0,50)+"...";
			}
			return value;
			*/
			return labelTrimFormatter(value,row,index,10);
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
	},
	{
		title : "开始时间",
		align:"center",
		field : "staTime"
	},
	{
		title : "结束时间",
		align:"center",
		field : "endTime"
	},
	{
		title : "基本商品标志",
		align:"center",
		field : "baseFlag"
	}
	
];

$(function(){
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description 初始化“海关商品代码库”表格查询区域
	 */
	formGenerator({
		container :  "hgSearchBox",
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
	//var selection=null; //已经移到全局
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “海关商品代码库”表格查询区域的按钮
	 */
	var $buttons = $("#hgSearchBox").next().find("button");
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “海关商品代码库”查询按钮的单击事件处理函数，通过条件过滤结果数据，构建和加载表格。
	 */
	$buttons.eq(0).on("click",function(){
		var $inputs = $hgTable.closest("div.tableBox").prevAll("form:eq(0)").find(":input[name]");
		var cmcode=$.trim($inputs.eq(0).val()),stanName=$.trim($inputs.eq(1).val());
		//queryData("../../../../renwu/findPageByCondition");
		//$.getJSON("../../../data/hgdmk2.json",function(result){
			var array = [];
			/*
			for(var i=0;i<top.hgspdmkArray.length;i++){
				var item = top.hgspdmkArray[i];
				var itemCmcode=$.trim(item.cmcode),itemStanName=$.trim(item.stanName);
				if((cmcode=="" || itemCmcode==cmcode) && (stanName=="" || itemStanName.indexOf(stanName)>-1)) {
					if(filterGoodsCodes.length>0){
						//array.push(item);
						
						//for(var j=0; j<filterGoodsCodes.length; j++){
							//if(itemCmcode == filterGoodsCodes[j]) break;
							//array.push(item);
						//}
						if($.inArray(itemCmcode,filterGoodsCodes) == -1){
							array.push(item);
						}
					}else{
						array.push(item);
					}
				}
			}
			*/
			
			queryData({
				columns:hgColumns,
				//data:result,
				/*
				data:{
					"success": true, 
				    "msg": null, 
				    "data": {
				        "pageSize": 10, 
				        "pageNo": 1, 
				        "totalCount": 0, 
				        "lastPageNo": 3, 
				        "nextPageNo": 2, 
				        "firstPage": false, 
				        "lastPage": false, 
				        "thisPageElements":array,
				        "thisPageLastElementNumber": 20,
				        "previousPageNo": 0, 
				        "thisPageFirstElementNumber": 11
				    }
				},*/
				url : "../../../../lcygdsh/findAllHgdmk",
				queryParams : function(params){
					var query = {
						pageSize : params.pageSize,
						pageNo : params.pageNumber,
						sortName : params.sortName,
						sortOrder : params.sortOrder 
					};
					//alert($("#thSearchForm").find(":input[name]").length);
					/*
					$.each($classifyedTable.closest("div.tableBox").prevAll("form:eq(0)").find(":input[name]"),function(i,e){
						if($(e).val()){
							query[$(e).attr("name")] = $(e).val();
						}
					});
					*/
					
					if(cmcode){
						query.cmcode = cmcode;
					}
					if(stanName){
						query.stanName = stanName;
					}
					var goodsRows = $classifyedTable.bootstrapTable("getData");
					goodsRows = goodsRows.map(function(item){return item.goodsCode});
					//goodsRows = JSON.stringify(goodsRows);
					goodsRows =  goodsRows.join(",");
					
					return {query:JSON.stringify(query),notQuery:goodsRows};
				},
				$container:$hgTable,
				singleSelect:true,
				height : 320,
				uniqueId:"cmcode",
				onPageChange:function(pageNumber,pageSize){
					$hgTable.closest("div.fixed-table-container").height(320);
				},
				onPostBody:function(data){
					//if(selection!=null)$hgTable.find("font[key='"+selection.cmcode+"']:eq(0)").closest("td").click();//维护上次的被选中行这次依然被选中
					this.onPageChange();
					if(selection!=null){
						for(var i=0;i<array.length;i++){
							var item = array[i];
							if(item.cmcode==selection.cmcode){
								$hgTable.bootstrapTable("checkBy",{field:"cmcode",values:[item.cmcode]});
								break;
							}
						}
					}
				},
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
			$hgTable.closest("div.tableBox").find("div.fixed-table-pagination").find('button[name="refresh"]').off("click").on("click",function(){
				$buttons.eq(0).click();
			});
		//});
	});
	
	/**
	 @author 周小建
	 @time 2017-11-01
	 @description “海关商品代码库”确定按钮的单击事件处理函数，将选中行回传给“已选取的海关商品代码库”。
	 */
	$buttons.eq(2).on("click",function(){
		//var selections = $hgTable.bootstrapTable("getSelections");
		//debugger
		if(selection == null){
			layer.msg("请选择一条海关代码！");
			return;
		}else{
			//layer.msg("1");
			//var $selectedHgTds = parent.$("#selectedHgTable").find("td");
			var $classifyedTrs = $classifyedTable.find("tbody tr");
			for(var i=0;i<$classifyedTrs.length;i++){
				var goodsCode = $classifyedTrs.attr("data-uniqueid");
				if(goodsCode==selection.cmcode){
					layer.msg("选择的海关代码已被使用，请重新选取！");
					return;
				}
			}
			var $selectedHgTds = $("#selectedHgTable").find("td");
			var $cmcode = $selectedHgTds.eq(0).find("input[name='cmcode']");
			
			
			$cmcode.val(selection.cmcode);
			var $stanName = $selectedHgTds.eq(1).find("input[name='stanName']");
			//$stanName.text(selection.stanName);
			$stanName.val(selection.stanName);
			$stanName.attr("valueBak",selection.stanName);
			var selections = $goodsTable.bootstrapTable("getSelections");
			for(var i=0;i<selections.length;i++){
				var item = selections[i];
				if(i==0){
					$stanName.val(item.goodsName);
				}
			}
			
			var $unitName = $selectedHgTds.eq(4);
			$unitName.text(selection.unitName);
			
			//var $tsl = $selectedHgTds.eq(8);
			//$tsl.text(selection.tsl);
			//parent.selectionHg = selection;
			//parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
			layer.close(hgLayerIndex);
		}
	});
});