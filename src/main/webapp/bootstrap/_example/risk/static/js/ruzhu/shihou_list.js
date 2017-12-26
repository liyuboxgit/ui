
//表格标题项
var columns = [ 
	{
		//field : 'state',
		align:'center',
		checkbox : true
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
		title : '事后核查id',
		align:'center',
		field : 'ghshc',
		visible : false
	},
    {
        title : '供货商id',
        align:'center',
        field : 'ghs',
        visible : false
    },
	{
		title : '纳税人识别号',
		align:'center',
		field : 'nsrsbh',
		align : 'left',
		formatter : function (value,row,index) {
			return '<a href="javascript:ghsDetail(\''+row.ghs+'\',\''+row.ghsName+'\');">'+value+'</a>';
        }
	}, 
	{
		title : '供货商名称',
		align:'center',
		field : 'ghsName',
		align : 'left',
		formatter : labelTrimFormatter
	}, 
	{
		title : '年度',
		align:'center',
		field : 'year',
		formatter : function (value,row,index) {
			return value.toString().substring(0,4);
        }
	}, 
	{
		title : '退税额',
		align:'center',
		field : 'tse',
		align : 'right',
	},
	{
		title : '核查状态',
		field : 'chzt',
		align : 'center',
		formatter : examineStatusFormatter
	}
];

$(function(){
	//初始化查询
	formGenerator({
		container :  "advSearchBox",
		columns : [
			{
				col : "nsrsbh",
				type : "text",
				label : "纳税人识别号"
			},
			{
				col : "year",
				label : "年度",
				type : "year",
			},
			{
				col : "tse",
				label : "退税额",
				type : "startEndMoney",
				dates  : [
					{name : "tseStart", text : "起"},
					{name : "tseEnd", text : "止"}
				]
			},
            {
                col : "ghsName",
                type : "text",
                label : "企业名称"
            }
		]
	},"query");

    var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)

	$("#advSearchBox input[name='year']").val(year);
	$("#advSearchBox input[name='tseStart']").val('1000000');

	//初始表头按钮
	/*addTableHeaderOpration({
		container : "optionsBtn",
		btns : [
			{id: "import", content: "导入",className : "glyphicon glyphicon-import"},
			{id: "add", content: "添加",className : "glyphicon glyphicon-plus"},
			{id: "update", content: "修改",className : "glyphicon glyphicon-pencil"},
			// {id: "delete", content: "删除",className : "glyphicon glyphicon-trash"},
			// {id: "shenhe", content: "审核",className : "glyphicon glyphicon-pawn"}
		]
	});*/
	
	//查询
	$("#thSearchBtn").on("click",function(){
		queryData("../../../../ghsshhc/page");
	}).trigger("click");
	
	/*//导入
	$("#import").on("click", function(){
        uploadurl="../../../../chuKouHeTong/multifileUpload?type=ckht";
		openLayer({ele:this,title:'<i class="glyphicon glyphicon-import" style="padding-right:3px;font-size:12px;"></i>导入文件',area:[ "60%", "60%" ],url:"../../../pages/hetong/chukou/import.html?uploadurl="+uploadurl});
	});
	
	//添加
	$("#add").on("click", function(){
		openLayer({
			ele:this,
			title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>添加出口合同',
			area : ["98%","96%"],
			url : "../../../pages/hetong/chukou/add.html"
		});
	});*/


});

function examineStatusFormatter(value,row,index){
    var title = "",className = "";
    switch(value){
        case "1":
            title = "已核查";
            className = "fa-check-circle-o text-success";
            break;
        default:
            title = "未核查";
            className = "fa-question-circle-o text-warning";
            break;
    }
    return '<a href="javascript:addGhshc(\''+row.ghshc+'\',\''+row.ghs+'\',\''+row.nsrsbh+'\',\''+row.ghsName+'\',\''+row.tse+'\',\''+row.year+'\');"><i title="'+title+'" class="fa '+className+'"></i></a>';
}


function addGhshc(ghshc,ghs,nsrsbh,ghsName,tse,year) {
    ghsName = escape(ghsName);
    openLayer({
        ele:this,
        title : '<i class="glyphicon glyphicon-plus" style="padding-right:3px;font-size:12px;"></i>核查信息完善',
        area : ["98%","96%"],
        url : "../../../pages/ruzhu/shihou/add.html?ghshc="+ghshc+"&ghs="+ghs+"&nsrsbh="+nsrsbh+"&ghsName="+ghsName+"&tse="+tse+"&year="+year
    });
}

function ghsDetail(ghs,ghsName) {
    openLayer({
        ele:this,
        title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>供货商信息【<font color="red">'+ghsName+'</font>】',
        url : "../../../pages/ruzhu/add.html?editflag=detail&ghs="+ghs
    });
}
