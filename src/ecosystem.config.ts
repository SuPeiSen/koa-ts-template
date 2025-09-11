module.exports = {
  apps: [
    {
      name: 'qiusuo-node',
      script: `${__dirname}/index.js`,
      instances: 'max', // 使PM2按照可用CPU数量自动分散实例
      autorestart: true, // 如果应用崩溃，则自动重启
      watch: false, // 实时监听文件变动，并在变更时重启应用
      max_memory_restart: '200M' // 如果应用使用超过则重启
    }
  ]
};
