module.exports = {
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'], options: {
        singleQuote: false,
      },
    },
  ],
};
