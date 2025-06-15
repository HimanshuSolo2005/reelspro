# ReelsPro

A modern video sharing platform built with Next.js 13+, TypeScript, and MongoDB.

## Technologies Used

- [Next.js 13+](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Git

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd reelspro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` and add your:
- MongoDB connection string
- NextAuth secret (can be generated using: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"`)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User authentication (signup/login)
- JWT session handling
- Secure password hashing
- MongoDB database integration
- TypeScript type safety

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication related routes
│   └── page.tsx           # Home page
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # NextAuth configuration
│   └── db.ts             # Database connection
├── models/               # MongoDB models
│   ├── User.ts          # User model
│   └── Video.ts         # Video model
└── middleware.ts        # NextAuth middleware
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
