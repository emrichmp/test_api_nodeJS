const express = require('express')
const router = express.Router()
const Word = require('../models/word')

//Get all
router.get('/', async (req, res) => {
    //res.send('Hello')
    try {
        const words = await Word.find()
        res.json(words)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//Get one
router.get('/:id', getWord, (req, res) => {
    res.send(res.word)
})
//Create one
router.post('/', async (req, res) => {
    const word = new Word({
        name: req.body.name,
        date: req.body.date
    })
    try {
        const newWord = await word.save()
        res.status(201).json(newWord)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Update one
router.patch('/:id', getWord, async (req, res) => {
    if (req.body.name != null) {
        res.word.name = req.body.name
    }
    if (req.body.date != null) {
        res.word.date = req.body.date
    }
    try {
        const updatedWord = await res.word.save()
        res.json(updatedWord)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//Delete one
router.delete('/:id', getWord, async (req, res) => {
    try {
        await res.word.remove()
        res.json({ message: "Deleted word" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getWord(req, res, next) {
    let word
    try {
        word = await Word.findById(req.params.id)
        if (word === null) {
            return res.status(404).json({ message: "can't find word" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.word = word
    next()
}

module.exports = router