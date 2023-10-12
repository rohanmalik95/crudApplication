from flask import Flask,request,jsonify
import pymongo
from flask_cors import CORS
from bson import ObjectId
from phonebookSchema import phonebookSchema

app = Flask(__name__)
CORS(app)

dbConnection = pymongo.MongoClient("mongodb://localhost:27017")

database= dbConnection["phonebook"]
collectionList= database.list_collections()

# if ("data" not in collectionList):
#     createCollection=database.create_collection("data")
#     print("in if statement!")

# print("database initiated ! ")
dataCollection=database["data"]


#Route to add route to the database
@app.route("/addcontact",methods=["POST"])
def addcontact():
    print("Adding contact")
    jsonData= request.get_json()
    print(jsonData)
    addData=dataCollection.insert_one(jsonData)
    if (addData.acknowledged==True):
        return "Contact added successfully!"
    else:
        return "Faild to add contact!"



#Route to delete a contact form the database
@app.route("/deletecontact",methods=["POST"])
def deletecontact():
    jsondata=request.get_json()
    print(jsondata['id'])
    deleteNote=dataCollection.delete_one({"_id":ObjectId(jsondata["id"])})
    if (deleteNote.acknowledged==True):
        return "Contact deleted succesfully!"
    else:
        return "Contact deleting failed"

# Route to update an existing note in the databse
@app.route("/editcontact",methods=["POST"])
def editcontact():
    jsondata=request.get_json()
    updateData={
        "name":jsondata["name"],
        "email":jsondata["email"],
        "phone":jsondata["phone"],
        "company":jsondata["company"]
    }
    updateDb=dataCollection.update_one({"_id":ObjectId(jsondata["id"])},{'$set':updateData})
    print(updateDb)
    if (updateDb.acknowledged==True):
        return "Contact edited succesfully!"
    else:
        return "Contact editing failed"


#Route to get all the contacts form the database:
@app.route("/getallcontacts",methods=["GET"])
def getallcontacts():
    listcontacts=dataCollection.find({})
    print(listcontacts)
    dataToSend=[]
    for i in listcontacts:
        data={"name":i["name"],
              "email":i["email"],
              "phone":i["phone"],
              "company":i["company"],
              "id":str(i["_id"])
        }
        dataToSend.append(data)
    print(dataToSend)
    return jsonify(dataToSend)

app.run(debug=True)