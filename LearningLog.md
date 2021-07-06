<br>

# Modern Landing Page

## HTML | SCSS | JS

### [FreeCodeCamp.com](https://www.youtube.com/watch?v=aoQ6S1a32j8 'youtube link')

#### By, Jessica Chan a.k.a. [The CoderCoder](https://www.youtube.com/thecodercoder 'Youtube Channel')

---

## Build Project Folder

Starting with a design, specifications, and images from [_Frontend Mentors "Easybank Landing Page" Challenge_](https://www.frontendmentor.io/challenges/easybank-landing-page-WaUhkoDN 'Frontend Mentors - Landing Page Challenge') We build the folder structure for our project. I dragged in the images folder, added a `.gitignore`, created a _src_ folder with _js_, and _scss_ folders, and built the index.html boilerplate. We added some global styling and resets in `_global.scss` and compiled it into our `style.scss`. We have a few style guidelines to add as well.

## Mobile-First Design

We look at our design files and examine how to start building our layout.

<br>

> _**Quick Tip**_ - use a helper class to easily copy styles so you don't have to re-type them each time.
> e.g.: instead of manually making each section a `Flex Parent`, add a helper class: `.flex` to copy the styles to each one.
>
> - use &_ClassName_ to add sub-classes

```css
.flex {
  display: flex;

  &-jc-sb {
    justify-content: space-between;
  }

  &-jc-c {
    justify-content: center;
  }

  &-ai-c {
    align-content: center;
  }
}
```

<br>

### Use B.E.M.

<br>

> **Block, Element, Modifier**

<br>

e.g.

```css
.header > .header__logo > .header__menu;
```

<br>

- _real quick_ - add some `_variables.scss` and don't for get to `@import "variables";` to our `styles.scss` to get compiled.

```css
$darkBlue: hsl(233, 26%, 24%);
$limeGreen: hsl(136, 65%, 51%);
$brightCyan: hsl(192, 70%, 51%);
```

<br>

> _**Quick Tip**_ - Select every element, but the last one:
> `&:not(:last-child){...}`

<br>

> _**Quick Tip**_ - **Compartmentalize Your CSS**. Add a `_header.scss` to hold your header styles and @include it to your `syles.scss`.

<br>

### Check differences between Mobile & Desktop

---

<br>

- Mobile has the hamburger.

- Desktop has the C.T.A. and menu links.

We can still add those elements to our mobile first design and display them when user is viewing on desktop.

<br>

> _**Quick Tip**_ - To convert `font-size` to a relative unit like `REM`, Divide by **`16`**.

<br>

- _real quick_ - check the `Computed` tab in the Chrome Dev Tools to see active styles on an element and their "computed" values, i.e. 1.125rem = 18px.

- Add Header CTA `<button>` (dekstop only)

<br>

> - "**`<button>`** elements are much easier to style than `<input>` elements. You can add inner HTML content (think `<i>`, `<br>`, or even `<img>`), and use ::after and ::before pseudo-elements for complex rendering."
>
>   "To give an icon button an accessible name, put text in the `<button>` element that concisely describes the button's functionality.
>   If you want to visually hide the button's text, an accessible way to do so is to use a combination of CSS properties to remove it visually from the screen, but keep it parsable by assistive technology."

<br>

### Hide or show Elements on Screen Size

---

<br>

Make some global "visibility" classes to hide elements based on screen size, using `Media Queries` and `Mixins`.

- **note** - Use `EM` for Media Query compatibility.

We don't want to keep typing these values each time: `min-width: --> 64em`. We can use a **`SASS MAP`** to easily call back the correct values each time in our mixin.

<br>

\_mixins.scss

```css
/* Scss Map */

/* target styles "on this screen size and larger" e.g. "min-width" */
/* 640, 1024, 1400px */
$breakpoints-up: (
  'medium': '40em',
  'large': '64em',
  'xlarge': '87.5em'
);
```

<br>

She doesn't want the screen-size values to overlap, so we adjust the 'down' values.

> `639px / 16 = 39.9735em`

```css
/*  target styles "on this screen size and smaller" e.g. "max-width" */
/* 639, 1023, 1399px */
$breakpoints-down: (
  'small': '39.9735em',
  'medium': '63.9735em',
  'large': '87.4375em'
);
```

<br>

### Construct the Mixin.

---

<br>

- Declare the Mixin, which will get a _breakpoint_ from our _breakpoints_ Map for screen-sizes above a minimum width.

- Declare a variable to refer to the different `$size` values in our `Map`.

- Write the css we want to **Mixin**.

- Use `map.get($map, $key){...}

```css
/* singular tense */
@mixin breakpoint-up($size) {
  /* the actual map and the specific size */
  @media (min-width: map.get($breakpoints-up, $size)) {
    @content;
  }
}
```

<br>

- `@content` - allows us to wrap our mixin around some css we write.

- Use `@include` to add your _Mixin_.
  \_global.scss

```css
.hide-for-mobile {
  @include breakpoint-down(medium) {
    display: none;
  }
}

.hide-for-desktop {
  @include breakpoint-up(medium) {
    display: none;
  }
}
```

<br>

# Don't Forget To Add The Mixin!

`styles.scss`

```css
@import 'mixins';
```

# AUGH!! It's Not Working!

- I triple checked spelling, found one error, "map.get" instead of "map-get", but still didn't work

- I enabled css maps in my live-sass plugin settings, but still didn't work.

<br>

### Kevin Powell says to STOP using @import!

---

<br>

With the deprecation of `Ruby Sass` and the start of the new `Dart Sass`,

- `@import` has now been deprecated

- `@use`, and `@forward` is the new syntax.

@import made problems by making imports available globally, causing naming conflicts, and inefficient loading.

With the new module system, when we `@use` something, it is only available in the file you `@use` it in. It is `namespaced`, so you need to reference the file being imported:

`style.scss`

```css
@use 'abstracts/fonts';

body {
  font-size: fonts.$font-size;
}
```

However, this abstract does not apply `globally`. When we reference a variable like $font-size, without @use-ing "fonts"...

\_cards.scss

```css
.card {
  font-size: fonts.$font-size;
}
```

...then try to import \_cards.scss into our main `style.scss`, it won't work.

style.scss

```css
@use 'abstracts/fonts';

@use 'components/cards';

body {
  font-size: fonts.$font-size;
}
```

**Because** it is no longer `Globally` available.

- You don't need to bring in abstracts to your main scss file, if it is not being used there, just @use it in the files it is explicitly being used in.

writing `fonts.$font-size` can get repetitive.

- do `@use 'variables' as *` - this takes the _namespace_ away and you can just write `$font-size`.

- `@use` - bring something into the file to use it within.

- `@forward` - bring something into the file to **forward** it somewhere else.

You can make a `_index.scss` of @use imports in a subfolder for SASS to compile all the imports and forward it to use in all the components within that subfolder.

For example, we have all our variables, and mixins, etc. in a abstacts folder. we could create a `_index.scss` file in that folder, import those abstracts to the file with `@forward`, and now, instead of importing each abstract into our components, all we need to do now is just import the `_index.scss` file into our component like this: `@use '../abstracts' as *`

collect the different abstract files into the:
`/abstracts/_index.scss`

```css
@forward '../variables';
@forward '../mixins';
```

**Now**, in our main `/components/_cards.scss`, we can use it like:

```css
@use '../abstracts' as *;
```

---

I was able to fix the @import issue by changing them to @use and importing them to the appropriate files and with the appropriate namespaces `as *`

`_header.scss`

```css
@use '../variables' as *;
```

`_globals.scss`

```css
@use 'mixins' as *;
@use 'variables' as *;
```

add `@use 'mixins';` to the top "before any other _rules_"

`style.scss`

```css
@use 'globals';
@use 'components/header';
```

---

<br>

## Adding Hover Styles to Menu Links

<br>

For the links, use a dark gray color on hover. Use Pseudo-Elements to add the green underline on hover.

<br>

> **`::before`** - "creates a pseudo-element that is the first child of the selected element. It is often used to add cosmetic content to an element with the content property. It is inline by default." - MDN.

\* = necessary

`_header.scss`

```css
&::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 5px;
  left: 0;
  right: 0;
  bottom: -30px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}
```
