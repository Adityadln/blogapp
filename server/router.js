import express from 'express';
const router=express.Router();
import { blogAdd,blogDelete,blogFind,blogGetAll,blogModify,blogVerify,blogFindOne,signup,login } from './controller/controller.js';

router.post('/login',login);
router.post("/signup",signup)
router.post('/blogs/verify',blogVerify)
router.post('/blogs/find',blogFind)
router.post('/blogs/add',blogAdd)
router.post("/blogs/getall",(req,res,next)=>{
    req.time=new Date().toString();
    next();
},blogGetAll)
router.post('/blogs/findone',blogFindOne)
router.patch('/blogs/modify',blogModify)
router.delete('/blogs/delete',blogDelete);

export default router;