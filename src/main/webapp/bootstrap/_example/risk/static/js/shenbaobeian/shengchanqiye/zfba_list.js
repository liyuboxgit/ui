var columns = [
    {
        checkbox : true
    },
    {
        title : '宗服备案明细ID',
        align:'center',
        field : 'zfbamx',
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
        title : '生产企业名称',
        field : 'qymc'
    },
    {
        title : '企业纳税人识别号',
        field : 'qynsrsbh'
    },
    {
        title : '备案日期',
        field : 'barq'
    },
    {
        title : '备案状态',
        field : 'bazt',
        formatter:$thisExamineStatusFormatter
    }
];

function $thisExamineStatusFormatter(value,row,index){//
    var title = "",className = "";
    switch(value){
        case "1":
            title = "备案";
            className = "fa-check-circle-o text-success beia";
            break;
        case "2":
            title = "变更";
            className = "fa-check-circle-o text-success beia";
            break;
        case "0":
            title = "未备案";
            className = "fa fa-times-circle text-danger beia";
            break;
        default:
            title = "未备案";
            className = "fa fa-times-circle text-danger beia";
            break;
    }
    return '<i title="'+title+'" class="fa '+className+'" key='+row.uuid+'>'+title+'</i>';
}

$(function() {
    //加载数据
    queryData("../../../../shenBaoBeiAn/shengChanQiYeBeiAnList?ghs="+parent.params.uuid);
});
