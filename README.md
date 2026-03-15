# BioForm Builder (Next.js + Firebase Firestore)

This project is a simple single-page biodata form built with Next.js App Router and Firebase Firestore.

## Features

- Single homepage biodata form
- Email/Password Login and Signup
- Save biodata in Firestore collection: biodata
- Auto-fetch latest biodata for logged-in user on page load and pre-fill the form
- Basic form validation with error messages
- Simple success and error messages

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Firebase Web SDK + Firestore

## Form Fields

- Full Name
- Email
- Phone Number
- Address
- Education
- Skills
- Experience

## Environment Variables

Create a file named .env.local in the project root and add:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

## Firebase Collection

Create a Firestore collection named biodata with documents containing:

- fullName
- email
- phone
- address
- education
- skills
- experience
- userId
- createdAt

## Run Locally

1. Install dependencies:
   npm install

2. Start development server:
   npm run dev

3. Open:
   http://localhost:3000

## How It Works

- User must login/signup with email and password.
- On page load, the app fetches the latest document from biodata for the logged-in user and fills the form.
- On submit, the app validates fields, prevents default behavior, and saves a new document using addDoc.
