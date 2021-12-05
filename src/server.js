const { PORT } = require('./common/config');
const app = require('./app');

// Start server listen:
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
