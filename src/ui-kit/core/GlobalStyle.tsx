import { createGlobalStyle } from 'styled-components';
import { Device } from '../../settings/Device';
import { FontFamily, FontSize, FontWeight } from '../../settings/Font';
import { ThemeColor } from '../../settings/ThemeColor';

// Global styles and resets
export const GlobalStyle = createGlobalStyle`
    @import url(${FontFamily.path});

    html {
        box-sizing: border-box;
        font-size: ${FontSize.base};

        @media (max-width: ${Device.mobileLarge - 1}px) {
            font-size: 13px;
        }

        @media (max-width: ${Device.mobileLarge}px) and (max-width: ${Device.tablet - 1}px) {
            font-size: 14px;
        }
        @media (max-width: ${Device.tablet}px) and (max-width: ${Device.laptop - 1}px) {
            font-size: 15px;
        }
    }

    body::-webkit-scrollbar {
        // width: 1em;
      }
       
      body::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
       
      body::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
      }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }


    body {
        font-family: ${FontFamily.name}, sans-serif;
        font-weight: ${FontWeight.regular};
        font-size: ${FontSize.md};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 0;
        margin: 0;
        color: ${ThemeColor.white};
    }

    *{
        list-style: none;
    }

    table td,
    table th {
        padding: 0;
    }

`;
