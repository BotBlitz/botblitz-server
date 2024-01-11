import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { dbmysql } from './config/database/mysqlDb'
import { routes } from './config/routes/routes';
import { errorHandler } from './config/middleware/exceptions/errorHandler'
import { environment } from './resources/environments';

const port = process.env.PORT || environment.get("main.app.port") || '5000'
const mongoDB = require('./config/database/mongoDb')


dbmysql.authenticate().then(() => {
  const app = express();
  mongoDB._connect();
  app.use(cors({
    origin: '*', // Permitir chamadas de qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Permitir todos os métodos HTTP
    optionsSuccessStatus: 204, // Define o código de status para OPTIONS bem-sucedido
    credentials: true, // Permitir o envio de credenciais (cookies, por exemplo)
  }));

  // Inclusao das bibliotecas de body parser
  app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Inclusao do arquivo de rotas
  app.use('/', routes)

  //Error handling
  app.use(async (err: any, req: any, res: any, next: any) => {
    if (!errorHandler.isTrustedError(err)) {
      next(err);
    }
    await errorHandler.handleError(err, res);
  })

  app.listen(port, () => {
    console.log(`Application started on port ${port}!`);
  });
})


