# Event Planner

A Node.js application for managing events and reminders. Users can create events, set reminders, and receive notifications for upcoming events.

## Features

- User authentication (register/login)
- Event creation and management
- Event categorization
- Reminder system with email notifications
- Filter events by date, category, or status
- RESTful API
- Automated testing with GitHub Actions

## Prerequisites

- Node.js (v16 or later)
- MongoDB (v5.0 or later)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd event-planner
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/event-planner
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
NODE_ENV=development
```

## Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Start in production mode:

```bash
npm start
```

## Testing

Run the test suite:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

## API Endpoints

### Authentication

- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user
- GET `/api/users/profile` - Get user profile

### Events

- POST `/api/events` - Create a new event
- GET `/api/events` - Get all events (with optional filters)
- GET `/api/events/:id` - Get a specific event
- PATCH `/api/events/:id` - Update an event
- DELETE `/api/events/:id` - Delete an event

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
