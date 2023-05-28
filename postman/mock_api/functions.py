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