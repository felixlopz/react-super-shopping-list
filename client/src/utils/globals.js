import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
    }
    button {
      outline: none;
      cursor: pointer;
    }
    *,
    *::before,
    *::after {
      box-sizing: inherit;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    html {
    	/* 1rem = 10px */
      font-size: 62.5%; 
      box-sizing: border-box;
      --color-primary: ${props => props.theme.colors.primary};
      --color-secondary: ${props => props.theme.colors.secondary};
      --color-accent: ${props => props.theme.colors.accent};
      --color-dark: ${props => props.theme.colors.dark};
      --color-light: ${props => props.theme.colors.light};
      --color-white: ${props => props.theme.colors.white};
      --color-grey: ${props => props.theme.colors.grey};
      --color-black: ${props => props.theme.colors.black};
      --color-black-lg: ${props => props.theme.colors.blackLg};
      --regular: ${props => props.theme.fonts.weight.regular};
      --bold: ${props => props.theme.fonts.weight.bold};
    }

    body {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    
    form,
    input,
    textarea,
    button,
    select,
    a {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

		body{
			/* width */
			::-webkit-scrollbar {
			  width: 10px;
			}

			/* Track */
			::-webkit-scrollbar-track {
			  background: #f1f1f1;
			}

			/* Handle */
			::-webkit-scrollbar-thumb {
			  background: #888;
			}
		}
`;
