from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

ENV_DATABASE_URL = os.environ.get('DATABASE_URL')

@app.route('/')
def welcome():
    return jsonify({"message": "Welcome to our SmartEscrow API!"})

@app.route('/api/data', methods=['GET'])
def fetch_data():
    example_data = {"data": "This could be data fetched from a database or another source."}
    return jsonify(example_data)

@app.route('/api/data', methods=['POST'])
def receive_data():
    submitted_data = request.json
    return jsonify({"message": "Data successfully received", "receivedData": submitted_data}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))