BarCrl
======

A public website for creating Optimized Pub Crawls.

[BarCrl.com](http://barcrl.com)

## Dependencies

- Ruby
- Compass

## Installation

Install node packages with npm installer

```
npm install
```
Install compass for SASS

```
gem update --system
gem install compass
```

Use grunt to serve the application

```
grunt serve
```

## Deployment

All development is done in the development branch, which can be deployed to staging and accessed on [Github Pages](http://barcrl.kindasimplesolutions.com). 

* Minor revisions will be visible here (e.g. 0.9.2 => 0.9.3 Beta). 
* Builds from each commit push in a future CI system will be here as well (0.9.5 Build 104 => 0.9.5 Build 105)

Public releases are available at the custom domain [barcrl.com](http://barcrl.com)

* Major/Minor point-releases to the public (e.g. 0.8.1 Alpha => 0.9.0 Beta) 
* We merge the developoment changes into the master branch at each release

#### staging

**service**: Github Pages  
**url**:  [barcrl.kindasimplesolutions.com](http://barcrl.kindasimplesolutions.com/)

*note*: The subdomain address is necessary. Though the site can be reached via the subfolder (http://kindasimple.github.io/barcrl), our site does not support this scenario with angular routing.


**description**: The application is staged on a Github Project page. A deployment can be accomplished easily on the CLI 

```
## build with grunt to /dest folder
grunt build

## restore CNAME file
git checkout dest/CNAME

## deploy to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

#### production

**service**: Amazon  
**url**  

* Custom Domain: [barcrl.com](http://barcrl.com)  
* Amazon Subdomain: [barcrl.com.s3-website-us-east-1.amazonaws.com](http://barcrl.com.s3-website-us-east-1.amazonaws.com/index.html)
