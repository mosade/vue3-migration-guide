---
title: Watch on Arrays
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Overview

- **BREAKING**: When watching an array, the callback will only trigger when the array is replaced. If you need to trigger on mutation, the `deep` option must be specified.
  - In Vue 3.5+, `deep: 1` should be used, which will trigger on array replacement and array mutation.
  - Prior to Vue 3.5, `deep: true` can be used, but it will also trigger on deep changes in array elements.

## 3.x Syntax

When using [the `watch` option](https://vuejs.org/api/options-state.html#watch) to watch an array, the callback will only trigger when the array is replaced. In other words, the watch callback will no longer be triggered on array mutation. To trigger on mutation, the `deep` option must be specified.

```js
watch: {
  bookList: {
    handler(val, oldVal) {
      console.log('book list changed')
    },
    deep: 1 // Vue 3.5+
    // deep: true // Vue 3.0 - 3.4
  },
}
```

:::warning 

In versions prior to Vue 3.5, watches don't allow setting the [max traversal depth](https://vuejs.org/guide/essentials/watchers.html#deep-watchers), so you're stuck with `deep: true`, which will also trigger the callback on deep modification of array elements.

:::

## Migration Strategy

If you rely on watching array mutations, add the `deep` option to ensure that your callback is triggered correctly.

[Migration build flag: `WATCH_ARRAY`](../migration-build.html#compat-configuration)
