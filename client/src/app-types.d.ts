import { PaletteColorOptions } from '@mui/material/styles';

declare module '@app-types' {
  import { IImageButtonData } from '@app-interfaces';
  type IThunkAPIStatus = 'idle' | 'loading' | 'completed' | 'failed';
  type CallableFunction = () => void;
  type CustomHookMessage = { message: string | undefined };
  type AnyObjectType = { [t: string]: any };

}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '@mui/material/styles' {
  interface Palette {
    darkMode: PaletteColor;
  }

  interface PaletteOptions {
    darkMode: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    darkMode: true;
  }
}

