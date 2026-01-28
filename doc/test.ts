import { ApiDoc } from "koa-ts-core";
export default class Test {
  static desc = "";
  get_test(): ApiDoc {
    return {
      method: "get",
      path: "/get_test",
      summary: "",
      tags: [],
      parameters: [],
      requestBody: { content: {} },
      responses: {},
    };
  }
  get_(): ApiDoc {
    return {
      method: "get",
      path: "/get_",
      summary: "",
      tags: [],
      parameters: [],
      requestBody: { content: {} },
      responses: {},
    };
  }
  delete_test(): ApiDoc {
    return {
      method: "delete",
      path: "/delete_test",
      summary: "",
      tags: [],
      parameters: [],
      requestBody: { content: {} },
      responses: {},
      security: [],
    };
  }
}
