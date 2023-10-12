
phonebookSchema = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["name", "email", "phone", "company"],
        "properties": {
            "name": {
                "bsonType": "string",
            },
            "email": {
                "bsonType": "string",
            },
            "phone": {
                "bsonType": "string",

            },
            "company": {
                "bsonType": "string",

            }
        }
    }
}