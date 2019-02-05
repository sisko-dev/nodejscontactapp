const express = require('express')

const app = express()
var spremnik = []
app.listen(4000,()=>console.log('server slusa port 4000'))


app.put('/spremi',(req,res)=> {
    const ime = req.query.ime
    const prezime = req.query.prezime
    const broj  = req.query.broj

    console.log('Podaci su spremljeni')
    const kontakt= {
        ime: ime,
        prezime: prezime,
        broj: broj
    }
    spremnik.push(kontakt)

    res.send(`Poslao si iduce podatke: ${ime}, ${prezime}, ${broj}` )
})

app.get('/dohvati',(req,res)=>{
    res.send(spremnik)
})