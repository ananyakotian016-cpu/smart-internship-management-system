-- 1. List all students
SELECT * FROM students;

-- 2. List active internships
SELECT * FROM internships
WHERE status = 'ACTIVE';

-- 3. Reports for a particular student
SELECT *
FROM daily_reports
WHERE student_id = 1;

-- 4. Reports for a particular date
SELECT *
FROM daily_reports
WHERE report_date = '2026-10-01';

-- 5. Total hours worked by each student
SELECT student_id, SUM(hours_worked) AS total_hours
FROM daily_reports
GROUP BY student_id;