
import app from "./app";
import env from "./util/validateEnv";
import dbConnect from './config/dbConnect'



async function startServer() {
 
  const port = env.PORT;
 
  dbConnect().then();
  
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  
}


startServer()


