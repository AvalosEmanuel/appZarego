import os
 
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

CORS(app)

db = MongoEngine()
db.init_app(app)

class Task(db.Document):
    title = db.StringField()
    description = db.StringField()
    status = db.StringField()


@app.route('/tasks/', methods=['POST'])
def createTask():
    body = request.get_json()
    task = Task(**body).save()
    return jsonify(task), 201

    
@app.route('/tasks', methods=['GET'])
def getTasks():
    tasks = Task.objects()
    return jsonify(tasks), 200


@app.route('/tasks/<id>', methods=['GET'])
def getOneTask(id: str):
    task = Task.objects(id=id).first()
    return jsonify(task), 200


@app.route('/tasks/<id>', methods=['PUT'])
def updateOneTask(id):
    body = request.get_json()
    task = Task.objects.get_or_404(id=id)
    task.update(**body)
    return jsonify(str(task.id)), 200


@app.route('/tasks/<id>', methods=['DELETE'])
def deleteOneTask(id):
    task = Task.objects.get_or_404(id=id)
    task.delete()
    return jsonify(str(task.id)), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)