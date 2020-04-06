from os import path

def get_resource_path(p):
    return path.join(path.abspath(path.dirname(__file__)), p)
