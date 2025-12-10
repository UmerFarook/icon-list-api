import express from 'express';
import schema from "./schema.js";
import resolvers from "./resolver.js";
import {graphqlHTTP} from "express-graphql";


const app  = express();

app.get('/',(req,res)=>{
    res.send('You are fine with Graphql')
});

const root =resolvers;
app.use('/iconList',graphqlHTTP({
    schema,
    rootValue:root,
    graphiql:true,
}))

app.listen('8080',()=>{
    console.log("Listening to 8080");
})