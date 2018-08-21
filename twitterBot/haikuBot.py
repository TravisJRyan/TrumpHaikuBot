# Add all import statements at top of file
import tweepy
from time import sleep

# Import our Twitter credentials from credentials.py
from credentials import *

# MySQL Connection
import mysql.connector
from mysql.connector import Error

# Access and authorize our Twitter credentials from credentials.py
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
 
 
def connect():
    try:
        conn = mysql.connector.connect(host=dbHost, database=dbName, user=dbUser, password=dbPass)
        if conn.is_connected():
            print('Connected to MySQL database')
        cursor = conn.cursor()
        cursor.execute("SELECT HaikuText, QueuePosition FROM Haiku WHERE Verified = 1 ORDER BY QueuePosition LIMIT 1;")
        row = cursor.fetchone()
        if row is not None:
            api.update_status(row[0].replace("\n\n", "\n"))
            print("Printed haiku:")
            print(row[0]+"\n\n\n")
            cursor.execute("SET SQL_SAFE_UPDATES = 0;")
            cursor.execute("DELETE FROM Haiku WHERE HaikuText = \""+str(row[0])+"\" AND Verified = 1;")
            conn.commit()
            print("Haiku deleted from database!")
    except Error as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

connect()