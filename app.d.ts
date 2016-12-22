declare var require: {
   <T>(path: string): T;
   (paths: string[], callback: (...modules: any[]) => void): void;
   ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}; 

declare module 'redux-thunk' {
    import { Middleware } from 'redux';
    const thunkMiddleware : Middleware;
    export default thunkMiddleware;
}

declare interface ReactStateless<T> extends React.Component<T, {}> {
  (props: T): JSX.Element;
}
