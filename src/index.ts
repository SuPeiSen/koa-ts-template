import Koa from 'koa';
import { createKoaApp } from 'koa-ts-core';

async function bootstrap() {
  const [app] = await createKoaApp({
    // 自定义 koa 实例（可选，不传则内部创建）
    koaInstance: new Koa(),

    // 鉴权配置（配合 @AuthRouter 使用）
    auth: {
      handler: async (ctx) => {
        // TODO: 你的权限判断逻辑
        return false;
      }
    },

    // 错误处理配置
    error: {
      // 自定义错误处理函数
      handler: (error, ctx) => {
        console.error('Global error:', error);
        // 这里可以做统一日志、告警上报等
      }
      // 是否在响应中暴露堆栈（默认：非生产环境为 true，生产为 false）
      // exposeStack: process.env.NODE_ENV !== "production",
    },

    // 日志配置
    log: {
      // log4：基础日志能力（log4js）
      // false 或不传：不启用 log4
      // true: 使用默认 log4 配置
      // 函数：自定义 log4 配置
      log4: true,

      // 是否开启每次请求的运行时日志
      runtimeLog: true
    },

    // Hook 配置：请求生命周期 request / response / error
    hooks: {
      register: (ctx, type) => {
        // your tracing / metrics logic
        // type: "request" | "response" | "error"
      }
    },

    // CORS 中间件（例如 koa2-cors）
    koa2Cors: (cors) => {
      return cors();
    },

    // TrackId（RequestId）配置
    trackId: {
      /**
       * 生成 trackId 的函数：
       * - 默认：优先从 header `x-request-id` 透传；没有就生成 uuid.v4()
       * - 传入 false：禁用 trackId，不生成、不透传
       */
      // generator: false,

      // 是否写回响应头（默认 true）
      exposeHeader: true,

      // header 名称（默认 "x-request-id"）
      headerName: 'x-request-id'
    }

    /**
     * 阶段式中间件扩展
     * 你可以在 AsyncContext / ErrorHandling / Logging / Security / BodyParsing / Auth / Routing
     * 每一个阶段前/后插入自定义中间件
     */
    // phaseMiddlewares: {
    //   [MiddlewarePhase.Logging]: {
    //     before: [traceMiddleware],
    //     use: [metricsMiddleware],
    //     after: [yourCustomMiddleware],
    //   },
    // },
  });

  app.listen(process.env.APP_PORT ?? 3000, () => {
    console.log(`Server running at http://localhost:${process.env.APP_PORT ?? 3000}`);
  });
}

bootstrap();
