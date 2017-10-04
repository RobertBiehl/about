/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const Path = require('path');
var fs = require('fs');

const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const fm = require('front-matter');

module.exports = function({ types: t }) {
  return {
    visitor: {
      // import styles from './index.md';
      ImportDeclaration: {
        exit(path, state) {
          const { node } = path;

          const moduleName = node.source.value;
          console.log('moduleName: ' + moduleName);
          if (moduleName.match(/\.md?$/)) {
            const leftExpression = determineLeftExpression(t, node);

            const fileLocation = state.file.opts.filename;
            let filepath = null;

            if (fileLocation === 'unknown') {
              filepath = moduleName;
            } else {
              filepath = Path.join(
                Path.resolve(fileLocation),
                '..',
                moduleName,
              );
            }

            const md = new MarkdownIt({
              html: true,
              linkify: true,
              highlight: (str, lang) => {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return hljs.highlight(lang, str).value;
                  } catch (err) {
                    console.error(err.stack);
                  } // eslint-disable-line no-console
                }

                try {
                  return hljs.highlightAuto(str).value;
                } catch (err) {
                  console.error(err.stack);
                } // eslint-disable-line no-console

                return '';
              },
            });

            var data = fs.readFileSync(filepath, 'utf8');
            const frontmatter = fm(data);
            frontmatter.attributes.html = md.render(frontmatter.body);

            path.replaceWith(
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  leftExpression,
                  t.valueToNode(frontmatter.attributes),
                ),
              ]),
            );
          }
        },
      },
    },
  };
};

function determineLeftExpression(types, node) {
  if (isDestructuredImportExpression(node)) {
    return buildObjectPatternFromDestructuredImport(types, node);
  }

  const variableName = node.specifiers[0].local.name;

  return types.identifier(variableName);
}

function isDestructuredImportExpression(node) {
  return (
    node.specifiers.length !== 1 ||
    node.specifiers[0].type !== 'ImportDefaultSpecifier'
  );
}

function buildObjectPatternFromDestructuredImport(types, node) {
  const properties = node.specifiers.map(specifier => {
    const key = types.identifier(specifier.imported.name);
    const value = types.identifier(specifier.local.name);

    return types.objectProperty(key, value);
  });

  return types.objectPattern(properties);
}
