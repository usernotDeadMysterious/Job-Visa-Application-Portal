import express from "express";
import { dummyMW } from "../middleware/dummyMW.js";

const router = express.Router();

router.get('/', dummyMW , (req,res) => {
    console.log(
        "logged in user ", req.user
    )
    res.status(200).json([

        {
           name:"Mobile",
           price:2000
        },
        {
            name:"TV",
            price:3000
        },
        {
            name:"LCD",
            price:4000
        }
    ]
        
    ) 
})


export const productsRouter = router;