const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const port = 5000;

app.use(express.json({ limit: '150mb' }));
app.use(
  express.urlencoded({
    limit: '150mb',
    extended: true,
  })
);
app.use(cors());
app.use(express.static('public'));
dotenv.config();

// Include route files
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/cartRoutes')(app);
require('./routes/adminRoutes')(app);
require('./routes/bookingRoutes')(app);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
