# README #

This is the starter project for angular-material.

## Running this project ##

### Initial setup ###
Make sure you have NPM installed by running ```npm -v``` If it is not installed, go to [the NPM site](https://nodejs.org/en/) and click the download link. 

After this, install bower and gulp globally using the following: (Note: you must not be in your project folder for this step.)
```
#!cmd
npm install -g bower

npm install -g gulp

npm install phantomjs
```

Next navigate to your project directory using ```cd <project-directory>``` and do:
```
#!cmd
npm install

bower install
```

### Serving for development purposes ###

```
#!cmd
cd <project-directory>

gulp serve

```

### Building for distribution ###

```
#!cmd
cd <project-directory>

gulp build
```

Gulp will build into <project-directory/dist>.