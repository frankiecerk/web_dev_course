from flask import Flask, jsonify, request, render_template
import os
import json


app = Flask(__name__)
# Initialize a list to store names
names = []
birds = []


@app.route('/api/names', methods=['GET'])
def get_names():
    return jsonify({"names": names})

@app.route('/api/names', methods=['POST'])
def add_name():
    name = request.json.get('name')
    if name:
        names.append(name)
    return jsonify({"names": names})

@app.route('/api/birds', methods=['GET'])
def get_birds():
    return jsonify({"birds": birds})

@app.route('/api/birds', methods=['POST'])
def add_birds():
    bird = request.json.get('bird')
    if bird:
        birds.append(bird)
    return jsonify({"birds": birds})


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/birds')
def birds_page():
    return render_template('birds.html')

if __name__ == '__main__':
    app.run(debug=True)