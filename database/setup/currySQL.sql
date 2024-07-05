/* Makes the table for a curry order */
CREATE TABLE Orders (
    ID INT AUTO_INCREMENT,
    Email VARCHAR(125),
    CurryType VARCHAR(125),
    Spice VARCHAR (125),
    NAAN VARCHAR(125),
    Drink VARCHAR(125),
    Points INT,
    PRIMARY KEY (ID),
    CurrentTime Datetime
);

ALTER USER 'curry'@'%' IDENTIFIED WITH mysql_native_password BY 'strong_password';
FLUSH PRIVILEGES;

-- INSERT INTO ORDER VALUES('TEST', 'BUTTER CHICKEN', 'HOT','GARLIC', 'COKE', NOW())
