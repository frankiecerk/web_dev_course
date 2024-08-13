from flask import Flask, send_from_directory, request

app = Flask(__name__)
# Initialize a list to store names
letters = []

@app.route('/api/letters', methods=['GET'])
def get_letters():
    return {"letters": letters}

@app.route('/api/letters', methods=['POST'])
def add_letter():
    letter = request.json.get('letter')
    letters.append(letter)
    return {"letters": letters}

@app.route("/")
def home():
	return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)