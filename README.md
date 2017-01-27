# Design Your Own Circos

[Circos Designer][circos] is a web application for users to build their own circos images. The instructions for how to create a circos image can by found by clicking on the book on the left side of the header. 

![header][toggle]

After that the user is able to create circos images with an ideogram as well as heat maps, histograms, and scatter tracks.

![Circos_image][circos_image]


## Technologies

- User Data parsed using [Papaparse][papa]
- Images created using [circosJS] [circosjs]
- Track previous workouts
- Find friends and view their routes/workouts
- Comment on friends routes

![demo map][map]

## Project Design

Ride Tracker was designed and built in two weeks.

A [proposal][proposal] was drafted to help provide an implementation timeline during the development process.

A [database schema][schema] was prepared alongside the design proposal.

## Technology

Ride Tracker is a single-page application built on Rails and React.js, with many dependencies in both the backend and the frontend. Maps utilize the Google Maps Javascript API and images are stored on [Cloudinary][cloudinary]


## Future Implementations

Elevation data can break if there are not enough sampling points to generate average

Use of google charts to create better visuals



[circos]: https://jdgronewold.github.io/Circos_project/
[toggle]: ./docs/toggle.png
[circos_image]: ./docs/circos.png
[papa]: http://papaparse.com/
[circosjs]: https://www.gitbook.com/book/nicgirault/circosjs/details
