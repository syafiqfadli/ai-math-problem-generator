import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      math_problem_sessions: {
        Row: {
          id: string
          created_at: string
          problem_text: string
          correct_answer: number
          difficulty: 'easy' | 'medium' | 'hard' | null
        }
        Insert: {
          id?: string
          created_at?: string
          problem_text: string
          correct_answer: number
          difficulty?: 'easy' | 'medium' | 'hard' | null
        }
        Update: {
          id?: string
          created_at?: string
          problem_text?: string
          correct_answer?: number
          difficulty?: 'easy' | 'medium' | 'hard' | null
        }
      }
      math_problem_submissions: {
        Row: {
          id: string
          session_id: string
          user_answer: number
          is_correct: boolean
          feedback_text: string
          score: number
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_answer: number
          is_correct: boolean
          feedback_text: string
          score?: number
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_answer?: number
          is_correct?: boolean
          feedback_text?: string
          score?: number
          created_at?: string
        }
      }
      user_scores: {
        Row: {
          id: string
          total_score: number
          total_attempts: number
          correct_attempts: number
          easy_correct: number
          medium_correct: number
          hard_correct: number
          updated_at: string
        }
        Insert: {
          id?: string
          total_score?: number
          total_attempts?: number
          correct_attempts?: number
          easy_correct?: number
          medium_correct?: number
          hard_correct?: number
          updated_at?: string
        }
        Update: {
          id?: string
          total_score?: number
          total_attempts?: number
          correct_attempts?: number
          easy_correct?: number
          medium_correct?: number
          hard_correct?: number
          updated_at?: string
        }
      }
    }
  }
}