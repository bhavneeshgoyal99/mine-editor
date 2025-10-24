const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      editor: './src/js/editor.js'
    },
    output: {
      path: path.resolve(__dirname, 'examples/mine-editor'),
      filename: isProduction ? '[name].min.js' : '[name].js',
      library: 'AdvancedTextEditor',
      libraryTarget: 'umd',
      globalObject: 'this',
      libraryExport: 'default' 
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? 'editor.min.css' : 'editor.css'
      })
    ],
    optimization: isProduction ? {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
          }
        }
      })
      ]
    } : {},
   devServer: {
    static: [
      {
        directory: path.join(__dirname, 'examples'),
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/dist',
      }
    ],
    compress: true,
    port: 9000,
    open: true
  }

  };
};