# 📊📈📉  Templatifier
## Package to transform normal HTML files into Django HTML Templates.
---

![License](https://img.shields.io/badge/license-MIT-green)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/company/cubode/)
[![Watch on GitHub](https://img.shields.io/github/watchers/cubode/templatifier.svg?style=social)](https://github.com/cubode/templatifier/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/cubode/templatifier.svg?style=social)](https://github.com/cubode/templatifier/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/cubode/templatifier.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20templatifier%20package%21%20https%3A%2F%2Fgithub.com%2Fcubode%2Ftemplatifier)

This packages allows to work with a normal frontend environment and django templates. It is added as an step to the html bundling in webpack and allows to transform html into prepared html templates for django.

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
