# nunjs
__[ˈnuɲeθ]__

Very small jQuery-like library with only few functions with emphasis on total size.

### Functions
##### addClass
_since 0.0.1_

`addClass(name)` -> `self`

Add class to each element.

##### ajax
_since 0.0.2_

`ajax(options)` -> `xhttp`

Performs an Ajax request.

`async` boolean, default `true`

`complete` function

`data` string

`error` function(xhttp)

`headers` {}

`success` function(responseText, xhttp)

`type` string, default `GET`

`url` string

##### appendTo
_since 0.0.3_

`appendTo(selector)` -> `collection`

Appends collection as last into each element found by selector.

##### attr
_since 0.0.1_

`attr(attribute_name)` -> `value`

`attr(attribute_name, value)` -> `self`

Read or set DOM attribute of each element. If `value` is not defined, it returns value of first element, otherwise it sets attribute to each element.

##### click
_since 0.0.1_

`click()` -> `self`

`click(trigger)` -> `self`

If `trigger` is not defined, it performs click on each element, otherwise it adds event listener.

##### clone
_since 0.0.3_

`clone()` -> `collection`

Performs deep copy of each element and return clones as collection.

##### each
_since 0.0.1_

`each(function (index, element) { ... })` -> `self`

Iterates elements of the collection. Function arguments are optional since current element is accessible with `this` keyword.

##### find
_since 0.0.1_

`find(selector)` -> `collection`

Finds elements by `selector` in current children collection of elements.

##### hasClass
_since 0.0.1_

`hasClass(name)` -> `boolean`

Checks if any element in collection has specified class.

##### hide
_since 0.0.1_

`hide()` -> `self`

Hides elements in collection by setting `display` to `none`.

##### is
_since 0.0.1_

`is(selector)` -> `boolean`

Checks first element of collection matches the CSS selector.

##### insertAfter
_since 0.0.3_

`insertAfter(selector)` -> `collection`

Inserts copy of collection after each element found by selector.

##### insertBefore
_since 0.0.3_

`insertBefore(selector)` -> `collection`

Inserts copy of collection before each element found by selector.

##### nunjs
_since 0.0.3_

`nunjs` -> `version`

Not a function, just a property, that signals current version of library.

##### off
_since 0.0.1_

`off(event)` -> `self`

`off(event, trigger)` -> `self`

Detach event handlers added with `on`. If trigger is defined, it detach only this one specific listener, otherwise it detach all of `event` type.

##### on
_since 0.0.1_

`on(event, trigger)` -> `self`

Attach event handler to all elements in collection.

##### parent
_since 0.0.1_

`parent()` -> `collection`

`parent(selector)` -> `collection`

If `selector` is not defined, it returns collection of parents of all elements, otherwise it returns collection of parents (on any level) matching selector.

##### prependTo
_since 0.0.3_

`appendTo(selector)` -> `collection`

Appends collection as first into each element found by selector.

##### prop
_since 0.0.3_

`prop(property_name)` -> `value`

`prop(property_name, value)` -> `self`

Read or set DOM property of each element. If `value` is not defined, it returns property of first element, otherwise it sets property to each element.

##### ready
_since 0.0.1_

`ready(trigger)` -> `self`

Attach an event handler for the `DOMContentLoaded`, that is fired when the page is ready.

##### remove
_since 0.0.3_

`remove()` -> `void`

Removes all elements in the collection.

##### removeAttr
_since 0.0.3_

`removeAttr(name)` -> `self`

Removes specified attribute from all elements in the collection.

##### removeClass
_since 0.0.1_

`removeClass(name)` -> `self`

Removes specified class from all elements in the collection.

##### removeProp
_since 0.0.3_

`removeProp(property_name)` -> `self`

Removes specified property from all elements in the collection.

##### show
_since 0.0.1_

`show()` -> `self`

Restores default value of `display` on all elements.

##### submit
_since 0.0.1_

`submit()` -> `self`

Performs submit.

##### text
_since 0.0.1_

`text()` -> `string`

`text(content)` -> `self`

Gets of sets the text content of elements in the collection. If no content is defined, it returns the text contents of all elements, otherwise it replaces the text content of each elements.

##### toggle
_since 0.0.1_

`toggle()` -> `self`

Toggles between showing and hiding of the elements based on their on `display` property of first element in collection.


##### val
_since 0.0.2_

`val()` -> `string`

`val(value)` -> `self`

Gets or sets value of form control. If no value is defined, it returns value of first element, otherwise it sets value for all elements in collection.


![](http://pbfcomics.com/wp-content/uploads/2016/04/PBF145-Nunez.jpg)