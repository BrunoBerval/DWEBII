COPY megasena
FROM 'csv/megasena.csv'
WITH (
FORMAT csv,
DELIMITER ';',
HEADER,
NULL 'NULL',
ENCODING 'UTF8'
);

