from flask import Flask, request, jsonify, send_from_directory, redirect
import uuid

app = Flask(__name__, static_folder='./react_frontend/build', static_url_path='/')

conversations = {
    "test1": [{
        "text": "Hello World!",
        "sender": "user"
    }, 
    {
        "text": "Hi!",
        "sender": "bot"
    }],
    "test2": [{ 
        "text": "How are you?",
        "sender": "user"
    },
    {
        "text": "I'm good, thank you!",
        "sender": "bot"
    }]
}

@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/conversation/<string:id>')
def conversation_page(id):
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/conversation/', methods=['GET'])
def get_conversations():
    return conversations

@app.route('/api/conversation/<string:id>', methods=['GET'])
def get_conversation(id):
    if id in conversations:
        return conversations[id]
    
    return {"error": "Conversation not found"}, 404

@app.route('/api/conversation', methods=['POST'])
def create_conversation():
    data = request.json
    id = str(uuid.uuid4())
    if data:
        conversations[id] = [{
            "sender": data.get("sender"),
            "text": data.get("text")
            }]
    else:
        conversations[id] =  []

    return {"id": id, "messages": conversations[id]}

@app.route('/api/conversation/<string:id>', methods=['PUT'])
def update_conversation(id):
    if id in conversations:
        data = request.json
        conversations[id].append(data)
        return conversations[id]
    
    return {"error": "Conversation not found"}, 404

@app.route('/api/conversation/<string:id>', methods=['DELETE'])
def delete_conversation(id):
    if id in conversations:
        conversations.pop(id)
        return conversations
    
    return {"error": "Conversation not found"}, 404


if __name__ == '__main__':
    app.run(debug=True)