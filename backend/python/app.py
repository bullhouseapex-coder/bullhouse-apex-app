import MetaTrader5 as mt5
from flask import Flask, jsonify, session, request

app = Flask(__name__)
app.secret_key = "ajlsdjkflas"


login = 5046481737
password = "1iMfWz_z"
server = "MetaQuotes-Demo"

# Test login
@app.route("/login", methods=["GET"])
def login():

    if not mt5.initialize():
        return jsonify({"error": "Initialization Failed"})
    
    authorized = mt5.login(login, password, server)

    if not authorized: 
        return jsonify({"error": "Login Failed"})
        
    return jsonify({"success": "Login Successful"})





    

