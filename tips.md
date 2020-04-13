
## Formatting code blocks in markdown

In order to have the code be readable in articles, the code should be ran through the [following prettier playground config](https://prettier.io/playground/#N4Igxg9gdgLgprEAuEIA0IIAcYEtoDOyoAhgE5kQDuACuQkSiQG4S4Am6IARmSWAGs4MAMpZ+uKAHNkMMgFc4GABYwAtgBsA6stzwC4sHBEM9uZnoCeycASIZJBOGRg0+UtSWQAzEhqcYAFYEAB4AQnyCwiIkanAAMpJwPn4BIMEhIpJSGnAAivIQ8Cn+SiDiZE5kNjCWWHAEYGS4OFxYzbBaHDDKyAAcAAwY7RBOWnxYNu0NzszJGACOhfBu2IwgJAQAtFBwcOz7XGRwS7jHbiQeXki+pRhOariyCmUE2bkFRck3qWUwJNwuuwesgAEwYOQkXAabIAYQgak8Nig0HmIHkTgAKgDGLcnABffFAA). This will indent the code with 2 spaces and have a print width of 80 characters. Also a comment of \<!-- prettier-ignore --> will need to be added at the start of the code block to prevent automatic formatting of the code block.

## Videos

When taking video screen recordings on MacOS, the generated .mov file should be converted to both a `.mp4` and `.webm` formatted file. The `.webm` video will be served to browsers that support it and the `.mp4` file will be used as a default.

ffmepg is used to convert the video file formats from the command line. Here are the commands to run:

**WebM format**

```bash
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 40 -b:v 0 output.webm
```

**MP4 format**

```bash
ffmpeg -i input.mov -b:v 0 -crf 25 -profile:v main -level 4.0 output.mp4
```

As a reference, I had to run the following command to get Safari compatibility when converting a GIF as well as to get rid of a "divisible by 2 error":

```bash
ffmpeg -i mclovin.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -pix_fmt yuv420p -profile:v main -level 4.0 -b:v 0 -crf 25 mclovin.mp4
```

The `-vf` option was for the divisible by 2 error and the `-pix_fmt yuv420p -profile:v main -level 4.0` was all for safari compatibility.

Documentation on ffmpeg can be [found here](https://ffmpeg.org/ffmpeg.html).

## Netlify Dev

To test how the website will function when deployed on Netlify, run the `netlify dev --live` command. This is useful for debugging behaviour on mobile.
