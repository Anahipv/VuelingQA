from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from data_clients import data_clients
from data_supply_point import data_supply_points
from functions import find_index_client_by_id, find_index_client_by_name, id_exist

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/clients", methods = ["GET"])
def get_clients():
    data_dict = data_clients
    resp = jsonify(data_dict)
    return resp

@app.route("/clients/<id>", methods = ["GET"])
def get_client_by_id(id):
    data_dict = data_clients
    index = find_index_client_by_id(id, data_dict)
    if index == None:
        abort(404, description="It's a incorrect ID")
    client = data_dict[index]
    resp = jsonify(client)
    return resp

@app.route("/clients/", methods = ["GET"])
def get_client_by_name():
    data_dict = data_clients
    name = request.args.get("name")
    index = find_index_client_by_name(name, data_dict)
    client = data_dict[index]
    resp = jsonify(client)
    return resp

@app.route("/clients", methods = ["POST"])
def create_client():
    full_name = request.json["full_name"]
    address = request.json["address"]
    id = request.json["id"]
    role = request.json["role"]
    building_type = request.json["building_type"]
    new_client = {
            "full_name":full_name,
            "address":address,
            "id":id,
            "role":role,
            "building_type":building_type
        }
    if not id_exist(id, data_clients):
        abort(400, description="The ID already exist")
    data_clients.append(new_client)
    resp = jsonify(new_client)
    return resp

@app.route("/clients/<id>", methods = ["PUT"])
def update_client(id):
    full_name = request.json["full_name"]
    address = request.json["address"]
    id = request.json["id"]
    role = request.json["role"]
    building_type = request.json["building_type"]
    edit_client = {
            "full_name":full_name,
            "address":address,
            "id":id,
            "role":role,
            "building_type":building_type
        }
    index = find_index_client_by_id(id, data_clients)
    if index == None:
        abort(404, description="It's a incorrect ID")
    data_clients[index] = edit_client
    resp = jsonify(data_clients[index])
    return resp

@app.route("/clients/<id>", methods = ["DELETE"])
def delete_client(id):
    index = find_index_client_by_id(id, data_clients)
    if index == None:
        abort(404, description="It's a incorrect ID")
    data_clients.pop(index)
    index = find_index_client_by_id(id, data_supply_points)
    try:
        data_supply_points.pop(index)
    except:
        print(NameError)
    resp = jsonify(data_clients)
    return resp

@app.route("/supplypoints", methods = ["GET"])
def get_supply_points():
    data_dict = data_supply_points
    resp = jsonify(data_dict)
    return resp

@app.route("/supplypoints/<id>", methods = ["GET"])
def get_supply_point(id):
    data_dict = data_supply_points
    index = find_index_client_by_id(id, data_dict)
    if index == None:
        abort(404, description="It's a incorrect ID")
    supply_point = data_dict[index]
    resp = jsonify(supply_point)
    return resp

@app.route("/supplypoints", methods = ["POST"])
def create_supply_point():
    id = request.json["id"]
    tariff = request.json["tariff"]
    invoiced_amount = request.json["invoiced_amount"]
    power = request.json["power"]
    neighbors = request.json["neighbors"]
    new_supply_point = {
            "id":id,
            "tariff":tariff,
            "invoiced_amount":invoiced_amount,
            "power":power,
            "neighbors":neighbors
        }
    if not id_exist(id, data_clients):
        abort(400, description="It is not a valid ID")
    elif id_exist(id, data_supply_points):
        abort(400, description="The ID already exist")
    data_clients.append(new_supply_point)
    resp = jsonify(new_supply_point)
    return resp

@app.route("/supplypoints/<id>", methods = ["PUT"])
def update_supply_points(id):
    id = request.json["id"]
    tariff = request.json["tariff"]
    invoiced_amount = request.json["invoiced_amount"]
    power = request.json["power"]
    neighbors = request.json["neighbors"]
    edit_supply_point = {
            "id":id,
            "tariff":tariff,
            "invoiced_amount":invoiced_amount,
            "power":power,
            "neighbors":neighbors
        }
    index = find_index_client_by_id(id, data_supply_points)
    if index == None:
        abort(404, description="It's a incorrect ID")
    data_clients[index] = edit_supply_point
    resp = jsonify(data_clients[index])
    return resp

@app.route("/supplypoints/<id>", methods = ["DELETE"])
def delete_supply_points(id):
    index = find_index_client_by_id(id, data_clients)
    if index == None:
        abort(404, description="It's a incorrect ID")
    data_clients.pop(index)
    resp = jsonify(data_clients)
    return resp

if __name__ == '__main__':
    app.run(debug=True)


