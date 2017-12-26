$(document).on('click','#search',function(){
		paychart()
	})
	
// 按成交方式
	function paychart(){
	 $('#shuieChart').highcharts({
		title: {
			text: '退税统计'
		},
		subtitle: {
			text: '数据来源: 退税统计'
		},
		xAxis: {
			categories: ['2003','2004','2005','2006','2007','2008','2009','2010']
		},
		yAxis: {
			title: {
                    text: '总的统计 ($)'
            },
            plotLines: [{  //plotLines：标示线
                value: 2,  //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                width: 1,  //标示线的宽度，2px
                dashStyle:'solid',  //默认值，这里定义为实线
                color: '#808080',//线的颜色，定义为灰色
            }]
		},
		legend: {
			layout: 'vertical',  //图例内容布局方式，有水平布局及垂直布局可选，对应的配置值是： “horizontal(水平)”， “vertical(垂直)”
            align: 'left',  //图例在图表中的对齐方式，有 “left”, "center", "right" 可选
            verticalAlign: 'middle',  //垂直对齐方式，有 'top'， 'middle' 及 'bottom' 可选
            borderWidth: 2 //边框宽度
		},
		tooltip: {
            valueSuffix: '万$',
        },
		series: [
            {  
            name: '已退税额',
            data: [7, 6, 9, 14, 18, 21, 25, 26]
            }]
		
	});
	
	}