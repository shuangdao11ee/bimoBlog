// 该规则主要检查全局是否同时存在 同步import 和 异步import的情况
const path = require('path');
const fs = require('fs');

const suffixSet = ['', '.js', '.ts', '.tsx'];

function findModulePath(moduleName, startDir) {
  const nodeModulesDirs = [];
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    const targetPath = path.join(currentDir, 'node_modules');
    if (fs.existsSync(targetPath)) {
      nodeModulesDirs.unshift(path.join(currentDir, 'node_modules'));
    }
    currentDir = path.dirname(currentDir);
  }

  const modulePath = nodeModulesDirs.find((dir) => {
    const moduleDir = path.join(dir, moduleName);
    return fs.existsSync(moduleDir) || fs.existsSync(path.join(moduleDir, 'package.json'));
  });

  return modulePath ? path.join(modulePath, moduleName) : '';
}

function findRelativePath(moduleName, startDir) {
  const suffixName = suffixSet.find((suffix) => {
    return fs.existsSync(path.resolve(startDir, moduleName + suffix));
  });
  return suffixName ? path.resolve(startDir, moduleName + suffixName) : '';
}

function findPath(moduleName, startDir) {
  return moduleName.startsWith('./')
    ? findRelativePath(moduleName, startDir)
    : findModulePath(moduleName, startDir);
}

const importDeclarationMap = new Map();
const importExpressionMap = new Map();

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'cant dynamic import and synchronous import one file at the same time'
    },
    fixable: 'code',
    schema: []
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const dirname = path.dirname(context.getFilename());
        const modulePath = findPath(node.source.value, dirname);
        importDeclarationMap.set(modulePath, modulePath);
        if (importExpressionMap.get(modulePath)) {
          context.report({
            node,
            message: `cant dynamic import and synchronous import one file at the same time ${modulePath} === ${importExpressionMap.get(
              modulePath
            )} === file: ${node.source.value}`
          });
        }
      },
      ImportExpression(node) {
        // 获取当前文件的目录
        const dirname = path.dirname(context.getFilename());
        const modulePath = findPath(node.source.value, dirname);
        importExpressionMap.set(modulePath, modulePath);
        if (importDeclarationMap.get(modulePath)) {
          context.report({
            node,
            message: `cant dynamic import and synchronous import one file at the same time ${modulePath} === ${importDeclarationMap.get(
              modulePath
            )} === file: ${node.source.value}`
          });
        }
      }
    };
  }
};
