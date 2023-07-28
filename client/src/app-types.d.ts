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