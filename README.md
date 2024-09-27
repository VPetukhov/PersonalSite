To build it run:

```
npm install -g gulp-cli
npm install -g @11ty/eleventy
npm install
```

And then

```
gulp build
npx @11ty/eleventy --serve
```

To update the docs:

```bash
rm -rf docs
mv build docs
```

**Files app.js, app.css and CNAME must not be removed**