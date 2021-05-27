<h1 align="center">FlameFinder</h1>
<p align="center">
  <a href="https://flamefinder.xyz" target="_blank">
    <img src="https://i.imgur.com/7QvYWYr.png" width="700px">
    <br>
    Live Site
  </a>
</p>

FlameFinder is a web application for browsing grade distribution data for the University of Illinois at Chicago. FlameFinder enables students to make informed decisions about their schedules by providing an easy to use interface and intuitive visualizations.

FlameFinder is not associated with UIC or the University of Illinois system.

## Overview

- Built with React + TailwindCSS + Vite
- Data visualized with Google Charts
- Responsive, mobile friendly design
- SPA routing via react-router

The back-end code is also open source and available [here](https://github.com/JRapt0r/flamefinder-server/).

## Requirements

[Node.js](https://nodejs.org/en/ "Node.js") 12+

[npm](https://nodejs.org/en/ "npm") (bundled with Node.js)

## Contributing

First, clone this repository and then use the following commands:

``` bash
# Navigate to the root directory
cd flamefinder

# Create .env file for server endpoint
echo "VITE_SERVER_ENDPOINT = 'http://localhost:5001'" >> .env

# install dependencies
npm install # or yarn

# start development server
npm run dev

# build for production
npm run build
```

Then, clone the [server](https://github.com/JRapt0r/flamefinder-server) repository and follow the instructions given there.

Known issues
-------------

Presently, courses that use [non-standard](https://registrar.uic.edu/student-records/grading-system/ "non-standard") grading policies are not handled correctly. Due to limitations with the grade data, there is no way to determine whether a course uses non-standard polices without additional work/manual review.


## License

GPLv3
