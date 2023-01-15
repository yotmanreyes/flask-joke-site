from flask import Flask, render_template

app = Flask(__name__, static_url_path='', static_folder='src')

@app.route("/")
def home(): 
    return render_template("index.html")

