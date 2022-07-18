const express = require('express');
const authRoutes = require('./routes/authRoutes');
const migrationRoutes = require('./routes/migrationRoutes');
const dataRoutes = require('./routes/dataRoutes');
const app = express();
const config = require('./config/default');
const cookieParser = require('cookie-parser')


app.listen(config.port, () => console.log(`Server is running on port: http://localhost:${config.port}`));
app.use(cookieParser());
app.use('/oauth2', authRoutes);
app.use('/data', dataRoutes);
app.use('/migrate', migrationRoutes);
