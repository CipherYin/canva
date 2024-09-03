import { unsplash } from "@/lib/unsplash";
import { verifyAuth } from "@hono/auth-js";
import { error } from "console";
import { Hono } from "hono";


const DEFAULT_COUNT = 50;
const DEFUALT_COLLECTIONS_IDS = ["317099"]

const app = new Hono()
    .get('/',verifyAuth(),async (c)=>{
        const images =  await unsplash.photos.getRandom({
            collectionIds: DEFUALT_COLLECTIONS_IDS,
            count: DEFAULT_COUNT
        });

        if(images.errors){
            
            return c.json({error: images.errors},409)
        }
        let response = images.response;
        if(!Array.isArray(response)){
            response = [response]
        }


        return c.json({
            data: response
        })
    })

export default app;