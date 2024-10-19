declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.txt' {
  const value: string;
  export default value;
}
