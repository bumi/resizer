/*

Resizer
created by: Michael Bumann - http://railslove.com
questions? michael@derbumi.com

The Resizer allows you to easlily resize and highlight images. It's inspired by Apple's iPhoto

features:
 - ability to resize html elements
 - highlight elements (making elements slightly bigger)
 - define a max and a min scale
 - allows many instanzes on one page
 - is built on prototype
 - easy to use - just give it a css selector and define a starting size.
 - easy to integrate with Script.aculo.us slider 

todo:
 - check browser compatibility
 - directly integrate slider functionality
 
usage:
	
	simply instanziate the resizer(s) by calling the following after dom:loaded: 
	
	resizer = new Resizer([SELECTOR - ELMENTS TO RESIZE],{width:[BASE WIDTH], height:[BASE HEIGHT]});
	
	resizer.scale(factor) - resizes all elements. the new width = old width * factor
	resizer.scaleElement(actor) - like scale() but only scales one element
	resizer.toggleHighlightElement(element) - toggles highlighting an element (by changing it's width and margin)
	resizer.growBy(0.1)  - same as resizer.scale(resizer.current_factor+0.1);
	resizer.shrinkBy(0.1) - same as resizer.scale(resizer.current_factor-0.1);
	
	note: you have to use inline styles for width, height, margin and padding and set the width of the image to 100% of the parent element (which we will resize)
	
	
example:	
	
	JavaScript:
		resizer = new Resizer(".picture",{width:120, height:120});
	
	HTML:
		<div class="picture" style="margin:10px;padding:3px;width:120px;height:120px">
			<img src="/path/to/picture.jpg" alt="" /
		</div>
	
	CSS:
		.picture img {
			display:block;
			margin:0 auto;
			width:100%;
		}
*/

var Resizer = Class.create();

Resizer.prototype = {
	elements:[],
	options: {},
	current_factor: 1,
	initialize: function(css_selector,options) {
		this.options = options;
		this.elements = $$(css_selector);
	},
	growBy: function(s=0.1) {
		this.scale(this.current_factor+s);
	},
	shrinkBy: function(s=0.1) {
		this.scale(this.current_factor-s);
	},
	scale: function(factor) {
		if(factor == this.current_factor)
			return
		if((this.options.max_scale && this.options.max_scale<factor) || (this.options.min_scale && this.options.min_scale>factor))
		 return 
		this.elements.each(function(e){
			this.scaleElement(e,factor);
		}.bind(this));
		this.current_factor = factor;
	},
	scaleElement: function(element, factor) {
		if((this.options.max_scale && this.options.max_scale<factor) || (this.options.min_scale && this.options.min_scale>factor))
		 return
		$(element).style.width= (factor*parseFloat(this.options.width))+'px';
		$(element).style.height= (factor*parseFloat(this.options.height))+'px';
	},
	toggleHighlightElement: function(element) {
		function add(a,b) { return a + b};
		function substract(a,b) { return a - b};
		function operator(operator,a,b) {
			if(operator=="+") { return add(a,b)}
			if(operator=="-") { return substract(a,b)}
		};
		element = $(element);

		element.toggleClassName("highlight");

		method = element.highlighted ? "+" : "-";
		// had some problems with mass asignment
		style = "margin-top:"+operator(method,parseFloat(element.style.marginTop),5)+"px;";
		style += "margin-right:"+operator(method,parseFloat(element.style.marginRight),5)+"px;";
		style += "margin-bottom:"+operator(method,parseFloat(element.style.marginBottom),5)+"px;";
		style += "margin-left:"+operator(method,parseFloat(element.style.marginLeft),5)+"px;";
		style += "widht:"+operator(method, parseFloat(element.style.width),10)+'px;';
		style += "height:"+operator(method, parseFloat(element.style.height),10)+'px;';
		
		element.morph(style);
	
		element.highlighted = element.highlighted ? false : true;
	}
	
}
// init the resizer... 
// you can have as much resizers on one page as you want
//var resizer;
//document.observe("dom:loaded", function() {
//	resizer = new Resizer(".art",{width:120, height:120});
//});