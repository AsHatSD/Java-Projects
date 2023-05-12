Authors : Bogdan Nedelea, Stefan Dimitriu, Catalina Boznea

Description:

We developed and integrated a new NodeJs server with an existing AngularJs client application. The new system uses both REST and SOAP web services.


Instalation instructions: 

1. Extract the files in a new folder

2. Open the folder location in your terminal

3. Make sure you have Node, Express, AngularJs and MongoDb installed

4.Run "npm install" to install all the dependencies

5. To be able to create a database go to the partition where mongodb is installed and create a folder called "data" and inside, 
create another folder called "db"

6. To start the mongoserver open you terminal and go to your mongo db installation folder path  (ex: cd C:\Program Files\MongoDB\Server\3.4\bin)

7. Then write "mongod" this command will start your mongoserver

8. To create a connection with the mongoserver write "mongo" in a separate terminal tab

9.Use the following command to insert a user to the database:

	db.users.insertOne({number:"12345", name:"Systemadmin", type:"system_admin", password:"$2a$04$lGzeKecxdcGn1dWAARcYleR1ndvgacgzzLV4NDAx8JdMIuJiW7hS2"})
	
You can then log in with:
number: 12345
password: sysadmin5
	
The number, name and password can be different than the ones above.
However, if another password is being used, it need to be hashed using BCrypt before saving the user into the database.

9. In another terminal run "node app.js"

10. Open the browser and navigate to : http://localhost:8000 to access the client application