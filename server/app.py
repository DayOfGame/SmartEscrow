from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'This is the about page.'

if __name__ == '__main__':
    port = os.getenv('PORT', 5000)
    
    app.run(debug=True, host='0.0.0.0', port=port)