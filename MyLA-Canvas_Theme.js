// adding MyLA tool
	let svgE = '<svg width="35" height="35" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">' +
		'<g>' +
		'<title>background</title>' +
		'<rect fill="#fff" id="canvas_background" height="472" width="502" y="-1" x="-1"/>' +
		'<g display="none" id="canvasGrid">\' +\n' +
		'<rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" id="svg_1"/>' +
		'</g></g><g>' +
		'<title>Layer 1</title>' +
		'<rect stroke="#c1c1bf" fill="none" stroke-width="8" x="3.49999" y="3.500013" width="492.999986" height="462.999997" id="svg_10" rx="10"/>' +
		'<line stroke-linecap="null" stroke-linejoin="null" id="svg_15" y2="77.5" x2="417.5" y1="138.5" x1="298.5" stroke-width="25" stroke="#00274c" fill="#00274c"/>' +
		'<line stroke-linecap="null" stroke-linejoin="null" id="svg_14" y2="137.5" x2="299.5" y1="82.5" x1="188.5" stroke-width="25" stroke="#00274c" fill="#00274c"/>' +
		'<line stroke-linecap="null" stroke-linejoin="null" id="svg_13" y2="82.5" x2="194.5" y1="163.5" x1="80.5" stroke-width="25" stroke="#00274c" fill="#00274c"/>' +
		'<rect stroke="#000" rx="5" id="svg_2" height="178" width="80" y="252.5" x="44.5" stroke-width="1.5" fill="#00274c"/>' +
		'<rect stroke="#000" rx="5" id="svg_3" height="257" width="80" y="174.5" x="153.5" stroke-width="1.5" fill="#00274c"/>' +
		'<rect stroke="#000" rx="5" id="svg_4" height="203" width="80" y="230.5" x="263.5" stroke-width="1.5" fill="#00274c"/>' +
		'<rect stroke="#000" rx="5" id="svg_5" height="270" width="80" y="163.5" x="376.5" stroke-width="1.5" fill="#00274c"/>' +
		'<ellipse ry="40" rx="40" id="svg_6" cy="162.5" cx="83.5" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#ffcb05"/>' +
		'<ellipse ry="40" rx="40" id="svg_7" cy="83.5" cx="191.5" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#ffcb05"/>' +
		'<ellipse ry="40" rx="40" id="svg_8" cy="138.5" cx="298.5" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#ffcb05"/>' +
		'<ellipse ry="40" rx="40" id="svg_9" cy="80.5" cx="415.5" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#ffcb05"/>' +
		'</g></svg>';


	let getUrls = function(){
		let hostname =window.location.hostname;
		let mylaToCloudFrontURLMap= {
			"test": {
				"myla": "http://test-myla.tl.it.umich.edu/courses/",
				"cloud_front": "https://d24wmcu6gomo52.cloudfront.net/?callback=mylaf19"
			},
			"prod": {
				"myla": "http://myla.tl.it.umich.edu/courses/",
				"cloud_front": "https://d2jiua7ndrer3o.cloudfront.net/?callback=mylaf19"
			}
		};
		if(hostname.includes("test") || hostname.includes("beta")){
			return mylaToCloudFrontURLMap["test"];
		}
		return mylaToCloudFrontURLMap["prod"];
	};

	let addMyLAUrl = function(myla_feed, courseId, url, mylaURL){
		if (myla_feed[courseId] !== undefined) {
			roles = ENV.current_user_roles;
			if (roles.length == 2 && roles.includes("user") && roles.includes("student")) {
				if (url.includes("files") && myla_feed[courseId].ra) {
					let instructorView = $('.ef-actions').length
					if (instructorView == 0) {
						resourcesURL = mylaURL + courseId + "/resources/";
						$(svgE +
							'<a href=' + resourcesURL + ' target="_blank" class="ef-name-col__link">' +
							'<span class="ef-name-col__text" style="margin: 5px">Resources Accessed</span> </a>').insertAfter($('.ef-header__secondary'))
					}
				}
				if (url.includes("assignments") && myla_feed[courseId].ap) {
					assignmentURL = mylaURL + courseId + "/assignments/";
					$('<div>' + svgE +
						'<a href=' + assignmentURL + ' target="_blank" class="ef-name-col__link">' +
						'<span style="float: left;margin: 5px">Assignment Planning</span></a></div>').insertAfter($('.header-bar-right'))
				}

				if (url.includes("grade") && myla_feed[courseId].gd) {
					gradesURL = mylaURL + courseId + "/grades/";
					$('<div style="float: left">' + svgE + '<a href=' + gradesURL + ' target="_blank" style="padding: 3px">Grade Distribution</span></a></div>')
						.appendTo($("#print-grades-button-container"));
				}
			}
		}

	};

	let enableMyLATool = function() {
		url = window.location.href
		if (url.includes("files") || url.includes("assignments") || url.includes("grade")) {
			courseId = url.split('/')[4];
			link = getUrls();
			$.ajax({
				url: link.cloud_front,
				dataType: 'jsonp',  //use jsonp data type in order to perform cross domain ajax
				cache: true,
				jsonp: false,
				jsonpCallback: "mylaf19",
				crossDomain: true,
				timeout: 3000, // setting timeout for 3 sec
				success: function (response) {
					addMyLAUrl(response, courseId, url, link.myla)
				}, error: function (x, t, m) {
				}
			});
		}
	};
	enableMyLATool();


