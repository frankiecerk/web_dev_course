from flask import Flask, request, send_from_directory

app = Flask(__name__)

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
def home():
    return send_from_directory('static', 'index.html')

@app.route('/add')
def add_user_page():
    return send_from_directory('static', 'add.html')


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
    # Find the user with the specified ID  
    for user in users:
        if user["id"] == user_id:
            return user
        
    # If the user is not found, return a 404 erroR
    return {"error": "User not found"}, 404


@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    name = data.get('name')
    age = data.get('age')
    hobbies = data.get('hobbies', "").split(',')

    # Find the user with the specified ID
    userToUpdate = None
    for user in users:
        if user["id"] == user_id:
            userToUpdate = user

    # If the user is not found, return a 404 error
    if userToUpdate is None:
        return {"error": "User not found"}, 404
    
    # Update the user's data
    if name:
        userToUpdate['name'] = name
    if age:
        userToUpdate['age'] = age
    if hobbies:
        userToUpdate['hobbies'] = [hobby.strip() for hobby in hobbies]
    
    return userToUpdate

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id): 
    # Find the user with the specified ID
    userToDelete = None  
    for user in users:
        if user["id"] == user_id:
            userToDelete = user

    # If the user is not found, return a 404 error 
    if userToDelete == None:
        return {"error": "User not found"}, 404

    users.remove(userToDelete)

    return users

if __name__ == '__main__':
    app.run(debug=True)