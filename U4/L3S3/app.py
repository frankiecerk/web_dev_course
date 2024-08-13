from flask import Flask, request, send_from_directory, render_template
import os
from pathlib import Path

app = Flask(__name__, static_folder='./react-frontend/build', template_folder='./react-frontend/build', static_url_path='/')

# Initialize a list to store users
users = [
    {
        "id" : 0,
        "name" : "Kira",
        "age" : 11,
        "hobbies" : ["Math", "Knitting", "Coding"]
    }
]

@app.route('/')
def all_pages():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/add')
def add_user_page():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/users', methods=['GET'])
def get_users():
    return users

@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    age = data.get('age')
    hobbies = data.get('hobbies', "").split(',')
    
    # Add the new user to the users list
    users.append({
        'id': len(users),
        'name': name,
        'age': age,
        'hobbies': [hobby.strip() for hobby in hobbies]
    })
    return users

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    for user in users:
        if user["id"] == user_id:
            return user
        
    return {"error": "User not found"}, 404

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    name = data.get('name')
    age = data.get('age')
    hobbies = data.get('hobbies', "").split(',')

    user_to_update = next((user for user in users if user["id"] == user_id), None)

    if not user_to_update:
        return {"error": "User not found"}, 404
    
    if name:
        user_to_update['name'] = name
    if age:
        user_to_update['age'] = age
    if hobbies:
        user_to_update['hobbies'] = [hobby.strip() for hobby in hobbies]
    
    return user_to_update

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    users = [user for user in users if user["id"] != user_id]
    return users

if __name__ == '__main__':
    app.run(debug=True)