var guandan = 'guandan';
	var flag = 'Chart';
	var guandan= 'guandan';
	var jine = 'jine';
	var fenlei = 'fenlei';
	$(document).on('click','#search',function(){
		if ($('#selecter option:selected').text() == '关单数量') {
			$('#guandan').show().siblings().hide();
			guandanchart();
		}else if($('#selecter option:selected').text() == '出口金额'){
			$('#jine').show().siblings().hide();
			jinechart();
		}else if($('#selecter option:selected').text() == '商品分类数量'){
			$('#fenlei').show(1000).siblings().hide();
			fenleichart();
		}
	})
// 按成交方式
	function guandanchart(){
	 $('#' + guandan + flag).highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: '关单数量'
		},
		subtitle: {
			text: '数据来源: 关单数量'
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: '总的统计'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y}'
				}
			},
			column: {
            	pointWidth:50
        	}
		},
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
		},
		series: [{
			name: '出口国家',
			colorByPoint: true,
			data: [{
				name: '美国',
				y: 120,
				drilldown: '2002'
			}, {
				name: '日本',
				y: 540,
				drilldown: '2005'
			}, {
				name: '德国',
				y: 450,
				drilldown: '2009'
			}, {
				name: '加拿大',
				y: 120,
				drilldown: '2002'
			}, {
				name: '意大利',
				y: 540,
				drilldown: '2005'
			}]
		}]
		
	});
	
	}
// 按关单号
function jinechart(){
	 $('#' + jine + flag).highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: '出口金额'
		},
		subtitle: {
			text: '数据来源: 出口金额'
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: '总的统计'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y}万元'
				}
			},
			column: {
            	pointWidth:50
        	}
		},
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
		},
		series: [{
			name: '出口国家',
			colorByPoint: true,
			data: [{
				name: '美国',
				y: 220,
				drilldown: '2002'
			}, {
				name: '日本',
				y: 110,
				drilldown: '2005'
			}, {
				name: '德国',
				y: 330,
				drilldown: '2009'
			}, {
				name: '加拿大',
				y: 220,
				drilldown: '2002'
			}, {
				name: '意大利',
				y: 440,
				drilldown: '2005'
			}]
		}]
		
	});
	
	}
// 按贸易方式
	function fenleichart(){
		
	}