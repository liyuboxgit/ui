var bcht="";

var columns = [
    {
        checkbox : true
    },
    {
        title : '合同货物ID',
        align:'center',
        field : 'bchthw',
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
        title : '货物名称',
        field : 'goodsName'
    },
    {
        title : '数量',
        field : 'numbers'
    },
    {
        title : '规格型号',
        field : 'itemType'
    },
    {
        title : '计量单位',
        field : 'measurementUnit'
    },
    {
        title : '单价',
        field : 'price'
    },
    {
        title : '总价',
        field : 'total'
    }
];

$(function() {
    //初始表头按钮
    addTableHeaderOpration({
        container : "optionsBtn",
        btns : [
            {id: "import", content: "导入",className : "glyphicon glyphicon-import"},
            {id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
            {id: "update", content: "修改",className : "glyphicon glyphicon-pencil"}
        ]
    });
    //加载数据
    queryData("../../../../buchonghetonghw/findPageByCondition?bcht="+parent.params.bcht);

    //添加
    $(document).on("click", "#add", function() {
        bcht = parent.params.bcht;
        openLayer({
            // id :parent.params.cght,
            title : "添加物资",
            url : "../../hetong/buchonghetong/bcht_addGood.html"
        });
    });

    //修改
    $(document).on("click","#update",function() {
        var selectRows = $table.bootstrapTable('getSelections');
        if (selectRows.length === 1) {
            layer.open({
                type : 2,
                skin : 'myLayui', // 样式类名
                title : "修改物资信息",
                area : [ "98%", "96%" ],
                content : "../../hetong/buchonghetong/bcht_addGood.html?tempTime="+new Date().getTime(),
                success : function(layero, index) {
                    console.log(selectRows[0]);
                    var currentFrame = layero.find("iframe")[0].contentWindow.document;
                    $.ajax({
                        url:'../../../../buchonghetonghw/selectByPrimaryKey',
                        type:'POST',
                        dataType:'json',
                        data:{
                            "bchthw":selectRows[0].bchthw,
                        },
                        success:function(result){
                            $("#addInfoForm input[name='bchthw']",currentFrame).val(selectRows[0].bchthw);
                            setFormData('addInfoForm',currentFrame,result.data)
                        },
                    })

                }
            });
        } else {
            parent.layer.msg("请选择一条数据进行编辑!");
        }
    });

    //导入
    $(document).on('click', '#import', function() {
        bcht = parent.params.bcht
        url="../../../../buchonghetonghw/bchtHwfileUpload?bcht="+bcht;
        openLayer({
            title : "导入文件",
            area : [ "60%", "60%" ],
            url : "../../hetong/buchonghetong/bchtimport.html"
        });
    });

});
