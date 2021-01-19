// Sets up the actions for the navigation tabs.
window.addEventListener("DOMContentLoaded", function() {
	"use strict";

	// Show the correct tab based on the URL hash
	const hash = location.hash ? location.hash : "#test";

	// Clear out the old active Tab
	if (document.getElementById("testForm")) {
		const activeContent = document.querySelector(".tab-content .active");
		const activeNav = document.querySelector("#test_info_nav .active");
		if (activeContent) activeContent.classList.remove("active");
		if (activeNav) activeNav.classList.remove("active");

		// Set new active tab
		document.querySelector(hash).classList.add("active");
		document.querySelector("a[href='" + hash + "']").classList.add("active");
	}

	// Setup Navigation Tabs to change content on click
	var links = document.querySelectorAll("a[href^='#']");

	for (let i = 0; i < links.length; ++i) {

		links[i].addEventListener("click", function(e){
			// Clear out the old active Tab
			var activeTabs = document.querySelectorAll(".tab-content .active");
			activeTabs.forEach(function(tab) {
				tab.classList.remove("active");
			})

			// Clear out old active content
			activeTabs = document.querySelectorAll("#test_info_nav .active");
			activeTabs.forEach(function(tab) {
				tab.classList.remove("active");
			})

			// Set the new tab to active
			const anchor = document.querySelector("#test_info_nav a[href='" + e.target.hash + "']");
			const  div = document.querySelector(anchor.getAttribute("href"));
			div.classList.add("active");

			anchor.classList.add("active");

			// If pushState exists,
			// use it to update the hash instead of the detail, which jumps
			if(history.pushState) {
				history.pushState(null, null, anchor.getAttribute("href"));
				e.preventDefault();
			}
		});
	}

});