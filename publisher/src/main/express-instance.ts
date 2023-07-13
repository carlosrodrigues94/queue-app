import express, { Router } from "express";

export async function startExpressInstance(router: Router) {
  const app = express();
  app.use(router);
  app.listen(process.env.PORT, () => {
    console.log("Application running on:", process.env.PORT);
  });

  return app;
}
