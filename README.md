# nunjs
__[ˈnuɲeθ]__

Very small jQuery-like library with only few functions with emphasis on total size.

### Functions
##### addClass
_since 0.0.1_

`addClass(name)` -> `self`

Add class to each element.

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

##### ready
_since 0.0.1_

`ready(trigger)` -> `self`

Attach an event handler for the `DOMContentLoaded`, that is fired when the page is ready.

##### removeClass
_since 0.0.1_

`removeClass(name)` -> `self`

Removes specified class from all elements in the collection.

##### show
_since 0.0.1_

`show()` -> `self`

Restores default value of `display` on all elements.

##### toggle
_since 0.0.1_

`toggle()` -> `self`

Toggles between showing and hiding of the elements based on their on `display` property of first element in collection.