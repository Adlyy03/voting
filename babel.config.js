module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Catatan: plugin expo-router harus menjadi yang pertama.
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
          },
          // Pastikan ini juga cocok dengan tsconfig.json
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
