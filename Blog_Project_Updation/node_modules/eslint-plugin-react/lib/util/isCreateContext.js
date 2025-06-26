'use strict';

/**
 * Checks if the node is a React.createContext call
 * @param {ASTNode} node - The AST node being checked.
 * @returns {Boolean} - True if node is a React.createContext call, false if not.
 */
module.exports = function isCreateContext(node) {
  if (
    node.init
    && node.init.type === 'CallExpression'
    && node.init.callee
    && node.init.callee.name === 'createContext'
  ) {
    return true;
  }

  if (
    node.init
    && node.init.callee
    && node.init.callee.type === 'MemberExpression'
    && node.init.callee.property
    && node.init.callee.property.name === 'createContext'
  ) {
    return true;
  }

  if (
    node.expression
    && node.expression.type === 'AssignmentExpression'
    && node.expression.operator === '='
    && node.expression.right.type === 'CallExpression'
    && node.expression.right.callee
    && node.expression.right.callee.name === 'createContext'
  ) {
    return true;
  }

  if (
    node.expression
    && node.expression.type === 'AssignmentExpression'
    && node.expression.operator === '='
    && node.expression.right.type === 'CallExpression'
    && node.expression.right.callee
    && node.expression.right.callee.type === 'MemberExpression'
    && node.expression.right.callee.property
    && node.expression.right.callee.property.name === 'createContext'
  ) {
    return true;
  }

  return false;
};
