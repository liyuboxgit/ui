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
		formatter : function(value,row,index){
			/*
			var pageNumber = $(".pagination .active").text();
			var pageSize = $(".pagination-detail .page-size").text();
			return pageSize * (pageNumber-1) + index + 1;
			 */
			return index + 1;
			/*
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
			*/
		}
	},
	{
		title : "进货凭证号",
		field : "pzId",
		formatter: function(pzId){
			return '<input type="text" name="" disabled="true" readonly="true" value="' + pzId + '">';
		}
	}, 
	{
		title : "开票日期",
		field : "time",
		formatter: function(time){
			return '<input type="text" name="" disabled="true" readonly="true" value="' + time + '">';
		}
	}, 
	{
		title : "海关商品码",
		field : "spId",
		formatter: function(spId){
			return '<input type="text" name="" disabled="true" readonly="true" value="' + spId + '">';
		}
	}, 
	{
		title : "数量",
		field : "number",
		formatter: function(number){
			return '<input type="text" name="" disabled="true" readonly="true" value="' + number + '">';
		}
	}, 
	{
		title : "专用税票号",
		field : "zyId",
		formatter: function(zyId){
			return '<input type="text" name="" value="' + zyId + '">';
		}
	}, 
	{
		title : "备注",
		field : "sign",
		formatter: function(zyId){
			return '<input type="text" name="" value="' + zyId + '">';
		}
	}, 
	{
		title : "操作",
		field : "ctrol",
		formatter: function(){
			return '<a class="saveId">保存</a>|<a class="lookInfoId">查看</a>';
		}
	}
];
var data = [
	{
		"pzId":"1",
		"time":"2",
		"spId" : "小狗牌吸尘器",
		"number" : "3",
		"zyId" : "3",
		"sign" : "2"
	}
];
$(function(){
	initBootStrapTable({
		id:"table",
		columns : columns,
		data: data
	})
});
