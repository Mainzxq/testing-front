module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended"],
  env: {
    browser: true,
    jest: true
  },
  plugins: ["react", "jsx-ally", "import", "prettier"],
  rules: {
    "max-len": ["error", 100],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-mixed-operatiors": "off",
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: true,
          object: false
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    "import/prefer-default-export": "off",
    "jsx-ally/anchor-is-valid": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        arrorParens: "always",
        printWidth: 100
      }
    ]
  }
};
