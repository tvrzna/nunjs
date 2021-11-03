/**
	nunjs 0.0.4

	https://github.com/tvrzna/nunjs

	Released under the MIT License.
**/
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
	},
	'_events' : {}
};

window.$ = function(selector) {
	var dom;

	if (typeof selector === 'string') {
		if (selector.trim().startsWith('<') && selector.trim().endsWith('>')) {
			var tmp = document.createElement('tmp');
			tmp.innerHTML = selector.trim();
			dom = tmp.firstChild;
		} else {
			dom = document.querySelectorAll(selector);
		}
	} else {
		dom = selector;
	}

	var nunjs = {
		nunjs: '0.0.4',
		addClass: function(name) {
			this.each(function() {
				if (!this.classList.contains(name)) {
					this.classList.add(name);
				}
			});
			return this;
		},
		appendTo: function(selector) {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(function() {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target[i].appendChild(copy);
					result.push(copy);
				}
			});
			return $(result);
		},
		attr: function(attr, value) {
			if (value === null || value === undefined) {
				return this[0].getAttribute(attr);
			} else {
				this.each(function() {
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
		clone: function() {
			var result = [];
			this.each(function () {
				var clone = this.cloneNode(true);
				result.push(clone);
			});
			return $(result);
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
		hasEvent: function(event) {
			return Nunjs._events[this[0]] !== undefined && Nunjs._events[this[0]][event] !== undefined;
		},
		hide: function() {
			this.each(function() {
				this.style.display = 'none';
			});
			return this;
		},
		html: function(content) {
			if (content === undefined) {
				return this[0].innerHTML;
			}
			this.each(function() {
				this.innerHTML = content;
			});
			return this;
		},
		insertAfter: function(selector) {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(function() {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target.parent()[0].insertBefore(copy, target[i].nextSibling);
					result.push(copy);
				}
			});
			return $(result);
		},
		insertBefore: function(selector) {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(function() {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target.parent()[0].insertBefore(copy, target[i]);
					result.push(copy);
				}
			});
			return $(result);
		},
		is: function(selector) {
			return Nunjs.matches(this[0], selector);
		},
		off: function(event, trigger) {
			this.each(function() {
				if (trigger === undefined) {
					for (var i = 0; i < Nunjs._events[this][event].length; i++) {
						this.removeEventListener(event, Nunjs._events[this][event][i]);
					}
					Nunjs._events[this][event] = [];
				} else {
					this.removeEventListener(event, trigger);
				}
			});
			return this;
		},
		on: function(event, trigger) {
			this.each(function() {
				if (!(this in Nunjs._events)) Nunjs._events[this] = {};
				if (!(event in Nunjs._events[this])) Nunjs._events[this][event] = [];
				Nunjs._events[this][event].push(trigger);
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
		prependTo: function(selector) {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(function() {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target[i].insertBefore(copy, target[i].childNodes[0]);
					result.push(copy);
				}
			});
			return $(result);
		},
		prop: function(prop, value) {
			if (value === null || value === undefined) {
				return this[0][prop];
			} else {
				this.each(function() {
					this[prop] = value;
				});
				return this;
			}
		},
		ready: function(trigger){
			this.each(function() {
				this.addEventListener('DOMContentLoaded', trigger);
			});
			return this;
		},
		remove: function() {
			this.each(function() {
				Nunjs._events[this] = [];
				this.remove();
			});
		},
		removeClass: function(name) {
			this.each(function() {
				if (this.classList.contains(name))
					this.classList.remove(name);
			});
			return this;
		},
		removeAttr: function(name) {
			this.each(function() {
				this.removeAttribute(name);
			});
			return this;
		},
		removeProp: function(prop) {
			this.each(function() {
				this[prop] = undefined;
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
		},
		val: function(value) {
			if (value === undefined) {
				return this[0].value;
			} else {
				this.each(function() {
					this.value = value;
				});
				return this;
			}
		}
	};
	nunjs.length = 0;
	Nunjs.each(dom, function(i, el) {
		nunjs[i] = el;
		nunjs.length = i;
	});
	return nunjs;
};

window.$.ajax = function(arg1, arg2, type) {
	var options;
	if (typeof arg1 === 'object') {
		options = arg1;
	} else if (arg2 === 'object') {
		options = arg2;
	} else {
		options = {};
	}
	if (typeof arg1 === 'string') {
		options.url = arg1;
	}
	if (type !== undefined && typeof type === 'string') {
		options.type = type;
	}

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				if (options.success !== undefined) {
					options.success(this.responseText, this);
				}
			} else {
				if (options.error !== undefined) {
					options.error(this);
				}
			}
			if (options.complete !== undefined) {
				options.complete();
			}
		}
	};
	xhttp.open(options.type !== undefined ? options.type : 'GET', options.url, options.async !== undefined ? options.async : true);

	if (options.headers !== undefined) {
		for (var name in options.headers) {
			xhttp.setRequestHeader(name, options.headers[name]);
		}
	}

	if (options.data) {
		var body;
		switch (typeof options.data) {
			case 'object':
				body = JSON.stringify(options.data);
				break;
			default:
				body = options.data;
		}
		xhttp.send(body);
	} else {
		xhttp.send();
	}
	return xhttp;
};

window.$.post = function(arg1, arg2) {
	return window.$.ajax(arg1, arg2, 'POST');
};

window.$.get = function(arg1, arg2) {
	return window.$.ajax(arg1, arg2, 'GET');
};

window.$.put = function(arg1, arg2) {
	return window.$.ajax(arg1, arg2, 'PUT');
};