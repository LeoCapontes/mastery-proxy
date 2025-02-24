const express = require('express')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const app = express()

//Routes
app.use('/api', require('./routes'))

// Enable cors
app.use(cors())
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });