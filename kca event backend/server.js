const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse incoming JSON data

// Sample event data (replace with a database in real projects)
const events = [
  { id: 1, name: 'Tech Conference', date: '2024-11-20', location: 'Main Hall', reserved: 0, capacity: 100 },
  { id: 2, name: 'Career Fair', date: '2024-12-01', location: 'Auditorium', reserved: 0, capacity: 200 }
];

// Routes

// Get all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Get an event by ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

// Reserve a spot for an event
app.post('/api/reserve', (req, res) => {
  const { eventId, name, email } = req.body;

  // Find event by ID
  const event = events.find(e => e.id === eventId);

  if (event && event.reserved < event.capacity) {
    event.reserved += 1;
    res.json({ message: 'Reservation successful', event });
  } else if (!event) {
    res.status(404).send('Event not found');
  } else {
    res.status(400).send('Event is fully booked');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
