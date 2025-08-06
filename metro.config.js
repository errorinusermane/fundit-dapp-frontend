const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('bin'); // 예: wasm, bin 등 필요 시 확장
defaultConfig.resolver.sourceExts.push('cjs'); // 일부 패키지 대응

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg']
  }
};

module.exports = mergeConfig(defaultConfig, config);
