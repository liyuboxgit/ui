$(function() {
	
	// 表格信息1
	var dbtseList = [ {
        nsrmc : "",
        nsrsbh : "",
        dbtse : "",
        bz : ""
	}];

	// 表格信息2
	var zhtseList = [ {
        nsrmc : "",
        nsrsbh : "",
        zhtse : "",
        bz : ""
	}];
	
	initSelf();
    if (GetQueryString("mark") == "update"){
	   $.ajax({
			 url:'../../../dbtsk/querydbtsk',
			 type:'GET',
			 dataType:'json',
			 data:{
			 "dbtsk":parent.params.dbtsk
			 },
			 success:function(result){
//				 console.log(result);
				 if (result.success){
					 dbtseList.splice(0,dbtseList.length);//清空
//					 console.log(JSON.stringify(result.data.dbtseList))
                     dbtseList = result.data.dbtseList;

                     zhtseList.splice(0,zhtseList.length);//清空
//                     console.log(JSON.stringify(result.data.zhtseList))
                     zhtseList = result.data.zhtseList;

                     // 表格信息1
                     initDetailInfo({
                         id : "table_first",
                         elems : dbtseList
                     });

                     // 表格信息2
                     initDetailInfo({
                         id : "table_second",
                         elems : zhtseList
                     });
                     // 详情样式
                     detailRemoveList ();
				 }
			 }
		 })
	}
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };

	//处理详情s
	function initDetailInfo(settings){
		// console.log(parent.params)
		if(settings){
			if (settings.id == 'table_first'){
                var $row = $('#' + settings.id);
                for(var i=0;i<settings.elems.length;i++){
                    $row.prepend('<tr><td class="SortId"></td><td><input type="text" class="form-control input-sm" data-name="nsrmc" value="'
                        + settings.elems[i].nsrmc+ '"/></td><td><input type="text" class="form-control input-sm" data-name="nsrsbh" value="'
                        + settings.elems[i].nsrsbh+ '"/></td><td><input type="text" class="form-control input-sm" data-name="dbtse" value="'
                        + settings.elems[i].dbtse+ '"/></td><td><input type="text" class="form-control input-sm" data-name="bz" value="'
                        + settings.elems[i].bz+ '"/></td><input type="hidden" class="form-control input-sm" data-name="dbtskmx" value="'
                        + settings.elems[i].dbtskmx+ '"/>'
                        + '<td><span class="deleteTrRow">&nbsp;删除</span></td></tr>');
                }
			}
            if (settings.id == 'table_second'){
                var $row = $('#' + settings.id);
                for(var i=0;i<settings.elems.length;i++){
                    $row.prepend('<tr><td class="SortId"></td><td><input type="text" class="form-control input-sm" data-name="nsrmc" value="'
                        + settings.elems[i].nsrmc+ '"/></td><td><input type="text" class="form-control input-sm" data-name="nsrsbh" value="'
                        + settings.elems[i].nsrsbh+ '"/></td><td><input type="text" class="form-control input-sm" data-name="zhtse" value="'
                        + settings.elems[i].zhtse+ '"/></td><td><input type="text" class="form-control input-sm" data-name="bz" value="'
                        + settings.elems[i].bz+ '"/></td><input type="hidden" class="form-control input-sm" data-name="dbtskmx" value="'
                        + settings.elems[i].dbtskmx+ '"/>'
                        + '<td><span class="deleteTrRow">&nbsp;删除</span></td></tr>');
                }
			}
		}
	}

	$(document).on("click",".button", function(){
		var tables = $('#table_first');
		var addtr = $('<tr><td class="SortId"></td><td><input type="text" class="form-control input-sm" data-name="nsrmc" value=""/></td><td>'
					+ '<input type="text" class="form-control input-sm" data-name="nsrsbh" value=""/></td><td>'
					+ '<input type="number" class="form-control input-sm" data-name="dbtse" value=""/></td><td>'
					+ '<input type="text" class="form-control input-sm" data-name="bz" value=""/></td>"'
					+ '<td><span class="deleteTrRow">&nbsp;删除</span></td></tr>');
		tables.prepend(addtr)
	});
	$(document).on("click",".button_qingkaung", function(){
		var tables = $('#table_second');
        var addtr = $('<tr><td class="SortId"></td><td><input class="form-control input-sm" type="text" data-name="nsrmc" value=""/></td><td>'
					+ '<input type="text" class="form-control input-sm" data-name="nsrsbh" value=""/></td><td>'
					+ '<input type="number" class="form-control input-sm" data-name="zhtse" value=""/></td><td>'
					+ '<input type="text" class="form-control input-sm" data-name="bz" value=""/></td>"'
					+ '<td><span class="deleteTrRow">&nbsp;删除</span></td></tr>');
		tables.prepend(addtr)
//		$("#table_second").find("input[name='zhtse']").attr("onkeyup="value=value.replace(/[^\d.]/g,\'\')")
	});
	
	$(document).on("click",".deleteTrRow", function(){
	    //如果多一个parent就会删除整个table
	    $(this).parent().parent().remove();
	});

	//查看详情页面样式
	function detailRemoveList (){
		if(serchParam.editflag=="detail"){
			$("#addInfoForm :input").attr({"readonly":true,"disabled":"disabled"});
			$("#addInfoForm :button,#addInfoForm .btn-file,#addInfoForm .searchBtn,.text-danger").css("display","none");
			$("#addInfoForm textarea").css("resize","none");
			$("#table_first,#table_second").find("span").removeClass("deleteTrRow");
			
			$("#addInfoForm .file-caption-name").attr({'placeholder':''})
			$("#addInfoForm .kv-fileinput-caption").attr({"background-color":"#EFEEEC","readonly":true,"disabled":"disabled"})
			$("#addInfoForm #jedw option,#addInfoForm #jedw").css({"background-color":"#EFEEEC"})
		}
	}
	
	//添加或修改保存
	$("#saveOrUupdateBtn").on("click",function(e){
			//var tabledatas = $("#dbtable").bootstrapTable('getData');
			//第一表格数据
			var dbData = [];
			var trs = $("#table_first").find("tr");
			for(var i=0; i<trs.length; i++){
				var nsrmc = $(trs[i]).find("td :input[data-name='nsrmc']").val();
				var nsrsbh = $(trs[i]).find("td :input[data-name='nsrsbh']").val();
				var dbtse = $(trs[i]).find("td :input[data-name='dbtse']").val();
				var bz = $(trs[i]).find("td :input[data-name='bz']").val();
				var dbtskmx = $(trs[i]).find("input[data-name='dbtskmx']").val();
				dbData.push({nsrmc:nsrmc,nsrsbh:nsrsbh,dbtse:dbtse,bz:bz,dbtskmx:dbtskmx});
			}
			//第二表格数据
			var zhData = [];
			var zhtrs = $("#table_second").find("tr");
			for(var i=0; i<zhtrs.length; i++){
				var nsrmc = $(zhtrs[i]).find("td :input[data-name='nsrmc']").val();
				var nsrsbh = $(zhtrs[i]).find("td :input[data-name='nsrsbh']").val();
				var zhtse = $(zhtrs[i]).find("td :input[data-name='zhtse']").val();
				var bz = $(zhtrs[i]).find("td :input[data-name='bz']").val();
                var dbtskmx = $(zhtrs[i]).find("input[data-name='dbtskmx']").val();
				zhData.push({nsrmc:nsrmc,nsrsbh:nsrsbh,zhtse:zhtse,bz:bz,dbtskmx:dbtskmx});
			}
			//表格内不为空
			var zhtrsinput = zhtrs.find("td :input").val();
			var trsinput = trs.find("td :input").val();
			if (zhtrsinput == "" || zhtrsinput == 'undefined' || trsinput == "" || trsinput == 'undefined'){
				layer.msg("表格信息填写不完整！");
				return;
			}

			//校验
			var v_hgqydm = $("#hgqydm").val().trim();
			var v_nsrmc = $("#nsrmc").val().trim();
			var v_nsrsbh = $("#nsrsbh").val().trim();
			var v_thsh = $("#thsh").val().trim();
			var v_thje = $("#thje").val();
			var v_jedw = $("#jedw").val().trim();
			var v_jbr = $("#jbr").val().trim();
			var v_fkrq = $("#fkrq").val();
			if (v_hgqydm == "" || v_nsrmc == '' || v_nsrsbh == "" || v_thsh == '' || v_thje == '' || v_jedw == '' || v_jbr == '' || v_fkrq == ''){
				layer.msg("信息填写不完整，请检查填写完整后在提交！");
				return;
			}

			//表单数据
        	var formData = [];
			formData.push({dbtsk:parent.params.dbtsk,hgqydm:$("#hgqydm").val(),nsrmc:$("#nsrmc").val(),nsrsbh:$("#nsrsbh").val(),thsh:$("#thsh").val(),thje:$("#thje").val(),jedw:$("#jedw").val(),jbr:$("#jbr").val(),fkrq:$("#fkrq").val()});

		    //传入服务器的数据
			var data = {
				"formData" : JSON.stringify(formData),
				"dbtseList" : JSON.stringify(dbData),
				"zhtseList" : JSON.stringify(zhData)
			};
		    var url_param = "savedbtsk";
			if (GetQueryString("mark") == "update"){
                url_param = "updatedbtsk";
			}
			

			
	        $.ajax({
	            url : "../../../dbtsk/"+url_param,
	            contenType:'application/json',
	            type : "POST",
	            data : data,
	            success : function (result) {
	                if(result.success){
	                	parent.layer.msg(result.msg);
	                }else{
	                	parent.layer.msg("操作失败!");
	                }
	        		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
	        		parent.refreshTable(); //刷新页面
	            }
	        });
		// }
	});
});

function initSelf() {
    $.ajax({
        url:'../../../caiGouHeTong/initSelf',
        type:'POST',
        dataType:'json',
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
        success:function(result){
            if(result.data!=null){
            	$("#hgqydm").val(result.data.customsCode);
            	$("#nsrmc").val(result.data.enterpriseName);
            	$("#nsrsbh").val(result.data.nsrsbh);
            }
        }
    })
}
