$(function() {
	//备案数据
	var hisColumns = [{
		align:'center',
		checkbox : true
	},{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){
			return index+1;
		}
	},{
		title : '备案数据ID',
		align:'center',
		field : 'sbbasjdl',
//		visible : false
		class : "hide"
	},/*{
		title : '申报批次',
		field : 'sbpcdl'
	},*/ {
		title : '出口发票号',
		field : 'fph'
	}, {
		title : '退税申报日期',
		field : 'tssbrq'
	}, {
		title : '备案日期',
		field : 'bzrq'
	}, {
		title : '企业办税员',
		field : 'qybsy',
        formatter : function(value,row,index){
            value = value==null?"":value;
            return '<input id="qybsy" type="text" value="'+ value +'"/>';
        }
	}, {
		title : '页数',
		field : 'ys',
		formatter : function(value,row,index){
			value = value==null?"":value;
			return '<input id ="ys" type="text" value="'+ value +'"/>';
		}
	}, {
		title : '标志',
		field : 'flag',
		formatter : function(value,row,index){
            value = value==null?"":value;
			return '<input id="flag" type="text" value="'+ value +'"/>';
		}
	}, {
		title : '备注',
		field : 'remark',
                formatter : function(value,row,index){
                    value = value==null?"":value;
                    return '<input id="remark" type="text" value="'+ value +'"/>';
                }
	} ],
	
	//备案单证
	columns = [ {
		name : "出口合同",
		value : "",
		source : "",
		ctrol : "lookChukouInfo",
		btnname : "关联",
		contect : "chukou",
		id: ""
	}, {
		name : "服务合同",
		value : "",
		source : "",
		ctrol : "lookFuwuInfo",
		btnname : "关联",
		contect : "fuwu",
		id: ""
	},{
		name : "补充合同",
		value : "",
		source : "",
		ctrol : "lookBuchongInfo",
		btnname : "关联",
		contect : "buchong",
		id: ""
	}, {
		name : "运输协议",
		value : "",
		source : "",
		ctrol : "lookWuliuInfo",
		btnname : "关联",
		contect : "wuliu",
		id: ""
	}, {

		name : "出口装箱单",
		value : "",
		source : "",
		ctrol : "export",
		btnname : "上传",
		contect : "3",
		id: ""
	}, {
		name : "运输单",
		value : "",
		source : "",
		ctrol : "export",
		btnname : "上传",
		contect : "4",
		id: ""
	}, {
		name : "出口发票",
		value : "",
		source : "",
		ctrol : "export",
		btnname : "上传",
		contect : "5",
		id: ""
	}, {
		name : "其他",
		value : "",
		source : "",
		ctrol : "export",
		btnname : "上传",
		contect : "6",
		id: ""
	} ];
	//alert(parent.uuid);
	//基本信息直接赋值
	$("span[data-name='ssq']").html(parent.ssq);
	$("span[data-name='sbpc']").html(parent.sbpch);
	if(parent.barq && parent.barq!="null")
		$("span[data-name='barq']").html(parent.barq);
	
	//备案数据
	$.ajax({
		url : "../../../../shenBaoBeiAnDL/queryBeiAnInfo",
		data : {"sbpcdl":parent.uuid},
		type : "post",
		dataType : "json",
		success : function(res){
			if(res.success){
				queryData({data:{success:true,data:{thisPageElements:res.data}},$container:$("#historyList"),columns:hisColumns,height:300});
			}
		}
	});
	
	//备案单证
	$.ajax({
		url : "../../../../shenBaoBeiAnDL/queryBeiAnDanZheng",
		data : {"sbpcdl":parent.uuid},
		type : "post",
		dataType : "json",
		success : function(res){
			var rcolumns  = beianDataHadler(columns,res);
			//备案单证
			if(res.data.length){
				initDetaildanzheng({
					id : "danzhengList",
					elems : rcolumns
				});				
			}
		}
	});
	
	//初始化详情
	function initDetaildanzheng(config){
		if(config){
			var htmlArray = [];
			for(var i=0;i<config.elems.length;i++){
				var item = config.elems[i];
				htmlArray.push('<tr><td width="120px">'+item.name+'</td><td>');
				var evalues = item.value;
				if(evalues && evalues.indexOf(',') != -1){
					var array = evalues.split(",");
					for(var j=0; j<array.length; j++){
						if(item.name=="出口合同"||item.name=="运输协议"||item.name=="补充合同"||item.name=="服务合同"){
							if(array[j]){								
								var id = array[j].split("$")[0];
								var bh = array[j].split("$")[1];
								htmlArray.push('<a href="javascript:;" style="margin-right:5px;" class="'+item.ctrol+'" allname="'+array[j]+'">'+bh+'</a>');
							}
						}else{
							if(array[j]){								
								var id = array[j].split("$")[0];
								var name = array[j].split("$")[1];
								htmlArray.push('<a href="javascript:;" onclick="xz(\''+id+'\');" style="margin-right:5px;" class="'+item.ctrol+'">'+name+'</a>');
							}
						}
					}
				}else{
					if(item.name=="出口合同"||item.name=="运输协议"||item.name=="补充合同"||item.name=="服务合同"){
						if(evalues){							
							var id = evalues.split("$")[0];
							var bh = evalues.split("$")[1];
							htmlArray.push('<a href="javascript:;" class="'+item.ctrol+'" allname="'+evalues+'">'+bh+'</a>');
						}
					}else{
						if(evalues){							
							var id = evalues.split("$")[0];
							var name = evalues.split("$")[1];
							htmlArray.push('<a href="javascript:;" onclick="xz(\''+id+'\');" style="margin-right:5px;" class="'+item.ctrol+'" allname="'+evalues+'">'+name+'</a>');
						}
					}
				}
				if(item.name=="出口合同"||item.name=="运输协议"||item.name=="补充合同"||item.name=="服务合同"){
					htmlArray.push('</td><td width="40px"><a class="btn btn-ckts btn-xs '+item.contect+'">'+ item.btnname +'</a></td><td style="width:350px">备案单证出处: <input type="text" style="width:150px" value="'+item.source+'"><input type="hidden" value="'+ item.id +'"/></span></td>');
				}else{
					htmlArray.push('</td><td width="40px"><a class="btn btn-ckts btn-xs uploadeBtn" key="'+item.contect+'" >'+ item.btnname +'</a></td><td style="width:350px">备案单证出处: <input type="text" style="width:150px" value="'+item.source+'"><input type="hidden" value="'+ item.id +'"/></span></td>');
				}
				
				htmlArray.push('</tr>');
			}
			$('#' + config.id).append(htmlArray.join(""));
		}
	}
	
	//查看出口合同详情
	$(document).on("click", ".lookChukouInfo", function() {
		var allname = $(this).attr("allname");
		if(allname){
			params = {ckht : allname.split("$")[0], beian : "yes"}
			openLayer({
				ele:this,
				title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口合同信息</i>',
				url : "../../../pages/hetong/chukou/add.html?editflag=detail"
//				url : "../../hetong/chukou/detail.html"
			});
		}
	});
	
	//查看出口合同关联
	$(document).on("click", ".chukou", function() {
		var title = $(this).attr("title");
		var a = $('#danzhengList tr').eq(0).children('td').eq(1).children('a');
		var allnames = a.map(function(){
			return $(this).attr('allname').split("$")[0];
		});
		window.ckhts = allnames.get();
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>出口合同信息</i>',
			url : "../../system/beianDL/chukou_list.html"
		});
	});
	
	
	//查看服务合同详情
	$(document).on("click", ".lookFuwuInfo", function() {
		var allname = $(this).attr("allname");
		if(allname){
			params = {fwht : allname.split("$")[0], beian : "yes"}
			openLayer({
				ele:this,
				title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>服务合同信息</i>',
				url : "../../../pages/fuwuhetong/add.html?editflag=detail"
			});
		}
	});
	
	//查看服务合同关联
	$(document).on("click", ".fuwu", function() {
		var title = $(this).attr("title");
		var a = $('#danzhengList tr').eq(1).children('td').eq(1).children('a');
		var allnames = a.map(function(){
			return $(this).attr('allname').split("$")[0];
		});
		window.fwhts = allnames.get();
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>服务合同信息</i>',
			url : "../../system/beianDL/fuwu_list.html"
		});
	});
	
	//查看物流运输详情
	$(document).on("click", ".lookWuliuInfo", function() {
		var allname = $(this).attr("allname");
		params = {wlys : allname.split("$")[0], beian : "yes"}
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>物流运输信息</i>',
			url : "../../../pages/hetong/wuliu/add.html?editflag=detail"
//			url : "../../hetong/wuliu/detail.html"
		});
	});
	
	//查看物流运输关联
	$(document).on("click", ".wuliu", function() {
		var title = $(this).attr("title");
		var a = $('#danzhengList tr').eq(3).children('td').eq(1).children('a');
		var allnames = a.map(function(){
			return $(this).attr('allname').split("$")[0];
		});
		window.wlyss = allnames.get();
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>运输协议信息</i>',
			url : "../../system/beianDL/wuliu_list.html"
		});
	});

	//查看补充合同详情
	$(document).on("click", ".lookBuchongInfo", function() {
		var allname = $(this).attr("allname");
		if(allname){
			params = {bcht : allname.split("$")[0], beian : "yes"}
			openLayer({
				ele:this,
				title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>补充合同信息</i>',
				url : "../../../pages/hetong/buchonghetong/bchtadd.html?editflag=detail"
	//			url : "../../hetong/buchonghetong/bcht_detail.html"
			});
		}
	});
	
	//查看补充合同关联
	$(document).on("click", ".buchong", function() {
		var title = $(this).attr("title");
		var a = $('#danzhengList tr').eq(2).children('td').eq(1).children('a');
		var allnames = a.map(function(){
			return $(this).attr('allname').split("$")[0];
		});
		window.bchts = allnames.get();
		
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>补充合同信息</i>',
			url : "../../system/beianDL/buchong_list.html"
		});
	});
	
	//添加或修改保存
	$("#saveOrUupdateBtn").on("click",function(e){
		var arrayData = [];
		var trs = $("#danzhengList tbody tr");
		for(var i=0;i<trs.length;i++){
			var tds = $(trs[i]).find("td");
			var id = columns[i].id;
			var tmp = [];
			$(tds[1]).children("a").each(function(){
				tmp.push($(this).attr("allname"));
			})
			var dzzt = tmp.join(",");
			var dzcc = $(tds[3]).find("input:first-child").val();
			arrayData.push({id:id,dzzt:dzzt,dzcc:dzcc});
		}
		var str=JSON.stringify(arrayData);
		
		var array = [];
		var tr_ = $("#historyList tbody tr");
		for(var i=0;i<tr_.length;i++){
			var tds = $(tr_[i]).find("td");
			var id = $(tds[2]).html();
			var ys = $(tds[7]).find("input").val();
			var flag = $(tds[8]).find("input").val();
			var remark = $(tds[9]).find("input").val();
			var qybsy = $(tds[6]).find("input").val();
			array.push({id:id,ys:ys,flag:flag,qybsy:qybsy,remark:remark});
		}
		var strs = JSON.stringify(array);
		
//		console.log({"str":str,"strs":strs,"ckzxd":$("#ckzxd").val(),"ysd":$("#ysd").val(),"ckfp":$("#ckfp").val(),"elsea":$("#elsea").val()});
		
		if($("#addInfoForm").valid()){
	        $.ajax({
	            url : "../../../../shenBaoBeiAnDL/editBeiAnDanZheng",
	            contenType:'application/json',
	            type : "POST",
	            data : {"str":str,"strs":strs,"ckzxd":$("#ckzxd").val(),"ysd":$("#ysd").val(),"ckfp":$("#ckfp").val(),"elsea":$("#elsea").val()},
	            success : function (result) {
	                if(result.success){
	                	layer.msg(result.msg);
	                }else{
	                	layer.msg("修改失败!");
	                }
	        		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	        		parent.refreshTable(); //刷新页面
	            }
	        });
		}
	});
	
	//上传
	$(document).on("click",".uploadeBtn",function(){
		var key = $.trim($(this).attr("key"));
		layer.open({
			type : 2,
			title : "上传",
			area : ["70%","70%"],
			
			skin : "myLayui",
			content : "../../../pages/system/beianDL/import.html?type="+key+"&tempTime="+new Date().getTime()
		});
	});
});

//给备案单证页面填充数据

function beianDataHadler(columns,result){
	var arr = result.data;
	if(arr){
		for(var i=0; i<arr.length; i++){
			switch(arr[i].dzlx){
				case "出口合同":
					columns[0].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[0].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[0].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				case "服务合同":
					columns[1].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[1].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[1].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				case "补充合同":
					columns[2].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[2].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[2].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				case "运输协议":
					columns[3].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[3].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[3].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				case "出口装箱单":
					columns[4].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[4].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[4].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				case "运输单":
					columns[5].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[5].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[5].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				case "出口发票":
					columns[6].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[6].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[6].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				case "其他":
					columns[7].value = arr[i].dzzt ? arr[i].dzzt : "";
					columns[7].source = arr[i].dzcc ? arr[i].dzcc : "";
					columns[7].id = arr[i].sbbadzdl ? arr[i].sbbadzdl : "";
					break;
				default:
					break;
			}
		}
	}
	return columns;
}

//下载
function xz(id){
	location.href='../../../../attachment/download?attachmentId='+id;
}