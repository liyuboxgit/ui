/**
 * Created by fyq on 2017/11/13.
 */
var key = "uuid";
var columns = [
    {
        checkbox : true
    },
    {
        title : '委托方ID',
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
        title : '委托方名称',
        field : 'supplierName',
        align:'center',
        formatter : lookInfoFormatter
    },
    {
        title : '委托方纳税人识别号',
        align:'center',
        field : 'nsrsbh'
    },
    {
        title : '企业类型',
        align:'center',
        field : 'supplierType'
    }
];

$(function() {
//初始表头按钮，预留查询功能
    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "ok", content: "确定",className : "glyphicon glyphicon-ok-sign"}
        ]
    });

    //加载数据
    queryData("../../../../buchonght/findWtfPageByCondition");

    //保存供货商信息
    $("#ok").bind("click",function(){
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            console.log(selectRows[0]);
            parent.$(":input[name='wftfnsrsbh']").val(selectRows[0].nsrsbh)
            parent.$(":input[name='wtfmc']").val(selectRows[0].supplierName);
            parent.$(":input[name='wtfqdr']").val(selectRows[0].contacts);
            parent.$(":input[name='wtflxdh']").val(selectRows[0].telephone);
            parent.$(":input[name='wtfdz']").val(selectRows[0].registeredAddress);
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        }else {
            layer.msg("请选择一家供货商!");
        }
    });

});
