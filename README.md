# WebsiteJS
A modular project kickstarter


 > This project is under heavy construction and cannot be used yet in any production environment.

 ## Installation
 Make sure you have [NodeJS](http://nodejs.org) version 7 or higher installed and
 install global dependencies:
 ```sh
 $ npm install -g npm node-gyp rimraf jshint sass-lint nodemon gulp-cli jasmine
 ```

 Install project dependencies:
```sh
$ npm install 
```

## Gulp
To view all defined tasks run
```sh
$ gulp --tasks
```
or
```sh
$ gulp --tasks-simple
```
 > NOTE: WebsiteJS uses [Gulp 4](https://github.com/gulpjs/gulp/tree/4.0).

## Building
```sh
$ gulp (specific task)
```
or
```sh
$ npm run build
```

## Production Build
```sh
$ gulp (specific task) --env production
```
or
```sh
$ npm run build-production
```

## Localhost Development Server
The development server is an NodeJS Express server based on BrowserSync and is kept alive by Nodemon.
It uses Handlebars to render templates and updates on the fly. No preprocessing neccessary.
The server watches all project files and will auto-reload when changes are detected.
To start the server use
```sh
$ npm start
``` 
The server auto-detects a free port (from port number 3000 and up) and is run in development (NODE_ENV) mode.

## Jasmine testing
To start unit tests run
```sh
$ npm test
```

## SVG icon system
The svg icon system combine svg files into one 'svg spritesheet' with `<symbol>` elements based on the [CSS Tricks article](http://css-tricks.com/svg-symbol-good-choice-icons/). Nested directories that may have files with the same name, are concatenated by relative path with the name of the file, e.g. `src/assets/icons/svg/social/facebook.svg` becomes `#social-facebook`.

### Using an icon
If you want to use and insert an icon, use the id "#<foldername>-<svgname>" inside a ```<use>```-tag. SVG Icons should always have an ```<svg>```-tag with the minimum base class "icon".
```sh
<svg class="icon">
    <use xlink:href="#foldername-svgname"></use>
</svg>
```

### Adding an icon
Normally the icons will be created in Illustrator and the default export from illustrator should be fine. The sources files will be minified/cleaned up when building, so comments etc will not be an issue.

If you decide to make your own, create an svg-file inside the svg-icons folder. In there the minimum code should be as follows.
```sh
<svg viewBox="0 0 48 48">
    <path d=""></path>
</svg>
```
 > Make sure to not add a ```<symbol>``` tag around the path or the svg, then your icon won't work.

#### Titles and groups
Ideally you'll want to add a ```<title>``` to your icon, screenreaders will read the defined title.
Optionally you can add a ```<g>``` (group) to isolate multiple paths or fills as a grouped icon.
```sh
<svg viewBox="0 0 48 48">
    <g>
        <title>Download</title>
        <path d=""></path>
    </g>
</svg>
```
