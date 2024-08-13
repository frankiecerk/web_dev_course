from flask import Flask, request, send_from_directory

app = Flask(__name__)

# Initialize a list to store users
users = [
    {
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
    return {"users" : users}

@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    age = data.get('age')
    hobbies = data.get('hobbies', "").split(',')
    
    # Add the new user to the users list
    users.append({
        'name': name,
        'age': age,
        'hobbies': [hobby.strip() for hobby in hobbies]
    })
    return {"users": users}

if __name__ == '__main__':
    app.run(debug=True)