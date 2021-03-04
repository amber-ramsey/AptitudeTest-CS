BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER NOT NULL,
	"student_id"	INTEGER NOT NULL,
	"email"	VARCHAR(120) NOT NULL,
	"password"	VARCHAR(60) NOT NULL,
	"is_admin"	BOOLEAN NOT NULL,
	"created_at"	DATETIME NOT NULL,
	PRIMARY KEY("id"),
	UNIQUE("student_id"),
	UNIQUE("email"),
	CHECK("is_admin" IN (0, 1))
);
CREATE TABLE IF NOT EXISTS "test_result" (
	"id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"elapsed_time_ms"	INTEGER NOT NULL,
	"platform"	VARCHAR(32),
	"browser"	VARCHAR(32),
	"browser_version"	VARCHAR(8),
	"language"	VARCHAR(32),
	"created_at"	DATETIME NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id")
);
CREATE TABLE IF NOT EXISTS "question_response" (
	"id"	INTEGER NOT NULL,
	"test_result_id"	INTEGER NOT NULL,
	"is_example"	BOOLEAN NOT NULL,
	"question_num"	INTEGER NOT NULL,
	"response"	INTEGER NOT NULL,
	"correct"	BOOLEAN NOT NULL,
	"elapsed_time_ms"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("test_result_id") REFERENCES "test_result"("id"),
	CHECK("correct" IN (0, 1)),
	CHECK("is_example" IN (0, 1))
);
COMMIT;
