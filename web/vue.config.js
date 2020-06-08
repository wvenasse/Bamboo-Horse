module.exports = {
    lintOnSave: true,
    devServer: {
        host: '10.64.70.195', // ip
        // host: '172.20.10.10', // ip
        
        port: 8081, // 设置端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        proxy:null  //设置代理
    },
}