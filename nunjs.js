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
	matches: function(obj, selector) {
		if (!selector || !obj || obj.nodeType !== 1) return false;
		var matchesSelector = obj.matches || obj.webkitMatchesSelector ||
								obj.mozMatchesSelector || obj.oMatchesSelector ||
								obj.matchesSelector;
		if (matchesSelector) return matchesSelector.call(obj, selector);
		return false;
	}
};

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
				return dom[0][attr];
			} else {
				this.each(dom, function() {
					this[attr] = value;
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
					if (!result.includes(data[i]))
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
			return Nunjs.matches(dom[0], selector);
		},
		off: function(event, trigger) {
			this.each(function() {
				if (trigger === undefined) {
					var listeners = getEventListeners(this);
					for (var i = 0; i < listeners[event].length; i++) {
						this.removeEventListener(event, listeners[event][i].listener);
					}
				} else {
					this.removeEventListener(event, trigger);
				}
			});
			return this;
		},
		on: function(event, trigger) {
			this.each(function() {
				this.addEventListener(event, trigger);
			});
			return this;
		},
		parent: function(selector) {
			var result = [];
			this.each(function(i, el) {
				if (el.parentElement === undefined)
					return;

				if (!selector && !result.includes(el.parentElement))
					result.push(el.parentElement);

				if (selector) {
					if (Nunjs.matches(el.parentElement, selector) && !result.includes(el.parentElement)) {
						result.push(el.parentElement);
					} else if(!Nunjs.matches(el, selector)) {
						var parent = el.parentElement;
						do {
							if (Nunjs.matches(parent, selector)) {
								if (!result.includes(parent))
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
					this.style.display = defaultDisplay(this.nodeName);
			});
			return this;
		},
		toggle: function() {
			var show = dom[0].style.display === 'none';
			this.each(function() {
				show ? el.show() : el.hide();
			});
			return this;
		}
	};
	Nunjs.each(dom, function(i, el) {
		nunjs[i] = el;
		nunjs.length = i;
	});
	return nunjs;
};