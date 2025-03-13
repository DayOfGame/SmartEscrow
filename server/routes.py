from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

DATABASE_URL = os.environ.get('DATABASE_URL')

@app.route('/')
def home():
    return jsonify({"message": "Welcome to our API!"})

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"data": "This could be data from a database or any source."}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.json
    return jsonify({"message": "Data received", "yourData": data}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))