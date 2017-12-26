$(document).ready(function(){
	var columns = [{
		title : 'ID',
		align:"center",
		field : 'yjconf'
	}, {
		title : "阈值",
		align:"center",
		field : "fz",
		formatter : function(value,row,index){
            return '<input name="fz" type="number" value="'+ value +'"/>';
        }
	}, {
		title : "阈值单位",
		align:"center",
		field : "fzdw"
	}, {
		title : "期限",
		align:"center",
		field : "qx",
		formatter : function(value,row,index){
			//仅供应商预警修改期限
			return row.type == '4'?'<input name="qx" type="number" value="'+ value +'"/>':value;
        }
	}, {
		title : "期限单位",
		align:"center",
		field : "qxdw"
	}, {
		title : "预警类型",
		align:"center",
		field : "typeStr"
	}, {
		title : '说明',
		field : 'hj'
	}];
	
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "type",
				label : "预警类型",
				type : "select",
				options :[{text : "请选择", value : ""},{text:"供货商预警",value:"2"},{text:"申报预警",value:"3"},{text:"收汇预警",value:"4"}]
			}
		]
	},"query");
	
	$("#thSearchBtn").on("click",function(){
		queryData({url:"../../../yujing/findPage",$container:$("#table"),columns:columns})
	}).trigger("click");
	
	//修改按钮事件
	$("#update").on("click",function(){
		layer.confirm(
			"确定要保存此次修改吗?",
			{btn:["确定"]},
			function(index){
				var tr = $table.find('tr');
				var arr = [];
				for(var i=1;i<tr.length;i++){
					var trr = tr.eq(i);
					arr.push({
						yjconf:trr.children().eq(0).text(),
						fz:trr.children().eq(1).find('input').val(),
						qx:trr.children().eq(3).find('input').val(),
						hj:trr.children().eq(6).text()
					})
				}
				
				$.ajax({
					url:'../../../yujing/batchUpdate',
					contentType: 'application/json; charset=UTF-8',
				    dataType: 'json',
				    type:'POST',
				    data: JSON.stringify(arr),
				    success:function(ret){
				    	$table.bootstrapTable("refresh");
				    	layer.close(index);
				    }
				});
			}
		);
	});
});