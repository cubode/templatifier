# templatifier

A command-line tool for transforming HTML templates with custom `<cb-templatifier>` tags into Django-friendly templates.

## Features

- Replaces custom `<cb-templatifier>` tags with Django template tags.
- Supports static file linking and CSRF token insertion.
- Easy to integrate into build processes or run as a standalone CLI tool.

## Installation

You can install `templatifier` globally using npm:

```bash
npm install -g templatifier
```

Or install it locally in your project:

```bash
npm install --save-dev templatifier
```

## Usage

Command Line
You can use the templatifier command to transform HTML files directly from the command line. It lets you work with the html files normally within your frontend development environment and when you are ready to ship it, the library transforms it to django.

```bash
templatifier -i path/to/input.html -o path/to/output.html
```

## Options
-i, --input <file>: The input HTML file that contains <cb-templatifier> tags.
-o, --output <file>: The output HTML file where the transformed content will be saved.

## Example
Given an input HTML file like this:

```html
<!-- <cb-templatifier type="loadstatic" />-->
<!DOCTYPE html>
<html lang="en">
<head>
    <!--<cb-templatifier type="static-css" route="css/styles.css" />-->
    <!--<cb-templatifier type="static-script" route="js/app.js" />-->
</head>
<body>
    <!--<cb-templatifier type="csrf_token" />-->
    <!-- Page content -->
</body>
</html>
```

Running the following command:

```bash
templatifier -i src/input.html -o dist/output.html
```

Would produce the following output:

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <link href="{% static 'css/styles.css' %}" rel="stylesheet">
    <script defer="defer" src="{% static 'js/app.js' %}"></script>
</head>
<body>
    {% csrf_token %}
    <!-- Page content -->
</body>
</html>
```

## License

This project is licensed under the MIT License.

## Support
For any issues or questions, please open an issue on the GitHub repository.

## About
We are www.cubode.com an startup focussed on No Code, AI and OpenSouce.

Templatifier has been developed with 💙 for the community, check Templatifier-webpack-plugin for a webpack plugin at ([https://www.npmjs.com/package/templatifier](https://github.com/cubode/templatifier-webpack-plugin))
