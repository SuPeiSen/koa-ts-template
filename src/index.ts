import bodyParser from 'koa-bodyparser';
import { initializeKoaApp } from 'koa-ts-core';
import cors from 'koa2-cors';

const initializeApp = async () => {
  // 初始化数据库连接
  // await AppDataSource.initialize();

  const [app, appRouter] = await initializeKoaApp({
    authCheckCallback: async (ctx) => {
      return true;
    },
    registerHighPriorityMiddleware: async (app) => {
      app.use(cors());
      app.use(bodyParser());
    }
  });
  app.listen();
};

initializeApp();
