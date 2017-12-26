var key = "uuid";
var rows = [];

function addRows(selectRows) {
	if(selectRows.length>0){
        if(rows.length>0){
            for(var i=0;i<selectRows.length;i++){
            	var f = true;
                for(var j=0;j<rows.length;j++){
					if(selectRows[i].uuid==rows[j].uuid){
						f = false;
					}
                }
                if(f){
                	rows.push(selectRows[i]);
				}
            }
        }else {
        	rows = selectRows;
		}
	}
}

function convertZfbazt(r) {
	var arr=[];
	if(r.length>0)
	for(var i=0;i<r.length;i++){
		var c = new Object();
		c.uuid=r[i].uuid;
		if("1"==r[i].zfbazt){
			c.zfbazt = "2";
		}else if("2"==r[i].zfbazt){
			c.zfbazt="2"
		}else{
			c.zfbazt = "1";
		}
        arr.push(c);
	}
	return arr;
}

//表格标题项
var columns = [ 
	{
		align:'center',
		checkbox : true
	},
	{
		title : '供货商ID',
		align:'center',
		field : 'uuid',
		visible : false
	},
	{
		title : '序号',
		align:'center',
		formatter : function(value,row,index){ 
			var page = $table.bootstrapTable("getPage");
			var pageSize = page.pageSize,pageNumber = page.pageNumber;
			return page.pageSize*(page.pageNumber-1)+index+1;
		}
	},
	{
		title : '纳税人识别号',
		align:'center',
		field : 'nsrsbh',
	},
	{
		title : '生产企业名称',
		field : 'supplierName',
		align : 'left'
	},
	{
		title : '备案类型',
		align:'center',
		field : 'zfbazt',
		formatter:$thisExamineStatusFormatter
	}
];

function $thisExamineStatusFormatter(value,row,index){//此处仅显示要进行的操作，值未变
	var title = "",className = "";
	switch(value){
		case "0":
			title = "备案";
			className = "fa-check-circle-o text-success beia";
			break;
		case "1":
			title = "变更";
			className = "fa fa-times-circle text-success beia";
			break;
        case "2":
            title = "变更";
            className = "fa fa-times-circle text-success beia";
            break;
		default:
			title = "备案";
			className = "fa fa-times-circle text-success beia";
			break;
			
	}
	return '<i title="'+title+'" class="fa '+className+'" key='+row.bgd+'>'+title+'</i>';
}

$(function(){
	//初始表头按钮
	addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "choose", content: "选择企业",className : "glyphicon fa fa-file-text-o"},
			{id: "save", content: "保存",className : "glyphicon fa fa-file-text-o"}
		]
	});

	queryData("../../../../chuKouHeTong/findPageByCondition");


	//选择企业
	$(document).on("click","#choose", function(){
		openLayer({
			ele:this,
			id : $(this).attr("key"),
			area : ["95%","95%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>选择企业',
			url : "../../../pages/shenbaobeian/waizongfu/choose.html"
		});
	});
	
	
	//保存要备案或者变更的企业
	$("#save").on("click",function(e){
        var data = $table.bootstrapTable('getData');
        data = convertZfbazt(data);//将原始状态改为要进行的操作
        if(data.length>0){
            $.ajax({
                url : "../../../../shenBaoBeiAn/saveZfBeiAn",
                // contentType:'application/json',
                type : "POST",
                datType: "JSON",
                data : {
                    ghsLists:JSON.stringify(data)
				},
                success : function (result) {
                    if(result.success){
                        parent.layer.msg(result.msg);
                    }else{
                        parent.layer.msg("添加失败!");
                    }
                    parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
                    parent.refreshTable(); //刷新页面
                }
            });
            // }
		}

	});
	
});