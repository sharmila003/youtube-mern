import express from 'express';
import {Register,SignIn}   from '../controllers/auth.js'

const  router =   express.Router();

//CREATE A USER
router.post("/register", Register )

//SIGN IN
router.post("/signin", SignIn )


export  default  router;


