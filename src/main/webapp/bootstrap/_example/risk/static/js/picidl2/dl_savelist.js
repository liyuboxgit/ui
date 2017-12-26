var key = "bgd", bgdWithOneServiceType = true;

$(function(){

    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "ok", content: "确定",className : "glyphicon glyphicon-export"}
        ]
    });
    var $table = $("#table");
    var $ok = $("#ok"); //确定按钮
    var selectRowData = null; //点击选择的行数据
    var columns = [
        {
            checkbox : true,
            class : "hide"
        },
        {
            title : '序号',
            align:'center',
            formatter : function(value,row,index){
//	            var page = $table.bootstrapTable("getPage");
//	            var pageSize = page.pageSize,pageNumber = page.pageNumber;
//	            return page.pageSize*(page.pageNumber-1)+index+1;
                return index+1;
            }
        },{
            title : '海关代码id',
            field : 'hgdmk',
            visible : false
        },
        {
            title : '关单号id',
            field : 'bgd',
            visible : false
        },
        {
            title : '商品编码',
            field : 'cmcode',
            formatter : function(value,row,index){
                return lookInfoFormatter(value,row,index,15);
            }

        },
        {
            title : '商品名称',
            field : 'cmname',
            formatter : function(value,row,index){
                return labelTrimFormatter(value,row,index,15);
            }
        },
        {
            title : '有效期开始',
            field : 'staTime'
        },
        {
            title : '有效期结束',
            field : 'endTime'
        },
        {
            title : '征税率',
            field : 'zsl'
        },
        {
            title : '退税率',
            field : 'tsl'
        }
    ];

    var bgdId = parent.params.BGD;
    var GOODS_CODE = parent.params.GOODS_CODE;
    tableListInit();
    function tableListInit(){
        ajaxHelper("../../../../sbpcdl/queryChooseCode?bgd="+bgdId+"&cmcode="+GOODS_CODE,{},function(result){
            var arr = [];
            if(result.success && result.data && result.data.length>0){
                arr = result.data
            }
            queryData({
                data: {data:{thisPageElements:arr}},
                $container : $table,
                columns : columns,
                height : 340,
                singleSelect : true,
                onClickRow : function(row,$element,field){
                    selectRowData = row;
                    $element.closest("tbody").find("td").css("backgroundColor","");
                    $element.closest("tr").find("td").css("backgroundColor","#e1dddd");
                },
                onDblClickRow : function(row,$element,field){
                    this.onClickRow(row,$element,field);
                    $ok.click();
                }
            });
        });

    }

    //查看详情
    $(document).on("click",".lookInfo", function(){
        openLayer({
            ele:this,
            id : $(this).attr("key"),
            title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
            url : "../../../pages/guandan/guandan/xiangqing.html"
        });
    });

    //确定按钮
    $ok.on("click",function(){
        if (selectRowData == null) {
            layer.msg("请选择一个商品代码!");
        } else {
            parent.$("#tableList").bootstrapTable("updateByUniqueId",{
                id : parent.params.BGDMX,
                row : {
                    yxzCode : selectRowData.cmcode,
                    hgdmk : selectRowData.hgdmk,
                }
            });
            parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
        }
    });
});
