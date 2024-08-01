#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

function transformHTML(inputFilePath, outputFilePath) {
    const absoluteInputPath = path.resolve(inputFilePath);
    const absoluteOutputPath = path.resolve(outputFilePath);

    // Read the HTML file as a string
    let html = fs.readFileSync(absoluteInputPath, 'utf8');

    // Initialize pre-html content with `{% load static %}` if necessary
    let preHtmlContent = '';

    // Regex to match the comment-style <cb-templatifier> tags
    html = html.replace(/<!--\s*<cb-templatifier type="loadstatic" \/>\s*-->/g, () => {
        preHtmlContent += '{% load static %}\n';
        return '';
    });

    html = html.replace(/<!--\s*<cb-templatifier type="static-css" route="([^"]+)" \/>\s*-->/g, (match, route) => {
        return `<link href="{% static '${route}' %}" rel="stylesheet">`;
    });

    html = html.replace(/<!--\s*<cb-templatifier type="static-script" route="([^"]+)" \/>\s*-->/g, (match, route) => {
        return `<script defer="defer" src="{% static '${route}' %}"></script>`;
    });

    html = html.replace(/<!--\s*<cb-templatifier type="csrf_token" \/>\s*-->/g, () => {
        return '{% csrf_token %}';
    });

    // Prepend the pre-html content (like `{% load static %}`) to the final HTML
    const outputHtml = preHtmlContent + html;

    // Write the transformed HTML to the output file
    fs.writeFileSync(absoluteOutputPath, outputHtml, 'utf8');
}

// CLI setup
program
    .version('1.0.0')
    .description('Transform HTML templates with cb-templatifier tags')
    .requiredOption('-i, --input <file>', 'Input HTML file')
    .action((options) => {
        transformHTML(options.input, options.output);
    });

program.parse(process.argv);
