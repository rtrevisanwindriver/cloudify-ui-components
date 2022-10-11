import React from 'react';

import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import idea from 'react-syntax-highlighter/dist/esm/styles/hljs/idea';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import { merge } from 'lodash';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('yaml', yaml);

export interface HighlightTextProps extends Omit<SyntaxHighlighterProps, 'language'> {
    /**
     * Language name to be used as a base for syntax highlighter
     */
    language: 'bash' | 'javascript' | 'json' | 'python' | 'yaml';
}

/**
 * HighlightText component displays code with language-specific keyword highlighting.
 *
 * HighlightText is based on [highlightJS](https://highlightjs.org/) and supports the following languages/notations:
 *
 * * Bash
 * * JavaScript
 * * JSON
 * * Python
 * * YAML
 *
 * All props supported by [react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter#props) can be specified.
 */
const HighlightText = ({
    children = '',
    codeTagProps,
    language = 'json',
    style = idea,
    ...otherProps
}: HighlightTextProps) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={style}
            codeTagProps={merge({ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }, codeTagProps)}
            {...otherProps}
        >
            {children}
        </SyntaxHighlighter>
    );
};

export default HighlightText;
