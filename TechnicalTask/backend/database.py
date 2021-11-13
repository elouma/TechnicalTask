import sqlite3
conn = sqlite3.connect("Broker.db")
cur = conn.cursor()


cur.execute(""" 
CREATE TABLE Customer
('Customer ID' varchar(255) NOT NULL, 
'Customer Location' varchar(50),
 PRIMARY KEY ('Customer ID')); """)

cur.execute(""" 
CREATE TABLE Purchase_Order
('Purchase ID' varchar(50) NOT NULL,
  'Order date' date,
  'Customer ID' varchar(255), 
'Order Req Amt (Ton)' int NOT NULL,
FOREIGN KEY('Customer ID') REFERENCES Customer('Customer ID'),
 PRIMARY KEY('Purchase ID')
); """)

cur.execute(""" 
CREATE TABLE Supplier
('Supplier ID' varchar(255) NOT NULL,
location varchar(50),
 PRIMARY KEY('Supplier ID')
); """)


cur.execute(""" 
CREATE TABLE Order_Product
('Purchase ID' varchar(255) NOT NULL,
'Fullfilled By ID' varchar(255) NOT NULL,
'Fullfilled By Location' varchar(50),
'Supplied Amt (Ton)' int NOT NULL,
'Cost Of Delivery ($)' int NOT NULL,
FOREIGN KEY('Purchase ID') REFERENCES Purchase_Order('Purchase ID'),
FOREIGN KEY('Fullfilled By ID') REFERENCES Supplier('Supplier ID'),
FOREIGN KEY('Fullfilled By Location') REFERENCES Supplier(location),
PRIMARY KEY ('Purchase ID','Fullfilled By ID')
); """)

print("BrokerTable has been created.")

conn.commit()


with open('/Users/Yahnik/Desktop/TechnicalTask/dataset/dataset.csv', 'r') as file:
    no_records = 0
    for row in file:
        cur.execute(
            '''INSERT INTO Customer ('Customer ID', 'Customer Location') VALUES(?, ?);''')
        cur.execute(
            "INSERT INTO Purchase_Order ('Purchase ID','Customer ID','Order date','Order Req Amt (Ton)') VALUES (?,?,?,?);")
        conn.commit()
        no_records += 1
conn.close()
print('\n{} Records Transferred')
