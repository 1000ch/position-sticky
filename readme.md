# `position-sticky`

Polyfill for `position: sticky;`.

## Usage

Load `position-sticky.min.js`.

```html
<script src="dist/position-sticky.js"></script>
```

Create `PositionSticky()` instance and call `attach()`.

```javascript
var positionSticky = PositionSticky(document.querySelector('.sticky'));
positionSticky.attach();
```

If you want to stop, call `detach()` of instance.

```javascript
positionSticky.detach();
```

To use as Web Components Extension, set `is="position-sticky"` to `<div>`.

```html
<div is="position-sticky"></div>
```

## License

MIT: http://1000ch.mit-license.org
