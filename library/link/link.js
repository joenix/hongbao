(function(window, document, links) {
	function dom(node) {
		return node.tagName === 'BODY' || node.tagName === 'A' ? node: dom(node.parentNode)
	}
	document.onclick = function(e) {
		e = e || window.event;
		var link = dom(e.srcElement || e.target),
		href = link.getAttribute('href');
		if (href && ~href.indexOf('#!')) link.setAttribute('href', href.replace(/.*#!/, 'http://'))
	}
})(window, window.document, document.links);