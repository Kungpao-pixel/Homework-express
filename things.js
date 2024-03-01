var express = require('express');
const pool = require('./queries');
const { Pool } = require('pg');
var router = express.Router();

router.post('/actors', (req, res)=>{
    pool.query(`
    INSERT INTO actor (actor_id, first_name, last_name, last_update) 
    VALUES 
    ('205', 'Aldi', 'Taher', NOW()),
    ('206', 'James', 'Robinson', NOW()),
    ('207', 'Julian', 'Dugong', NOW()),
    ('208', 'Balmon', 'Ahmad', NOW()),
    ('209', 'Pintiw', 'Khaleed', NOW())
    `, (err, result)=>{
        if(err) {
            throw err
        }
        res.status(201).json(result.rows)
    })
})


router.get('/films', (req, res)=>{
    pool.query(`
        SELECT * from film
    `, (err, result)=>{
        if(err) {
            throw err
        }
        res.status(201).json(result.rows)
    })
})

router.get('/films/:id', (req, res)=>{
    pool.query(`
        SELECT * from film WHERE film_id=${req.params.id}
    `, (err, result)=>{
        if(err) {
            throw err
        }
        res.status(201).json(result.rows)
    })
})

router.get('/categories', (req, res)=>{
    pool.query(`
        SELECT * from category
    `, (err, result)=>{
        if(err) {
            throw err
        }
        res.status(201).json(result.rows)
    })
})

router.get('/categories/:name', (req, res)=>{
    pool.query(`
    SELECT film.film_id, film.title, category.name AS cName FROM film
    LEFT JOIN film_category ON film_category.film_id=film.film_id
    LEFT JOIN category ON category.category_id = film_category.category_id
    WHERE category.name = '${req.params.name}'
    `, (err, result)=>{
        if(err) {
            throw err
        }
        res.status(201).json(result.rows)
    })
})

module.exports = router
