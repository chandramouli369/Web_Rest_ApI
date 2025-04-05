SELECT *
FROM Tasks
WHERE DueDate BETWEEN CAST(GETDATE() AS DATE) AND DATEADD(DAY, 7, CAST(GETDATE() AS DATE));

SELECT Priority, COUNT(*) AS TaskCount
FROM Tasks
GROUP BY Priority;

SELECT * FROM Tasks
WHERE DueDate BETWEEN GETDATE() AND DATEADD(DAY, 7, GETDATE());


SELECT Priority, COUNT(*) AS TaskCount
FROM Tasks
GROUP BY Priority;

SELECT * FROM Tasks
WHERE DueDate < GETDATE() AND Status != 'Completed';

UPDATE Tasks
SET Status = 'Completed'
WHERE DueDate < GETDATE() AND Status != 'Completed';

 

