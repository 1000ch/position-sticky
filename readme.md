# position-sticky

Emulation of `position: sticky;` using JavaScript.

## Usage

Load `position-sticky.min.js`.

```html
<script src="dist/position-sticky.js"></script>
```

Call `PositionSticky()` with element as argument.

```html
<script>PositionSticky(document.querySelector('.sticky'));</script>
```

If you want to use this as Web Components Extension, set `is="position-sticky"` to `<div>`.

```html
<div is="position-sticky"></div>
```

## License

MIT: http://1000ch.mit-license.org