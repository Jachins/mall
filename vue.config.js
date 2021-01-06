module.exports = {
    // 配置别名
    // 配置Webpack
    configureWebpack: {
        resolve: {
            // alias:配置别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }

    }
}