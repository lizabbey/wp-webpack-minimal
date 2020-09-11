# webpack-starter
## Intro
This is the minimal setup to build a theme with Wordpress and Webpack. There are no WP theme files, you will need to provide those yourself.

## Getting Started
### Take a look at package.json 
One of the dependencies is "bootstrap." Do you need that? If not, delete that line. I use it often so it's included but do what's best for your project. Want to use something else? That's cool too. Install it once we're done with everything else.

### Install Node Modules 
```
$ yarn install 
```
 * If you prefer to run npm instead of yarn, that's fine. Just be consistent.

### Starting with HTML
Start the webpack-dev-server.
```
$ yarn dev 
```
A new browser window will open. This will refresh as you make changes.
Open `index.html` and start coding.
#### Notes
There are a couple of things to know when working with webpack html.
* There is no need to call the css or js into the file. Webpack inserts it for you.
* jQuery is called in the footer from a cdn.
* Any distinct image you need to include in your final theme package (excluding sprite files) will need to be imported with theme.js in order for it to be processed and output into the dist folder. 

### Starting with Wordpress
When you're ready to jump into a wordpress theme.
#### Local by Flywheel
1. If you don't already have it, download and install [Local by Flywheel](https://localbyflywheel.com/) (free version)
2. Click the + to add a new site.
3. Enter a name for your site and click "Advanced Options"
4. Set the "Local site path" to your Project folder.
5. Choose the server options you would like to use.
6. Set Username/Password/Email Address
7. Click Add Site - This is going to create a wordpress installation on your local machine. 
8. Navigate to your site folder then `/app/public/wp-content/themes` and copy your starter theme there. 
9. In the Local app, Click "Start Site" to launch the server. Click "View Admin" to activate your theme, install plugins or create content.

**If you notice Browsersync refreshing slowly, go to Local » Preferences » Advanced and enable the IPv6 Loopback option**

#### Build the Theme
1. In your text editor, navigate to and open the theme folder of your new site.
`your-site/app/public/wp-content/themes`
2. Open `webpack-local.js` and look for line 13 (BrowserSyncPlugin proxy). This needs to be changed to the 'Site Domain' of your new site. Find this is the Local App.
3. Run the local command
```
$ yarn local 
```
A new browser window will open and a watch will start. You're good to go!

#### Notes
Take a look at what the Local app has to offer, it's pretty cool. 
* The database can be found under the "Database" tab of your site
* https can be enabled under the SSL tab
* Right clicking on the name of the site in the sidebar gives several options
    * Choose Open Site SSH if you want to use WP-CLI

***

# Reference

## The Scripts
#### Dev
```
$ yarn dev 
```
* Uses index.html and webpack-dev-server.
* Watches for changes and refreshes the browser as needed.

#### Local
```
$ yarn local 
```
* Requires [Local by Flywheel](https://localbyflywheel.com/)
* Runs Wordpress theme - index.html is ignored.
* Watches for changes and refreshes the browser as needed.
* Line 13 in `webpack-local.js` must be edited to match site url in Local app.

#### Build
```
$ yarn build 
```
* Creates production-ready files for deployment.
* No Watch. No refresh. 
* Old Dist folder is removed and all assets are regenerated. 

#### Watch
```
$ yarn watch 
```
* Creates production-ready files for deployment.
* Watches for changes and remakes files as needed. No server/browser is used. 
* Meant for quick editing of files after the site is complete. 

## File Structure
### config folder
This is where all the webpack config and linter files are. 
 - webpack-common.js: Settings are shared in all configs.
 - webpack-common-p.js: Settings shared in production configs.
 - webpack-dev.js: Settings for html development only. Uses webpack dev server.
 - webpack-local.js: Settings for local wordpress development.
 - webpack-prod.js: Settings for the build.

### inc folder
Wordpress files imported into functions.php

### src folder
This is where the bulk of your work will take place.
#### img folder
##### img/icons
Used to create svg sprites. Place icon svg files here and call with the ```<svg><use>``` syntax.
```
<svg>
	<use xlink:href="./image/spritemap.svg#icon-facebook.svg"></use>
</svg>
```
##### img/replace
A folder for all images needed in development but that will ultimately be uploaded to and served from wordpress. Created to separate out images that are necessary for the theme and images that are only needed for development. Can be deleted after the build.
* Webpack will still compress these images for production. Uploading to Wordpress from this folder saves you a compression step later. 

#### js folder
Your javascripts go here. 

##### Entrypoints
Webpack (primarily) uses javascript files as "entrypoints." Every distinct file that is needed in production must be listed as an entrypoint. 

See line 9 of ```common.js```:
```
entry: {
		//Add entry points here as you need them
		theme: './src/theme.js',
		// frontpage: './src/front-page.js',
		// critical_fp: './src/scss/critical-fp.scss', //CSS ONLY OUTPUT
	},
```
`theme.js` is my first entrypoint. 
* You can add as many entrypoints as you need for your project. 
* frontpage and critical are some examples of common needs.
* Entrypoints do not need to be javascript (like theme and frontpage). They can also be just scss (like critical). 

Open `theme.js` and take a look:

* Here I import my main scss file, as well as any bootstrap javascript that I need for the whole theme. 
* Not using Dropdowns, Collapse, or Modals on every page? Delete those lines! 
* Need to add popovers or toasts? Import those instead. 

There are other file in the js folder. Take a look and decide if you need them.

#### scss folder
Your scss goes here. 
Again, files are broken up into necessary chunks. 
`theme.scss` is where all of the site-wide necessary bootstrap scss is included. 
* All available files are here and can be commented or uncommented as needed. You're welcome.
* You can import google fonts here as well.
* Just rememeber this is for styles needed on every page of the whole theme. Keep overhead low by only loading what you need. 

##### _custom.scss 
`scss/partials/_custom.scss`
This is one of the most important files in your package. Here is where you override all other scss variable to "roll your own" imports. 
* Many of the node_modules you include for production will have options that can be changed. 
* Anything with the !default flag can be overridden in custom.scss
* Ex: Bootstrap has over a thousand options (node_modules/bootstrap/scss/_variables.scss). Slick Carousel has some too (node_modules/slick-carousel/slick/slick-theme.scss). 
* Open up your node_modules folder and explore. Figure out what is being imported and how you can take control of those packages. 

##### scss/partials
In an effort to create the least amount of overhead, scss has been broken up into the small modular chunks. Thinking this way allows us to only import what we need, when we need it. Again, there may be more/different files than your project requires, so delete what you don't want and add what you do. 

#### Config Notes
I'm using a package called sass-resources-loader that is great for including files that you need over and over. I'm using bootstrap, so I include the necessary scss on every css file output. The settings for this are in all 3 output configs (dev, local, prod) as an scss loader. You can leave, change, or delete this as you need. It is optional, I just got sick of bootstrap telling me it was missing a variable and this was my solution. It could probably done cleaner, I haven't spent the time to do that yet. 

