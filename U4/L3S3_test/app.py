from flask import Flask, request, send_from_directory

app = Flask(__name__, static_folder='./react_app/build', static_url_path='/')

# Initialize a list to store users
users = [
    {
        "id" : 0,
        "name" : "Kira",
        "age" : 11,
        "hobbies" : ["Math", "Knitting", "Coding"]
    }
]

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def all_pages(path):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    print("Running app.py")
    app.run(debug=True)