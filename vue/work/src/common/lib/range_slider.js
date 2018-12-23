(function(skp11) {
	'use strict';

	var tour = skp11.tour = skp11.tour || {};

	tour.rangeSlider = function(wrapper, options) {
		this.wrapper = wrapper;
		this.defaultOptions = {
			minValue: 0,
			maxValue: 0,
			curMinValue: 0,
			curMaxValue: 0,
			selectorSlideBar: '.linear_bar',
			selectorSlideMin: '.min',
			selectorSlideMax: '.max'
		};
		this.opts = $.extend({}, this.defaultOptions, options);
	};

	tour.rangeSlider.prototype = {
		init: function() {

			if (!( this.opts.curMinValue > this.opts.minValue && this.opts.curMinValue < this.opts.maxValue && this.opts.curMinValue < this.opts.curMaxValue )) {
				this.opts.curMinValue = this.opts.minValue;
			}

			if (!( this.opts.curMaxValue > this.opts.minValue && this.opts.curMaxValue < this.opts.maxValue && this.opts.curMinValue < this.opts.curMaxValue )) {
				this.opts.curMaxValue = this.opts.maxValue;
			}

			//this.wrapper = document.querySelector(this.wrapper);
			this.slideBar = this.wrapper.querySelector(this.opts.selectorSlideBar);
			this.slideMin = this.wrapper.querySelector(this.opts.selectorSlideMin);
			this.slideMax = this.wrapper.querySelector(this.opts.selectorSlideMax);
			this.numberElements = {
				minValue: this.wrapper.querySelector("p.min_price"),
				maxValue: this.wrapper.querySelector("p.max_price"),
				currentMinValue: this.wrapper.querySelector(".linear_graph_text .min_price"), // [20180108] 국내숙박UI수정
				currentMaxValue: this.wrapper.querySelector(".linear_graph_text .max_price") // [20180108] 국내숙박UI수정
			};

			this.setInitialStyle();
			this.setRangeText();
			this.setMinText();
			this.setMaxText();
			this.setSliderWithNewVal(this.opts.curMinValue, this.opts.curMaxValue);
			this.addHandler();
		},
		setInitialStyle: function() {
			this.slideBar.style.width = "100%";
			this.slidePositionLeft = Math.abs(parseInt(window.getComputedStyle(this.slideMin)
				.getPropertyValue('left')));
			this.slideRange = this.opts.maxValue - this.opts.minValue;
			this.slideWidth = this.slideBar.offsetWidth;
			this.revision = this.slideMin.offsetWidth + this.slidePositionLeft;
			this.slideInfo = {
				current: {
					slideMin: 0,
					slideMax: this.slideWidth,
					slideMinTranslateX: 0,
					slideMaxTranslateX: 0,
					slideMinValue: this.opts.curMinValue,
					slideMaxValue: this.opts.curMaxValue,
				},
				minPageX: 0,
				maxPageX: this.slideWidth + (this.revision)
			};
			this.slidePercentage = (this.slideWidth + this.slideInfo.current.slideMaxTranslateX) / this.slideWidth * 100;

			this.slideBar.style.transform = "transform: translateX(0);";
			this.slideBar.style.webkitTransform = "transform: translateX(0);";
			this.slideMin.style.transform = "transform: translateX(0);";
			this.slideMin.style.webkitTransform = "transform: translateX(0);";
			this.slideMax.style.transform = "transform: translateX(0);";
			this.slideMax.style.webkitTransform = "transform: translateX(0);";
		},
		setRangeText: function() {
			this.numberElements.minValue.innerHTML = "최저 " + this.setNumWithComma(this.opts.minValue) + "원";
			this.numberElements.maxValue.innerHTML = "최고 " + this.setNumWithComma(this.opts.maxValue) + "원";
		},
		setMinText: function() {
			this.numberElements.currentMinValue.innerHTML = this.setNumWithComma(this.slideInfo.current.slideMinValue) + "원";
		},
		setMaxText: function() {
			this.numberElements.currentMaxValue.innerHTML = this.setNumWithComma(this.slideInfo.current.slideMaxValue) + "원";
		},
		setNumWithComma: function(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		setSliderWithNewVal: function(cur_Min, cur_Max) {
			var min_axis,
				max_axis;

			min_axis = this.slideWidth * (cur_Min - this.opts.minValue) * 1 / this.slideRange;
			this.translateMin(min_axis);

			max_axis = this.slideWidth * (this.opts.maxValue - cur_Max) * 1 / this.slideRange;
			this.translateMax(-max_axis, this.slideWidth - max_axis);

			this.slideInfo.current.slideMinValue = cur_Min;
			this.slideInfo.current.slideMaxValue = cur_Max;
			this.setMinText();
			this.setMaxText();
			this.setSliderWidth();
		},
		setSliderWidth: function() {
			this.slidePercentage = (this.slideWidth - (this.slideInfo.current.slideMinTranslateX + (this.slideInfo.current.slideMaxTranslateX * -1))) / this.slideWidth * 100;
			this.slideBar.style.width = this.slidePercentage + "%";
		},
		translateMin: function(min_axis) {
			this.slideMin.style.transform = "translateX(" + min_axis + "px)";
			this.slideMin.style.webkitTransform = "translateX(" + min_axis + "px)";
			this.slideBar.style.transform = "translateX(" + min_axis + "px)";
			this.slideBar.style.webkitTransform = "translateX(" + min_axis + "px)";

			this.slideInfo.current.slideMin = min_axis;
			this.slideInfo.current.slideMinTranslateX = min_axis;
		},
		translateMax: function(max_axis, slideMaxval) {
			this.slideMax.style.transform = "translateX(" + max_axis + "px)";
			this.slideMax.style.webkitTransform = "translateX(" + max_axis + "px)";

			this.slideInfo.current.slideMax = slideMaxval;
			this.slideInfo.current.slideMaxTranslateX = max_axis;
		},
		addHandler: function() {
			this.slideMin.addEventListener('touchmove', function() {
				this.touchMove(event);
			}.bind(this), false);

			this.slideMax.addEventListener('touchmove', function() {
				this.touchMove(event);
			}.bind(this), false);

			this.slideMin.addEventListener('touchend', function() {
				this.touchEnd();
			}.bind(this), false);

			this.slideMax.addEventListener('touchend', function() {
				this.touchEnd();
			}.bind(this), false);

			window.addEventListener('resize', function() {
				this.refreshSlider();
			}.bind(this), false);
		},
		touchMove: function(event) {
			var axis = event.targetTouches[0].pageX,
				newAxis;

			if (event.target.className.indexOf(this.opts.selectorSlideMin.slice(1)) > -1) {
				this.slideMin.style.zIndex = "2";
				this.slideMax.style.zIndex = "1";
				newAxis = axis - this.revision;

				if (newAxis >= this.slideInfo.minPageX && newAxis <= this.slideInfo.current.slideMax) {
					if (newAxis <= 10) {
						this.translateMin(this.slideInfo.minPageX);
						this.slideInfo.current.slideMinValue = this.opts.minValue;
					} else {
						this.translateMin(newAxis);
						this.slideInfo.current.slideMinValue = parseInt(this.opts.minValue + (this.slideRange * ((this.slideInfo.current.slideMin / (this.slideInfo.maxPageX - this.revision)))));
					}
					this.setMinText();

				}
			} else {
				this.slideMin.style.zIndex = "1";
				this.slideMax.style.zIndex = "2";
				newAxis = axis - this.revision - this.slideWidth;

				if (axis <= this.slideInfo.maxPageX && newAxis >= this.slideInfo.current.slideMin - this.slideWidth) {
					if (newAxis >= -10) {
						this.translateMax(0, this.slideWidth);
						this.slideInfo.current.slideMaxValue = this.opts.maxValue;
					} else {
						var slideMaxVal = axis - this.revision;
						this.translateMax(newAxis, slideMaxVal);
						this.slideInfo.current.slideMaxValue = parseInt(this.opts.minValue + (this.slideRange * (this.slideInfo.current.slideMax / (this.slideInfo.maxPageX - this.revision))));
					}
					this.setMaxText();
				}
			}

			this.setSliderWidth();
		},
		touchEnd: function() {
			if (this.opts.onTouchEnd && typeof this.opts.onTouchEnd === 'function') {
				this.opts.onTouchEnd({
					minValue: this.slideInfo.current.slideMinValue,
					maxValue: this.slideInfo.current.slideMaxValue
				});
			}
		},
		refreshSlider: function() {
			this.slideBar.style.width = "100%";
			this.slidePositionLeft = Math.abs(parseInt(window.getComputedStyle(this.slideMin)
				.getPropertyValue('left')));
			this.slideWidth = this.slideBar.offsetWidth;
			this.revision = this.slideMin.offsetWidth + this.slidePositionLeft;
			this.slideInfo.maxPageX = this.slideWidth + this.revision;
			this.slidePercentage = (this.slideWidth + this.slideInfo.current.slideMaxTranslateX) / this.slideWidth * 100;

			this.setSliderWithNewVal(this.slideInfo.current.slideMinValue, this.slideInfo.current.slideMaxValue);
		},
		resetSlider: function() {
			this.setSliderWithNewVal(this.opts.minValue, this.opts.maxValue);
		}

	};
})(window.skp11 = window.skp11 || {});