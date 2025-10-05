-- Create math_problem_sessions table
CREATE TABLE IF NOT EXISTS math_problem_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  problem_text TEXT NOT NULL,
  correct_answer NUMERIC NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

-- Create math_problem_submissions table
CREATE TABLE IF NOT EXISTS math_problem_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES math_problem_sessions(id) ON DELETE CASCADE,
  user_answer NUMERIC NOT NULL,
  is_correct BOOLEAN NOT NULL,
  feedback_text TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE math_problem_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE math_problem_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your auth requirements)
CREATE POLICY "Enable read access for all users" ON math_problem_sessions FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON math_problem_sessions FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON math_problem_submissions FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON math_problem_submissions FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_submissions_session_id ON math_problem_submissions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON math_problem_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON math_problem_submissions(created_at DESC);
