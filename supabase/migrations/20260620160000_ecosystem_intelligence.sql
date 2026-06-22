-- Phase 4.2 Ecosystem Intelligence Layer Migrations

-- Add ecosystem JSONB columns to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS mentor_state JSONB NOT NULL DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS learning_analytics JSONB NOT NULL DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS skill_graph JSONB NOT NULL DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS learning_history JSONB NOT NULL DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS career_profile JSONB NOT NULL DEFAULT '{}'::jsonb;
