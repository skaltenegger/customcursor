# Gulp 4 + Webpack 4 + Babel + BrowserSync + Font Awesome 5

All the tasks are done via Gulp. Webpack is just used for ES6 Import/Export as Gulp can't do it to my best of knowledge. Apart from ES6 Import/Export, Gulp was able to do all my other work that I wanted so I have mainly used Gulp. That being said, you can modify the webpack config to your preferences from `webpack` folder and use webpack specific plugins as you need.

For Live reloading, Browsersync has been used. For ES6 Transpilation, Babel has been used. For SourceMaps, Gulp & Webpack both have been used. For Icon Fonts, Font Awesome 5 has been used with Sass/CSS Workflow.

## Setup

- Install [Node](https://nodejs.org/)
- Optionally, also install [Yarn](https://yarnpkg.com/) or use *Npm* that comes with Node pre-installed
- Install Gulp globally through `npm install -g gulp@next`
- Install Webpack globally through `npm install -g webpack`
- Fork this project
- Clone the forked project (Yours!)
- `cd` to the cloned project
- Install all [packages](./package.json) with `npm install` or `yarn install`

## Usage

- **Build the Project and Serve locally (for Production)** - `npm start` or `yarn start`. The Production port is `8000`.
- **Build the Project and Serve locally (for Development)** - `npm run dev` or `yarn run dev`. The Development port is `3000`.
- **Exporting the Project to zip file** - `npm run export` or `yarn run export`

Important Note: **Don't** run these npm scripts simultaneously.

## Appendix

- **Tooling** - Gulpfile Lives in `gulpfile.js` and Webpack config files live within `webpack` folder.
- **Source Files** - Lives in `public/src` folder
- **Compiled Files** - Lives in `public/dist` folder. When you clone, you won't get them but as soon as you run those any of above usage tasks (start/build/export), the `public/dist` will be created.
- **Exported Project** - The exported project is imported from `public` folder and gets exported as `website.zip` to project root

## Performance (Lighthouse)

This is the result of performance tests (97%) within [Lighthouse](https://developers.google.com/web/tools/lighthouse/) for Production Mode. It's Not excellent (yet!), but still quite good actually.
![97% Performance][perf]

For Development mode it's [96% respectively](https://i.imgur.com/07TVen7.png).

[perf]: https://i.imgur.com/1KBt91t.png
