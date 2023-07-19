-- Create all of the tables
CREATE TABLE "users" (
  "id" uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  "avatar_url" text
);

CREATE TABLE "groups" (
  "id" bigserial PRIMARY KEY,
  "user_id" uuid NOT NULL DEFAULT (auth.uid()) REFERENCES "users" ON DELETE CASCADE,
  "title" varchar(30),
  "color" varchar(6) NOT NULL,
  "show" boolean NOT NULL DEFAULT (TRUE),
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "events" (
  "id" bigserial PRIMARY KEY,
  "group_id" bigint NOT NULL REFERENCES "groups" ON DELETE CASCADE,
  "title" varchar(40),
  "start_time" timestamp(0) NOT NULL,
  "duration" integer NOT NULL CHECK ("duration" >= 30),
  "description" text,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "tasks" (
  "id" bigserial PRIMARY KEY,
  "group_id" bigint NOT NULL REFERENCES "groups" ON DELETE CASCADE,
  "parent_task" bigint REFERENCES "tasks" ON DELETE CASCADE,
  "title" varchar(40),
  "description" text,
  "due_time" timestamp(0),
  "complete" boolean NOT NULL DEFAULT (FALSE),
  "auto_complete" boolean NOT NULL DEFAULT (FALSE),
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "habits" (
  "id" bigserial PRIMARY KEY,
  "user_id" uuid NOT NULL DEFAULT (auth.uid()) REFERENCES "users" ON DELETE CASCADE,
  "title" varchar(40),
  "color" varchar(6) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "habit_history" (
  "id" bigserial PRIMARY KEY,
  "habit_id" bigint NOT NULL REFERENCES "habits" ON DELETE CASCADE,
  "entry_date" date NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

-- Enable rls
ALTER TABLE "users" ENABLE row level security;
ALTER TABLE "groups" ENABLE row level security;
ALTER TABLE "events" ENABLE row level security;
ALTER TABLE "tasks" ENABLE row level security;
ALTER TABLE "habits" ENABLE row level security;
ALTER TABLE "habit_history" ENABLE row level security;

-- Add rls policies
CREATE POLICY "Enable SELECT for users who match 'id'" ON "users"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() = id);

CREATE POLICY "Enable ALL for users who match 'user_id'" ON "groups"
AS PERMISSIVE FOR ALL
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable ALL for users who match 'user_id'" ON "events"
AS PERMISSIVE FOR ALL
TO public
USING (auth.uid() = (
  SELECT user_id FROM "groups"
  WHERE "groups".id = group_id
  LIMIT 1
))
WITH CHECK (auth.uid() = (
  SELECT user_id FROM "groups"
  WHERE "groups".id = group_id
  LIMIT 1
));

CREATE POLICY "Enable ALL for users who match 'user_id'" ON "tasks"
AS PERMISSIVE FOR ALL
TO public
USING (auth.uid() = (
  SELECT user_id FROM "groups"
  WHERE "groups".id = group_id
  LIMIT 1
))
WITH CHECK (auth.uid() = (
  SELECT user_id FROM "groups"
  WHERE "groups".id = group_id
  LIMIT 1
));

CREATE POLICY "Enable ALL for users who match 'user_id'" ON "habits"
AS PERMISSIVE FOR ALL
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable ALL for users who match 'user_id'" ON "habit_history"
AS PERMISSIVE FOR ALL
TO public
USING (auth.uid() = (
  SELECT user_id FROM "habits"
  WHERE "habits".id = habit_id
  LIMIT 1
))
WITH CHECK (auth.uid() = (
  SELECT user_id FROM "habits"
  WHERE "habits".id = habit_id
  LIMIT 1
));
