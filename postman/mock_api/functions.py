def find_index_client_by_id(id, obj):
    for i in range(len(obj)):
        if id == obj[i]["id"]:
            return i
    return None

def find_index_client_by_name(name, obj):
    for i in range(len(obj)):
        print(obj[i]["full_name"])
        if name == obj[i]["full_name"]:
            return i
    return None

def id_exist(id, obj):
    for i in range(len(obj)):
        if id == obj[i]["id"]:
            return True
    return False

def find_client_discount(id, obj):
    for i in range(len(obj)):
        for j in range(len(obj[i]["clients"])):
            if id == obj[i]["clients"][j]:
                return obj[i]["discount"]
    return None