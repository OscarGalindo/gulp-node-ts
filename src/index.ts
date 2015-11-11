const express = require('express');

const router = express();
router.get('/', (req, res) => {
    res.send('Hello world!');
});

router.listen(9000, () => {
    console.log('Running...');
});