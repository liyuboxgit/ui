/**
 * Created by zstax on 2017/11/13.
 */
var key = "uuid";
var columns = [
    {
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
        formatter : function(value,row,index){
            var page = $table.bootstrapTable("getPage");
            var pageSize = page.pageSize,pageNumber = page.pageNumber;
            return page.pageSize*(page.pageNumber-1)+index+1;
        }
    },
    {
        title : '供货商名称',
        field : 'supplierName',
        align:'center',
        formatter : lookInfoFormatter
    },
    {
        title : '纳税人识别号',
        align:'center',
        field : 'nsrsbh'
    },
    {
        title : '企业类型',
        align:'center',
        field : 'supplierType'
//		formatter : getDict("ywlx",'supplierType')
    }
];

$(function() {
	formGenerator({
		//初始化查询
		container :  "advSearchBox",
		columns : [
			{
				col : "supplierName",
				type : "text",
				label : "供货商名称"
			},
			{
				col : "nsrsbh",
				type : "text",
				label : "纳税人识别号"
			}
		]
	},"query");
//初始表头按钮，预留查询功能
    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "ok", content: "确定",className : "glyphicon glyphicon-ok-sign"}
            /*{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
            {id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}*/
        ]
    });
	//查询
    $("#thSearchBtn").bind("click",function(){
        queryData({url:"../../../../caiGouHeTong/findGhsPageByCondition",singleSelect : true,striped : false});
    }).trigger("click");
    
    
    //加载数据
//    queryData({url:"../../../../caiGouHeTong/findGhsPageByCondition"});

    //保存供货商信息
    $("#ok").bind("click",function(){
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            //采购合同供货商
            parent.$(":input[name='sellerNsrsbh']").val(selectRows[0].nsrsbh);
            parent.$(":input[name='sellerName']").val(selectRows[0].supplierName);
            parent.$(":input[name='sellerSignName']").val(selectRows[0].contacts);
            parent.$(":input[name='sellerTelephone']").val(selectRows[0].telephone);
            parent.$(":input[name='sellerOpenBank']").val(selectRows[0].openBank);
            parent.$(":input[name='sellerBankAccount']").val(selectRows[0].bankAccount);
            parent.$(":input[name='sellerAddress']").val(selectRows[0].registeredAddress);
            parent.layer.close(parent.layer.getFrameIndex(window.name));
            //采购合同货物供货商
            parent.$(":input[name='nsrsbh']").val(selectRows[0].nsrsbh);
            parent.$(":input[name='supplier']").val(selectRows[0].supplierName);
        }else {
            layer.msg("请选择一家供货商!");
        }
    });
    
        $(".fixed-table-container input[type='checkbox']").click(function() {
            if ($(this).attr("checked") == true) {
                $(".fixed-table-container input[type='checkbox']").attr("checked", false);
                $(this).attr("checked", true);
            }
        });
});
