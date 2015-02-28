# position-sticky

Emulation of `position: sticky` using JavaScript.

## Usage

Load `position-sticky.min.js` and call `PositionSticky()`.

```html
<script src="dist/position-sticky.js"></script>
<script>PositionSticky(document.querySelector('.sticky'));</script>
```

Top attribute for `.sticky` should be set.

```css
#sticky {
  top: 10px;
}
```

## License

MIT: http://1000ch.mit-license.org/

Project structure is borrowed from [ahomu/es6-kameita](http://github.com/ahomu/es6-kameita).
