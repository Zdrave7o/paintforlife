from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

orders = []
@app.route('/')
def index():
    return "Welcome to the Paint for Life API!"

@app.route('/submit-order', methods=['POST'])   
def submit_order():
    data = request.get_json()
    orders.append(data)
    print(f"Order received: {data}")
    return jsonify({"message": "Order submitted successfully"}), 201    

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders)  




if __name__ == '__main__':  
    app.run(debug=True)
