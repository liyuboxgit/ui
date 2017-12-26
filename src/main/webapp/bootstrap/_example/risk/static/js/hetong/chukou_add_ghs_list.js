/**
 * Created by zstax on 2017/11/13.
 */
var key = "uuid";
var columns = [
    {
        checkbox : true
    },
    {
        title : "供货商ID",
        align:"center",
        field : "uuid",
        visible : false
    },
    {
        title : "序号",
        formatter : function(value,row,index){
            var page = $table.bootstrapTable("getPage");
            var pageSize = page.pageSize,pageNumber = page.pageNumber;
            return page.pageSize*(page.pageNumber-1)+index+1;
        }
    },
    {
        title : "供货商名称",
        field : "supplierName",
        align:"center",
        formatter : lookInfoFormatter
    },
    {
        title : "纳税人识别号",
        align:"center",
        field : "nsrsbh"
    },
    {
        title : "企业类型",
        align:"center",
        field : "supplierType"
		//formatter : getDict("ywlx","supplierType")
    }
];

$(function(){
    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "ok", content: "确定",className : "glyphicon glyphicon-ok-sign"}
            /*
            {id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
            {id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
            */
        ]
    });

    parentTabWindow = parent;
    
    //加载数据
    queryData({url:"../../../../caiGouHeTong/findGhsPageByConditionDl",$container:$("#table"),columns:columns,height:300,pageSize:5,
    	onPostBody:function(data){
			$("#table").bootstrapTable("checkBy",{field:"nsrsbh",values:[parentTabWindow.$(":input[name='sellerNsrsbh']").val()]});//选中状态还需要根据数据值进行自动完成
			closeLoading($("#table").attr("loadingIndex"));
		}
    });
	
    //保存供货商信息
    $("#ok").on("click",function(e){
        var selectRows = $table.bootstrapTable("getSelections");
        if(selectRows.length===1){
            //采购合同供货商
            parentTabWindow.$(":input[name='sellerNsrsbh']").val(selectRows[0].nsrsbh);
            parentTabWindow.$(":input[name='sellerName']").val(selectRows[0].supplierName);
            parentTabWindow.$(":input[name='sellerSignName']").val(selectRows[0].contacts);
            parentTabWindow.$(":input[name='sellerTelephone']").val(selectRows[0].telephone);
            parentTabWindow.$(":input[name='sellerOpenBank']").val(selectRows[0].openBank);
            parentTabWindow.$(":input[name='sellerBankAccount']").val(selectRows[0].bankAccount);
            parentTabWindow.$(":input[name='sellerAddress']").val(selectRows[0].registeredAddress);
            parentTabWindow.layer.close(parentTabWindow.layer.getFrameIndex(window.name));
            //采购合同货物供货商
            parentTabWindow.$(":input[name='nsrsbh']").val(selectRows[0].nsrsbh);
            parentTabWindow.$(":input[name='supplier']").val(selectRows[0].supplierName);
            //finishCallback();
        }else{
            layer.msg("请选择一家供货商!");
        }
        processEvent(e);
    });
});