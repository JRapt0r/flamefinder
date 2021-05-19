<h1 align="center">FlameFinder</h1>
<p align="center">
  <a href="https://flamefinder.xyz" target="_blank">
    <img src="https://i.imgur.com/7QvYWYr.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

FlameFinder is a web application for browsing grade distribution data for the University of Illinois at Chicago. FlameFinder enables students to make informed decisions about their schedules by providing an easy to use interface and intuitive visualizations.

FlameFinder is not associated with UIC or the University of Illinois system.

## Overview

- Built with React + TailwindCSS + Vite
- Responsive, mobile friendly design
- SPA routing via react-router

## Requirements

[Node.js](https://nodejs.org/en/ "Node.js") 12+

[npm](https://nodejs.org/en/ "npm") (bundled with Node.js)

## Contributing

``` bash
# install dependencies
npm install # or yarn

# start development server
npm run dev

# build for production
npm run build

# Create .env file for server endpoint
echo "VITE_SERVER_ENDPOINT = 'http://localhost:5001'" >> .env
```

Known issues
-------------

Presently, courses that use [non-standard](https://registrar.uic.edu/student-records/grading-system/ "non-standard") grading policies are not handled correctly. Due to limitations with the grade data, there is no way to determine whether a course uses non-standard polices without additional work/manual review.


## License

GPLv3
