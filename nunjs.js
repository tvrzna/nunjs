/**
	nunjs 0.0.5

	https://github.com/tvrzna/nunjs

	Released under the MIT License.
**/
Nunjs = {
	each: (obj, callback) => {
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
	includes: (arr, el) => {
		if (arr && el) {
			return arr.indexOf(el) >= 0;
		}
		return false;
	},
	matches: (obj, selector) => {
		if (!selector || !obj || obj.nodeType !== 1) return false;
		var matchesSelector = obj.matches || obj.webkitMatchesSelector ||
								obj.mozMatchesSelector || obj.oMatchesSelector ||
								obj.matchesSelector || obj.msMatchesSelector;
		if (matchesSelector) return matchesSelector.call(obj, selector);
		return false;
	},
	removeWithChildren: (i, el) => {
		$(el).find('*').each(Nunjs.removeWithChildren);
		$(el).remove();
	},
	'_events' : {}
};

window.$ = (selector) =>{
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
		nunjs: '0.0.5',
		addClass: name => {
			this.each(() => {
				if (!this.classList.contains(name)) {
					this.classList.add(name);
				}
			});
			return this;
		},
		appendTo: selector => {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(() => {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target[i].appendChild(copy);
					result.push(copy);
				}
			});
			return $(result);
		},
		attr: (attr, value) => {
			if (value === null || value === undefined) {
				return this[0].getAttribute(attr);
			} else {
				this.each(() => {
					this.setAttribute(attr, value);
				});
				return this;
			}
		},
		click: trigger => {
			if (trigger === null || typeof trigger !== 'function') {
				this.each(() => {
					this.click();
				});
			} else {
				this.each((i, el) => {
					$(el).on('click', trigger);
				});
			}
			return this;
		},
		clone: () => {
			var result = [];
			this.each(() => {
				var clone = this.cloneNode(true);
				result.push(clone);
			});
			return $(result);
		},
		each: callback => {
			Nunjs.each(dom, callback);
			return this;
		},
		find: selector => {
			var result = [];
			this.each(() => {
				var data = this.querySelectorAll(selector);
				for(var i=0; i < data.length; i++) {
					if (!Nunjs.includes(result, data[i]))
						result.push(data[i]);
				}
			});
			return $(result);
		},
		hasClass: name => {
			var result = false;
			this.each(() => {
				if (this.classList.contains(name))
					result = true;
				return;
			});
			return result;
		},
		hasEvent: event => {
			return Nunjs._events[this[0]] !== undefined && Nunjs._events[this[0]][event] !== undefined;
		},
		hide: () => {
			this.each(() => {
				this.style.display = 'none';
			});
			return this;
		},
		html: content => {
			if (content === undefined) {
				return this[0].innerHTML;
			}
			this.find('*').each(Nunjs.removeWithChildren);
			this.each(() => {
				this.innerHTML = content;
			});
			return this;
		},
		insertAfter: selector => {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(() => {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target.parent()[0].insertBefore(copy, target[i].nextSibling);
					result.push(copy);
				}
			});
			return $(result);
		},
		insertBefore: selector => {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(() => {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target.parent()[0].insertBefore(copy, target[i]);
					result.push(copy);
				}
			});
			return $(result);
		},
		is: selector => {
			return Nunjs.matches(this[0], selector);
		},
		off: (event, trigger) => {
			this.each(() => {
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
		on: (event, trigger) => {
			this.each(() => {
				if (!(this in Nunjs._events)) Nunjs._events[this] = {};
				if (!(event in Nunjs._events[this])) Nunjs._events[this][event] = [];
				Nunjs._events[this][event].push(trigger);
				this.addEventListener(event, trigger);
			});
			return this;
		},
		parent: selector => {
			var result = [];
			this.each((i, el) => {
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
		prependTo: selector => {
			var target = 'string' == typeof selector ? document.querySelectorAll(selector) : selector;
			var result = [];

			this.each(() => {
				for(var i = 0; i <= target.length; i++) {
					var copy = this.cloneNode(true);
					target[i].insertBefore(copy, target[i].childNodes[0]);
					result.push(copy);
				}
			});
			return $(result);
		},
		prop: (prop, value) => {
			if (value === null || value === undefined) {
				return this[0][prop];
			} else {
				this.each(() => {
					this[prop] = value;
				});
				return this;
			}
		},
		ready: trigger => {
			this.each(() => {
				this.addEventListener('DOMContentLoaded', trigger);
			});
			return this;
		},
		remove: () => {
			this.each(() => {
				Nunjs._events[this] = [];
				this.remove();
			});
		},
		removeClass: name => {
			this.each(() => {
				if (this.classList.contains(name))
					this.classList.remove(name);
			});
			return this;
		},
		removeAttr: name => {
			this.each(() => {
				this.removeAttribute(name);
			});
			return this;
		},
		removeProp: prop => {
			this.each(() => {
				this[prop] = undefined;
			});
			return this;
		},
		show: () => {
			this.each(() => {
				this.style.display == 'none' && (this.style.display = '');
				if (getComputedStyle(this, '').getPropertyValue('display') == 'none')
					this.style.display = 'block';
			});
			return this;
		},
		submit: () => {
			this.each(() => {
				this.submit();
			});
			return this;
		},
		text: content => {
			var resultText = "";
			this.each(() => {
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
		toggle: () => {
			var show = getComputedStyle(this[0], '').getPropertyValue('display') == 'none';
			this.each(() => {
				show ? $(this).show() : $(this).hide();
			});
			return this;
		},
		val: value => {
			if (value === undefined) {
				return this[0].value;
			} else {
				this.each(() => {
					this.value = value;
				});
				return this;
			}
		}
	};
	nunjs.length = 0;
	Nunjs.each(dom, (i, el) => {
		nunjs[i] = el;
		nunjs.length = i;
	});
	return nunjs;
};

window.$.ajax = (arg1, arg2, type) => {
	var options;
	if (typeof arg1 === 'object') {
		options = arg1;
	} else if (typeof arg2 === 'object') {
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

	xhttp.onreadystatechange = () => {
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

window.$.post = (arg1, arg2) => {
	return window.$.ajax(arg1, arg2, 'POST');
};

window.$.get = (arg1, arg2) => {
	return window.$.ajax(arg1, arg2, 'GET');
};

window.$.put = (arg1, arg2) => {
	return window.$.ajax(arg1, arg2, 'PUT');
};