# Design Your Own Circos

[Circos Designer][circos] is a web application for users to build their own circos images. The instructions for how to create a circos image can by found by clicking on the book on the left side of the header. 

![header][toggle]

After that the user is able to create circos images with an ideogram as well as heat maps, histograms, and scatter tracks.

![Circos_image][circos_image]

The user is able to specify the configuration of how they want their layout and tracks to look by editing forms that allow the user to change the color of the tracks, presence of ticks/labels, and various other features.

![Forms][forms]

## Technologies

- User Data parsed using [Papaparse][papa]
- Images created using [circosJS] [circosjs]



[circos]: https://jdgronewold.github.io/Circos_project/
[toggle]: ./docs/toggle.png
[circos_image]: ./docs/circos.png
[Forms][forms]: ./docs/form.png
[papa]: http://papaparse.com/
[circosjs]: https://www.gitbook.com/book/nicgirault/circosjs/details
