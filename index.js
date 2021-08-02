const express = require('express');
const app = express();
const parkings = require('./parkings.json');
const reservations = require('./reservations.json')

app.use(express.json());

app.get('/parkings', (req,res)=>{
    res.status(200).json(parkings)
})



app.get('/parkings/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

app.post('/parkings', (req,res)=>{
    parkings.push(req.body);
    res.status(200).json(parkings);
});


app.put('/parkings/:id',(req,res) => {
    const id = parseInt(req.params.id);
    let parking = parkings.find(parking => parking.id === id);
    parking.name = req.body.name,
    parking.city = req.body.city,
    parking.type = req.body.type,
    res.status(200).json(parking)
});


app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id);
    let parking =parkings.find(parking => parking.id === id);
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
});

app.get('/reservations', (req,res)=>{
    res.status(200).json(reservations)
});

app.get('/reservations/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const reservation = reservations.find(reservation => reservation.id === id); 
    res.status(200).json(reservation);
});


app.post('/parkings', (req,res)=>{
    reservations.push(req.body);
    res.status(200).json(reservations);
});


app.put('/parkings/:id',(req,res) => {
    const id = parseInt(req.params.id);
    let reservation = reservations.find(reservation => reservation.id === id);
    reservation.parkingId = req.body.parkingId,
    reservation.city = req.body.city,
    reservation.clientName = req.body.clientName,
    reservation.vehicle = req.body.vehicle,
    reservation.checkin = req.body.checkin,
    reservation.checkout = req.body.checkout,


    res.status(200).json(reservation)
});


app.delete('/reservations/:id', (req,res) => {
    const id = parseInt(req.params.id);
    let reservation =reservations.find(reservation => reservation.id === id);
    reservations.splice(reservations.indexOf(reservation),1)
    res.status(200).json(reservations)
});

app.get('/parkings/:id/reservations',(req,res)=>{
    const id = parseInt(req.params.id);
    const reservation = reservations.filter(reservations => reservations.id === id);
    res.status(200).json(reservation);
    
})




app.listen(3000, ()=>{
    console.log(`serveur à l'écoute`);
});