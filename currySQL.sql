
--Makes the table for a curry order
CREATE TABLE Orders (

    ID INT AUTO_INCREMENT,
    FullName VARCHAR(125),
    CurryType VARCHAR(125),
    Spice VARCHAR (125),
    NAAN VARCHAR(125),
    Drink VARCHAR(125),
    PRIMARY KEY (ID),
    CurrentTime Datetime
);

INSERT INTO ORDER VALUES('TEST', 'BUTTER CHICKEN', 'HOT','GARLIC', 'COKE', NOW())



