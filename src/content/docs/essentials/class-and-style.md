---
title: Class and Style Bindings
description: This page discusses Vue.js features that enable dynamic manipulation of HTML classes and inline styles.
---

A common need for data binding is manipulating an element's class list and inline styles. Since `class` and `style` are both attributes, we can use `v-bind` to assign them a string value dynamically, much like with other attributes. However, trying to generate those values using string concatenation can be annoying and error-prone. For this reason, Vue provides special enhancements when `v-bind` is used with `class` and `style`. In addition to strings, the expressions can also evaluate to objects or arrays.

## Binding HTML Classes

<span class="custom-link">[**Watch a free video lesson on Vue School**](https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue?friend=vuejs)</span>

### Binding to Objects​

We can pass an object to :class (short for v-bind:class) to dynamically toggle classes:

```html
<div :class="{ active: isActive }"></div>
```

The above syntax means the presence of the `active` class will be determined by the <span class="custom-link">[truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)</span> of the data property `isActive`.

You can have multiple classes toggled by having more fields in the object. In addition, the `:class` directive can also co-exist with the plain `class` attribute. So given the following state:

```js
const isActive = ref(true)
const hasError = ref(false)
```

And the following template:

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

It will render:

```html
<div class="static active"></div>
```

When `isActive` or `hasError` changes, the class list will be updated accordingly. For example, if `hasError` becomes `true`, the class list will become `"static active text-danger"`.

The bound object doesn't have to be inline:

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

```html
<div :class="classObject"></div>
```

This will render:

```html
<div class="active"></div>
```

We can also bind to a <span class="custom-link">[computed property](/essentials/computed/)</span> that returns an object. This is a common and powerful pattern:

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

```html
<div :class="classObject"></div>
```

### Binding to Arrays​

We can bind `:class` to an array to apply a list of classes:

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

```html
<div :class="[activeClass, errorClass]"></div>
```

Which will render:

```html
<div class="active text-danger"></div>
```

If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

This will always apply `errorClass`, but `activeClass` will only be applied when `isActive` is truthy.

However, this can be a bit verbose if you have multiple conditional classes. That's why it's also possible to use the object syntax inside the array syntax:

```html
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```

### With Components

> This section assumes knowledge of <span class="custom-link">[Components](https://vuejs.org/guide/essentials/component-basics)</span>. Feel free to skip it and come back later.

When you use the `class` attribute on a component with a single root element, those classes will be added to the component's root element and merged with any existing class already on it.

For example, if we have a component named `MyComponent` with the following template:

```html
<!-- child component template -->
<p class="foo bar">Hi!</p>
```

Then add some classes when using it:

```html
<!-- when using the component -->
<MyComponent class="baz boo" />
```

The rendered HTML will be:

```html
<p class="foo bar baz boo">Hi!</p>
```

The same is true for class bindings:

```html
<MyComponent :class="{ active: isActive }" />
```

When `isActive` is truthy, the rendered HTML will be:

```html
<p class="foo bar active">Hi!</p>
```

```html
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```html
<MyComponent class="baz" />
```

Will render:

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

You can learn more about component attribute inheritance in <span class="custom-link">[Fallthrough Attributes](/components/attribute/)</span> section.


## Binding Inline Styles​

### Binding to Objects

`:style` supports binding to JavaScript object values - it corresponds to an <span class="custom-link">[HTML element's `style` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)</span>:

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

Although camelCase keys are recommended, `:style` also supports kebab-cased CSS property keys (corresponds to how they are used in actual CSS) - for example:

```html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

It is often a good idea to bind to a style object directly so that the template is cleaner:

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})
```

```html
<div :style="styleObject"></div>
```

Again, object style binding is often used in conjunction with computed properties that return objects.

`:style` directives can also coexist with regular style attributes, just like `:class`.

```html
<h1 style="color: red" :style="'font-size: 1em'">hello</h1>
```

It will render:

```html
<h1 style="color: red; font-size: 1em;">hello</h1>
```

### Binding to Arrays​

We can bind `:style` to an array of multiple style objects. These objects will be merged and applied to the same element:

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefixing​

When you use a CSS property that requires a <span class="custom-link">[vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)</span> in `:style`, Vue will automatically add the appropriate prefix. Vue does this by checking at runtime to see which style properties are supported in the current browser. If the browser doesn't support a particular property then various prefixed variants will be tested to try to find one that is supported.

### Multiple Values​

You can provide an array of multiple (prefixed) values to a style property, for example:

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

This will only render the last value in the array which the browser supports. In this example, it will render `display: flex` for browsers that support the unprefixed version of flexbox.

