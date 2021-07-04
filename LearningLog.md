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

> tip: use a helper class to easily copy styles so you don't have to re-type them each time.
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

e.g.

```css
.header > .header__logo > .header__menu;
```

<br>

- _**real quick**_ - add some `_variables.scss` and don't for get to `@import "variables";`

```css
$darkBlue: hsl(233, 26%, 24%);
$limeGreen: hsl(136, 65%, 51%);
$brightCyan: hsl(192, 70%, 51%);
```

> _**Quick Tip**_ - Select every element, but the last one:
> `&:not(:last-child){...}`

<br>

### Compartmentalize Your CSS

Add a `_header.scss` to hold your header styles and @include it to your `syles.scss`.

### Check differences between Mobile & Desktop

- Mobile has the hamburger.

- Desktop has the C.T.A. and menu links.

We can still add those elements to our mobile first design and display them when user is viewing on desktop.

> _**Quick Tip**_ - To convert `font-size` to a relative unit like `REM`, Divide by **`16`**.
