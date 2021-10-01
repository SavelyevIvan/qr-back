module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended-script", "prettier"],

  rules: {
    "node/no-unpublished-require": 0,
    quotes: ["warn", "double"],
    "no-unused-vars": ["error", { vars: "all" }],
  },
};
