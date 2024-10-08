const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const Auth = require('../MiddleWare/Auth');
const prisma = new PrismaClient();

router.post("/addquestion", Auth,async (req, res) => {
    try {
        console.log("added question function callesd")
        const userId = req.user.id;
        const {  questionData } = req.body;
        const newQuestion = await prisma.question.create({
            data: {
                ...questionData,
                user: {
                    connect: { id: userId },
                },
            },
        });
        res.status(200).json({"message":"added succ"});
    } catch (error) {
        console.error('Error adding question:', error.message);
        res.status(500).json({ error: 'Failed to add question' ,message:e.message});
    }
});





router.get("/alladdedquestions", Auth,async (req, res) => {
    try {
        const  userId  = req.user.id;
        console.log(userId);
        const questions = await prisma.question.findMany({
 where:{
    user:req.user
 }
        });
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error retrieving questions:');
        console.log(error.message);
        res.status(500).json({ error: 'Failed to retrieve questions' });
    }
});


module.exports = router;
