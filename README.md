# gapstar-assignment
This is a demo application for getting two images from service in catass.com and merging these two with user-given text or with default 

## Installation
Download the project files or clone them from GitHub into your local environment. Open a new command prompt in windows or terminal in UNIX base system and move inside to project folder
you need to install node and a valid package manager like npm or yarn etc to install node packages.
run
```
npm install
```
this will install all necessary packages and wait until it is a success.

## How to run
This application will call the https://cataas.com/ public rest endpoint and will return an image with user-given data. So run with default values you have to run 
```
node index.js 
```
in your root folder

this will generate a new image in the build folder inside the root 

available arguments are 
```
greeting, who, width, height, color, size
```

default values for the service call 
```
greeting = 'Hello', 
who = 'You',
width = 400,
height = 500,
color = 'Pink',
size = 100
```

if you need to change these values you have to pass one or more as argument 

example:
```
node index.js --greeting <user-values> --who <user-value> --color <user-value> ...
```
replace ```<user-value>``` with your values
