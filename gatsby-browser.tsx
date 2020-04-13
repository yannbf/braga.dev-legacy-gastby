import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { ContextThemeProvider, useTheme } from './src/utils/context';
/**
 * Show outline only on keyboard interaction
 *
 * Adds 'js-focus-visible' class to body and 'focus-visible' class to focused element
 *
 * https://github.com/WICG/focus-visible
 * https://davidwalsh.name/css-focus
 */
import 'focus-visible';

const Wrapper: React.FC = ({ children }) => {
    const { theme } = useTheme();

    return <ThemeProvider theme={{ color: theme }}>{children}</ThemeProvider>;
};

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
    return (
        <ContextThemeProvider>
            <Wrapper>{element}</Wrapper>
        </ContextThemeProvider>
    );
};
