var key = "tzdh";

//货物清单测试数据
var data = {
    "success": true, 
    "msg": null, 
    "data": {
        "pageSize": 10, 
        "pageNo": 1, 
        "totalCount": 0, 
        "lastPageNo": 3, 
        "nextPageNo": 2, 
        "firstPage": false, 
        "lastPage": false, 
        "thisPageElements": [
        	{
    			"name": "287823772377237",
    			"number": "天津新港",
    			"guige": "委内瑞拉",
    			"tzdh" : "拉瓜伊拉",
    			"danwei": "FOB",
    			"oneMoney": "一般贸易",
    			"totalMoney": "未审核",
    			"company": "13298323399090",
    			"ctrol": "选择"
    		},
    		{
    			"name": "287823772377237",
    			"number": "天津新港",
    			"guige": "委内瑞拉",
    			"tzdh" : "拉瓜伊拉",
    			"danwei": "FOB",
    			"oneMoney": "一般贸易",
    			"totalMoney": "未审核",
    			"company": "13298323399090",
    			"ctrol": "选择"
    		}
        ], 
        "thisPageLastElementNumber": 20, 
        "previousPageNo": 0, 
        "thisPageFirstElementNumber": 11
    }
};

$(function(){

	
	//货物清单
	var $zsgdList = $("#zsgdList");
	
	// 货物清单表头项
	var columns = [
		{
			align:'center',
			checkbox : true
           
        },
        {
        	 field : 'rwbh',
        	 class : "hide"	 
        },
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){
				/*
				var pageNumber = $(".pagination .active").text();
				var pageSize = $(".pagination-detail .page-size").text();
				return pageSize * (pageNumber-1) + index + 1;
				 */
				return index + 1;
				/*
				var page = $gdList.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
				*/
			}
		},
		{
			title : '报关单号',
			field : 'bgdh',
            formatter :function(value,row,index){
                return '<a href="javascript:;" onclick="hand2lookbgd(\''+row.bgdh+'\');" >'+value+'</a>';
            }
		}, 
		{
			title : '出口口岸',
			field : 'exportPort',
            formatter : function(value,row,index){
                return getDict("exportPortName",value);
            }
		}, 
		{
			title : '出口日期',
			field : 'expTime'
		}, 
		{
			title : '运抵国',
			field : 'arrivingCountry',
            formatter : function(value,row,index){
                return getDict("nation",value);
            }
		},
		{
			title : '指运港',
			field : 'fingerPort'
		},
		{
			title : '成交方式',
			field : 'dealMode',
            formatter : function(value,row,index){
                return getDict("jiehuifs",value);
            }
		},
		{
			title : '贸易性质',
			field : 'serviceType',
            formatter : function(value,row,index){
                return getDict("maoyifs",value);
            }
		}
//		,
//		{
//			title : '报关单id',
//			field : 'bgd'
//		}
	];
	
	//查询清单
	// queryData({columns:columns,data:data,$container:$zsgdList,height:280});
    $.ajax({
        url : "../../../../lcgdsh/getBaoGuanDanList",
        type : "post",
        data : {"rwbh":parent.lcparams.rwbh},
        // data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9"},
        dataType : "json",
        success : function(res){
            //console.log(res.data);
            var pageSize = res.data.length;
            queryData({columns:columns,data:{success:true,data:{thisPageElements:res.data}},$container:$zsgdList,height:380,pageSize:pageSize});
        }
    });
    //有任务编号的就选中
    setTimeout(function(){
    	var array = [];
		//var dataArray = data;
    	var dataArray = $zsgdList.bootstrapTable("getData");
		for(var i=0; i<dataArray.length; i++){
			if(dataArray[i].rwbh){
				array.push(dataArray[i]);
				break;
			}
		}
		array = array.map(function(item,index,arr){return item.rwbh;});
		//选中行
		$zsgdList.bootstrapTable("checkBy",{field:"rwbh",values:array});
    },200);
    
	//查看报关单详情
	$(document).on("click",".lookInfo", function(){
		//var title = popupPreHandler(this,3);
		var title = $(this).attr("title");
		openLayer({
			ele:this,
			id : $(this).attr("key"),

			area : ["98%","96%"],
			title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情【关单号：<font color="red">'+title+'</font>】',
			url : "../../../pages/liucheng/wangwu/guandan_detail.html"
		});
	});
	
	$('#qxbgd').on('click',function(){
		var selectRows = $zsgdList.bootstrapTable('getSelections'), keys="";
		if (selectRows.length > 0) {
			keys = selectRows.map(function(item) {
				return item.bgd;
			}).join(",");
		}
		$.ajax({
            url : "../../../../lcgdsh/saveBaoGuanDanGl",
            type : "post",
            data : {"rwbh":parent.lcparams.rwbh,"bgds":keys},
            // data : {"rwbh":"d529b2d31e67463588d1e7e16481dce9","bgds":keys},
            dataType : "json",
            success : function(res){
            	if(res.success){
            		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
            		parent.initList(); //刷新页面
            	} else {
            		parent.layer.msg(res.msg);
            	}
            }
        });
	});
})
//查看报关单信息
function  hand2lookbgd(bgdh) {
    $.ajax({
        url:'../../../../renwu/querybgdxx',
        type:'POST',
        dataType:'json',
        data:{
            "bgdh":bgdh,
        },
        success:function(result){
            if(result.success){
                openLayer({
                    ele:this,
                    id:result.data.bgd,
                    title : '<i class="glyphicon glyphicon-file" style="padding-right:3px;font-size:12px;"></i>报关单详情',
                    url : "../../../pages/guandan/guandan/xiangqing.html"
                });
            }else{
                layer.msg(result.msg);
            }
        }
    })

};