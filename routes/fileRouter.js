const express = require("express");

const router = express.Router();
router.get('/', (req, res) => {
    res.send("file page")
})


module.exports = router;