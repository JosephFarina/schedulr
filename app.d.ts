declare module 'redux-thunk' {
  import { Middleware } from 'redux';
  const thunkMiddleware: Middleware;
  export default thunkMiddleware;
}

declare interface ReactStateless<T> extends React.Component<T, {}> {
  (props: T): JSX.Element;
}

declare var Shift: {
  start: string;
  end: string;
}

declare module 'classnames/bind' {
  function bind(styles: any): any
}