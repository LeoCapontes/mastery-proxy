const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const app = express()

// Rate limiting
 const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5
})

app.use(limiter)
app.set('trust proxy', 1)

//Routes
app.use('/api', require('./routes'))

// Enable cors
app.use(cors())
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });