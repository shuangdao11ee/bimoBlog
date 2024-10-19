const core = require('@babel/core');
const sourceCode = `
var a = 'xiaoming';
console.log(a);
var b = 'xiaohong';
`;

const eslintPlugin = ({ fix }) => {
  return {
    pre(file) {
      file.set('errors', []);
    },
    visitor: {
      CallExpression(path, state) {
        const errors = state.file.get('errors');
        const { node } = path;
        if (node.callee.object && node.callee.object.name === 'console') {
          Error.stackTraceLimit = 0;
          errors.push(path.buildCodeFrameError('代码中不能有console', Error));
        }
        if (fix) {
          path.parentPath.remove();
        }
      }
    },
    post(file) {
      console.log(...file.get('errors'));
    }
  };
};

const { code } = core.transformSync(sourceCode, {
  plugins: [eslintPlugin({ fix: true })]
});

console.log(code);
