$(document).ready(function() {

	var init = true;

	var readings = [];

	var stn_data = {
		"stns" : [{
			"name" : "Fenit",
			"meta" : "Fenit",
			"ref" : "0000023066",
			"value" : null
		}, {
			"name" : "Blennerville",
			"meta" : "Blennerville",
			"ref" : "0000023062",
			"value" : null
		}, {
			"name" : "Ballyard",
			"meta" : "Ballyard",
			"ref" : "0000023063",
			"value" : null
		}, {
			"name" : "Ballymullen",
			"meta" : "Ballyard",
			"ref" : "0000023012",
			"value" : null
		}]
	};

	var chart_data = {
		labels : [],
		series : [],

	};

	var chart_opts = {
		high : 5,
		low : 0,
		showArea : true,
		showLine : false,
		showPoint : true,
		fullWidth : true,

		chartPadding : {
			right : 30,
			left : 30
		},
		axisX : {
			showLabel : false,
			showGrid : false,
			position : 'start',
			offset : 0
		},
		axisY : {
			showGrid : false,
			showLabel : false,
			showGrid : false,
			offset : 0
		},
		plugins : [Chartist.plugins.ctPointLabels({
			textAnchor : 'middle',
			labelInterpolationFnc : function(value) {
				return name + value.toFixed(2) + 'm';
			}
		}), Chartist.plugins.tooltip({
			appendToBody : true
		})]

	};

	var chart = new Chartist.Line('.ct-chart', chart_data, chart_opts);

	wait_for_no_man();

	setInterval(wait_for_no_man, 300000);

	function wait_for_no_man() {

		$.getJSON("data.php	", function(data) {

			readings = [];
			chart_data.series = [];

			var items = [];

			$.each(stn_data.stns, function(k, v) {

				stn_data.stns[k].value = null;

			});

			$.each(data.features, function(k, v) {

				$.each(stn_data.stns, function(kk, vv) {

					// od val takes presidence
					if (v.properties['station.ref'] == vv.ref && v.properties['sensor.ref'] == "OD") {

						stn_data.stns[kk].value = v.properties.value;

						// the sensor 0001 but only if the value has not alreaddy been set by od
					} else if (v.properties['station.ref'] == vv.ref && v.properties['sensor.ref'] == "0001" && !stn_data.stns[kk].value) {

						stn_data.stns[kk].value = v.properties.value;

					}

				});

			});

			// only set up the labels on the inital run
			if (init) {

				$.each(stn_data.stns, function(k, v) {

					chart_data.labels.push(v.name);

				});

				init = false;
			}

			$.each(stn_data.stns, function(k, v) {

				readings.push({
					meta : v.name,
					value : v.value
				});

			});

			chart_data.series.push(readings);

			chart.update();

		});

	}

});
