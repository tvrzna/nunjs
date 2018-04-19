/* nunjs 0.0.1 */
Nunjs = {
	each: function(obj, callback) {
	var length, i = 0;
		if (Array.isArray(obj) || obj instanceof NodeList) {
			length = obj.length;
			for (; i < length; i++ ) {
				if (callback.call(obj[i], i, obj[i]) === false ) {
					break;
				}
			}
		} else {
			callback.call(obj, 0, obj);
		}
		return obj;
	},
	includes: function(arr, el) {
		if (arr && el) {
			return arr.indexOf(el) >= 0;
		}
		return false;
	},
	matches: function(obj, selector) {
		if (!selector || !obj || obj.nodeType !== 1) return false;
		var matchesSelector = obj.matches || obj.webkitMatchesSelector ||
								obj.mozMatchesSelector || obj.oMatchesSelector ||
								obj.matchesSelector || obj.msMatchesSelector;
		if (matchesSelector) return matchesSelector.call(obj, selector);
		return false;
	}
};

_events = {};

window.$ = function(selector) {
	var dom = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
	var nunjs = {
		addClass: function(name) {
			this.each(function() {
				if (!this.classList.contains(name)) {
					this.classList.add(name);
				}
			});
			return this;
		},
		attr: function(attr, value) {
			if (value === null || value === undefined) {
				return this[0].getAttribute(attr);
			} else {
				this.each(dom, function() {
					this.setAttribute(attr, value);
				});
				return this;
			}
		},
		click: function(trigger) {
			if (trigger === null || typeof trigger !== 'function') {
				this.each(function() {
					this.click();
				});
			} else {
				this.each(function(i, el) {
					$(el).on('click', trigger);
				});
			}
			return this;
		},
		each: function(callback) {
			Nunjs.each(dom, callback);
			return this;
		},
		find: function(selector) {
			var result = [];
			this.each(function() {
				var data = this.querySelectorAll(selector);
				for(var i=0; i < data.length; i++) {
					if (!Nunjs.includes(result, data[i]))
						result.push(data[i]);
				}
			});
			return $(result);
		},
		hasClass: function(name) {
			var result = false;
			this.each(function() {
				if (this.classList.contains(name))
					result = true;
				return;
			});
			return result;
		},
		hide: function() {
			this.each(function() {
				this.style.display = 'none';
			});
			return this;
		},
		is: function(selector) {
			return Nunjs.matches(this[0], selector);
		},
		off: function(event, trigger) {
			this.each(function() {
				if (trigger === undefined) {
					for (var i = 0; i < _events[this][event].length; i++) {
						this.removeEventListener(event, _events[this][event][i]);
					}
				} else {
					this.removeEventListener(event, trigger);
				}
			});
			return this;
		},
		on: function(event, trigger) {
			this.each(function() {
				if (!(this in _events)) _events[this] = {};
				if (!(event in _events[this])) _events[this][event] = [];
				_events[this][event].push(trigger);
				this.addEventListener(event, trigger);
			});
			return this;
		},
		parent: function(selector) {
			var result = [];
			this.each(function(i, el) {
				if (el.parentElement === undefined)
					return;

				if (!selector && !Nunjs.includes(result, el.parentElement))
					result.push(el.parentElement);

				if (selector) {
					if (Nunjs.matches(el.parentElement, selector) &&  !Nunjs.includes(result, el.parentElement)) {
						result.push(el.parentElement);
					} else if(!Nunjs.matches(el, selector)) {
						var parent = el.parentElement;
						do {
							if (Nunjs.matches(parent, selector)) {
								if (!Nunjs.includes(result, parent))
									result.push(parent);
								break;
							}
							parent = parent.parentNode;
						} while(parent !== 'undefined');
					}
				}
			});
			return $(result);
		},
		ready: function(trigger){
			this.each(function() {
				this.addEventListener('DOMContentLoaded', trigger);
			});
			return this;
		},
		removeClass: function(name) {
			this.each(function() {
				if (this.classList.contains(name))
					this.classList.remove(name);
			});
			return this;
		},
		show: function() {
			this.each(function() {
				this.style.display == 'none' && (this.style.display = '');
				if (getComputedStyle(this, '').getPropertyValue('display') == 'none')
					this.style.display = 'block';
			});
			return this;
		},
		submit: function() {
			this.each(function() {
				this.submit();
			});
			return this;
		},
		text: function(content) {
			var resultText = "";
			this.each(function() {
				if (content === undefined)
					resultText += this.textContent;
				else
					this.textContent = content;
			});
			if (content === undefined) {
				return resultText;
			}
			return this;
		},
		toggle: function() {
			var show = getComputedStyle(this[0], '').getPropertyValue('display') == 'none';
			this.each(function() {
				show ? $(this).show() : $(this).hide();
			});
			return this;
		}
	};
	nunjs.length = 0;
	Nunjs.each(dom, function(i, el) {
		nunjs[i] = el;
		nunjs.length = i;
	});
	return nunjs;
};