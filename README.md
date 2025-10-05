# Math Problem Generator - Developer Assessment Starter Kit

## Overview

This is a starter kit for building an AI-powered math problem generator application. The goal is to create a standalone prototype that uses AI to generate math word problems suitable for Primary 5 students, saves the problems and user submissions to a database, and provides personalized feedback.

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: Google Generative AI (Gemini)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd math-problem-generator
```

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → API to find your:
   - Project URL (starts with `https://`)
   - Anon/Public Key

### 3. Set Up Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database.sql`
3. Click "Run" to create the tables and policies

### 4. Get Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini

### 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and add your actual keys:
   ```
    NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
    GOOGLE_API_KEY=your_actual_google_api_key
   ```

### 6. Install Dependencies

```bash
npm install
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your Task

### 1. Implement Frontend Logic (`app/page.tsx`)

Complete the TODO sections in the main page component:

- **generateProblem**: Call your API route to generate a new math problem
- **submitAnswer**: Submit the user's answer and get feedback

### 2. Create Backend API Route (`app/api/math-problem/route.ts`)

Create a new API route that handles:

#### POST /api/math-problem (Generate Problem)
- Use Google's Gemini AI to generate a math word problem
- The AI should return JSON with:
  ```json
  {
    "problem_text": "A bakery sold 45 cupcakes...",
    "final_answer": 15
  }
  ```
- Save the problem to `math_problem_sessions` table
- Return the problem and session ID to the frontend

#### POST /api/math-problem/submit (Submit Answer)
- Receive the session ID and user's answer
- Check if the answer is correct
- Use AI to generate personalized feedback based on:
  - The original problem
  - The correct answer
  - The user's answer
  - Whether they got it right or wrong
- Save the submission to `math_problem_submissions` table
- Return the feedback and correctness to the frontend

### 3. Requirements Checklist

- [✅] AI generates appropriate Primary 5 level math problems
- [✅] Problems and answers are saved to Supabase
- [✅] User submissions are saved with feedback
- [✅] AI generates helpful, personalized feedback
- [✅] UI is clean and mobile-responsive
- [✅] Error handling for API failures
- [✅] Loading states during API calls

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Assessment Submission

When submitting your assessment, provide:

1. **GitHub Repository URL**: Make sure it's public
2. **Live Demo URL**: Your Vercel deployment
3. **Supabase Credentials**: Add these to your README for testing:
   ```
   NEXT_PUBLIC_SUPABASE_URL: https://mqzuwgfejuiedrxkizww.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xenV3Z2ZlanVpZWRyeGtpend3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NDY5MDcsImV4cCI6MjA3NTAyMjkwN30.CTNKPgDOWJEL-EDgYEp1bTdn3AjTXurmy0Gzf-vHy9s
   NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyDZW6zHq3yyVJoTB4dKxbn2Nz3XUwI5rqk
   ```

## Implementation Notes

*Please fill in this section with any important notes about your implementation, design decisions, challenges faced, or features you're particularly proud of.*

### My Implementation:

I focused on building a maintainable and scalable codebase with reusability in mind:

- **Custom Hooks for UI Components**: Created a `useSnackbar` hook to manage toast notifications across the app. This makes it super easy to show success/error messages anywhere without duplicating code, and it's ready to be reused in future features.

- **Standardized API Responses**: Implemented a consistent `Response<T>` interface (with `NestResponse` wrapper) for all API routes. This ensures every endpoint returns data in the same format, making error handling predictable and debugging much easier.

- **Reusable UI Components**: Built modular components like `Button`, `Card`, and `Snackbar` that follow a consistent design pattern. These components accept props for customization while maintaining visual consistency throughout the app.

- **Type Safety Throughout**: Used Zod schemas for runtime validation alongside TypeScript types. This catches errors early and ensures data integrity from API responses all the way to the database.

- **AI Response Parsing**: Created a `clearJSONFormat()` helper to handle Gemini AI's tendency to wrap JSON responses in markdown code blocks. This makes the AI integration more reliable.

- **Difficulty System**: Implemented three difficulty levels that actually affect the AI prompt, generating genuinely different problem complexities rather than just labeling them differently.

## Additional Features (Optional)

If you have time, consider adding:

- [✅] Difficulty levels (Easy/Medium/Hard)
- [ ] Problem history view
- [✅] Score tracking
- [ ] Different problem types (addition, subtraction, multiplication, division)
- [ ] Hints system
- [ ] Step-by-step solution explanations

---

Good luck with your assessment! 🎯