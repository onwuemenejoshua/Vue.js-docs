---
title: Plugins
description: This page provides an overview of Vue.js plugins.
---

## Introduction​

Plugins are self-contained code that usually add app-level functionality to Vue. This is how we install a plugin:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* optional options */
})
```

A plugin is defined as either an object that exposes an `install()` method, or simply a function that acts as the install function itself. The install function receives the <span class="custom-link">[app instance](https://vuejs.org/api/application.html)</span> along with additional options passed to `app.use()`, if any:

```js
const myPlugin = {
  install(app, options) {
    // configure the app
  }
}
```

There is no strictly defined scope for a plugin, but common scenarios where plugins are useful include:

1. Register one or more global components or custom directives with <span class="custom-link">[`app.component()`](https://vuejs.org/api/application.html#app-component)</span> and <span class="custom-link">[`app.directive()`](https://vuejs.org/api/application.html#app-directive)</span>.

2. Make a resource <span class="custom-link">[injectable](https://vuejs.org/guide/components/provide-inject.html)</span> throughout the app by calling <span class="custom-link">[`app.provide()`](https://vuejs.org/api/application.html#app-provide)</span>.

3. Add some global instance properties or methods by attaching them to <span class="custom-link">[`app.config.globalProperties`](https://vuejs.org/api/application.html#app-config-globalproperties)</span>.

4. A library that needs to perform some combination of the above (e.g. <span class="custom-link">[vue-router](https://github.com/vuejs/vue-router-next)</span>).


## Writing a Plugin​

In order to better understand how to create your own Vue.js plugins, we will create a very simplified version of a plugin that displays `i18n` (short for <span class="custom-link">[Internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization)</span>) strings.

Let's begin by setting up the plugin object. It is recommended to create it in a separate file and export it, as shown below to keep the logic contained and separate.


```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // Plugin code goes here
  }
}
```

We want to create a translation function. This function will receive a dot-delimited `key` string, which we will use to look up the translated string in the user-provided options. This is the intended usage in templates:


```html
<h1>{{ $translate('greetings.hello') }}</h1>
```

Since this function should be globally available in all templates, we will make it so by attaching it to app.`config.globalProperties` in our plugin:


```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```


Our `$translate` function will take a string such as `greetings.hello`, look inside the user provided configuration and return the translated value.

The object containing the translated keys should be passed to the plugin during installation via additional parameters to `app.use()`:


```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

Now, our initial expression `$translate('greetings.hello')` will be replaced by `Bonjour!` at runtime.

See also: <span class="custom-link">[Augmenting Global Properties](https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties)</span> <sup>TS</sup>


<Aside type="note" title="TIP">
Use global properties scarcely, since it can quickly become confusing if too many global properties injected by different plugins are used throughout an app.
</Aside>


### Provide / Inject with Plugins​

Plugins also allow us to use `provide` to give plugin users access to a function or attribute. For example, we can allow the application to have access to the `options` parameter to be able to use the translations object.


```js
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```

Plugin users will now be able to inject the plugin options into their components using the `i18n` key:

```vue
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

### Bundle for NPM​

If you further want to build and publish your plugin for others to use, see <span class="custom-link">[Vite's section on Library Mode](https://vitejs.dev/guide/build.html#library-mode)</span>.
