$(function() {
	//备案数据
	var hisColumns = [ {
		title : '序号',
		field : 'id'
	}, {
		title : '关联号',
		field : 'glname'
	}, {
		title : '出口发票号',
		field : 'ckname'
	}, {
		title : '退税申报日期',
		field : 'tsTime'
	}, {
		title : '备案日期',
		field : 'beian'
	}, {
		title : '企业办税员',
		field : 'people'
	}, {
		title : '页数',
		field : 'ctrlpage',
		formatter : function(value,row,index){
			return '<input type="text" value="'+ value +'"/>';
		}
	}, {
		title : '标志',
		field : 'sign',
		formatter : function(value,row,index){
			return '<input type="text" value="'+ value +'"/>';
		}
	}, {
		title : '备注',
		field : 'say'
	} ],
	
	
	hisData = [ 
		{
			"id" : "01",
			"glname" : "2017080001",
			"ckname" : "10254251687",
			"tsTime" : "2017-09-27",
			"beian" : "2017-09-27",
			"people" : "郑九",
			"ctrlpage" : "20",
			"sign" : "R",
			"say" : ""
		}
	],
	//备案单证
	columns = [ {
		title : '序号',
		field : 'id'
	}, {
		title : '合同编号',
		field : 'glname'
	}, {
		title : '合同名称',
		field : 'ckname'
	}, {
		title : '签订日期',
		field : 'tsTime'
	}, {
		title : '买方',
		field : 'beian'
	}, {
		title : '卖方',
		field : 'people'
	}, {
		title : '页数',
		field : 'ctrlpage'
	}, {
		title : '标志',
		field : 'sign'
	}, {
		title : '备注',
		field : 'say'
	} ],
	datas = [ 
		{
			"id" : "01",
			"glname" : "ck8283910131",
			"ckname" : "10254251687",
			"tsTime" : "2017-09-27",
			"beian" : "2017-09-27",
			"people" : "郑九",
			"ctrlpage" : "20",
			"sign" : "R",
			"say" : ""
		}
	],
	caicolumns = [ {
		title : '序号',
		field : 'id'
	}, {
		title : '合同编号',
		field : 'glname'
	}, {
		title : '合同名称',
		field : 'ckname'
	}, {
		title : '签订日期',
		field : 'tsTime'
	}, {
		title : '买方',
		field : 'beian'
	}, {
		title : '卖方',
		field : 'people'
	}, {
		title : '页数',
		field : 'ctrlpage'
	}, {
		title : '标志',
		field : 'sign'
	}, {
		title : '备注',
		field : 'say'
	} ],
	caidatas = [ 
		{
			"id" : "01",
			"glname" : "CG818288919",
			"ckname" : "10254251687",
			"tsTime" : "2017-09-27",
			"beian" : "2017-09-27",
			"people" : "郑九",
			"ctrlpage" : "20",
			"sign" : "R",
			"say" : ""
		}
	];
	

	//备案数据
	initBootStrapTable({
		id : "historyList",
		columns : hisColumns,
		data : hisData
	});
	//备案单证
	initBootStrapTable({
		id : "chukouList",
		columns : columns,
		data : datas
	});
	initBootStrapTable({
		id : "caigouList",
		columns : caicolumns,
		data : caidatas
	});
	//查看出口详情
	$(document).on("click", ".lookInfo", function() {
		var title = popupPreHandler(this,3);
//		var title = $(this).attr("title");
		openLayer({
			ele:this,
//			id : $(this).attr("key"),
			area : ['100%','100%'],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口合同信息</i>出口合同信息【<font color="red">'+title+'</font>】',
			url : "../../hetong/chukou/detail.html"
		});
	});

	//查看商品详情
	$(document).on("click", ".shangpin", function() {
//		var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		console.log(title);
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			area : ['100%','100%'],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口货物信息</i>',
			url : "../../hetong/chukou/goods.html"
		});
	});
	
	$(document).on("click", ".chukou", function() {
//		var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		console.log(title);
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			area : ['100%','100%'],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口合同信息</i>',
			url : "../../system/beianDL/chukou_list.html"
		});
	});
	
	//查询详情信息
	detail(parent.params.ckht);

//	//处理详情请求
//	function detail(uid){
//		// 请求详情
//		$.ajax({
//			type : "post",
//			dataType : "json",
//			url : "../../../../chuKouHeTong/selectByPrimaryKey",
//	        data:{
//	        	"ckhtUuid":uid,
//	        },
//			success : function(result){
//				$.each(result.data,function(k,v){
//					$('#'+k).html(v);
//				});
//			}
//		});
//	}
});
