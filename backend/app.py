from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def get_db():
    return mysql.connector.connect(
        host='127.0.0.1',
        port=15306,
        user='root',
        password='',
        database='school_results'
    )

@app.route('/')
def home():
    return jsonify({"message": "School Results API - Vitess Backend", "status": "running"})

@app.route('/api/schools', methods=['GET'])
def get_schools():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM schools ORDER BY school_id")
    schools = cursor.fetchall()
    conn.close()
    return jsonify(schools)

@app.route('/api/schools/<int:school_id>', methods=['GET'])
def get_school(school_id):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM schools WHERE school_id = %s", (school_id,))
    school = cursor.fetchone()
    conn.close()
    if school:
        return jsonify(school)
    return jsonify({"error": "School not found"}), 404

@app.route('/api/schools', methods=['POST'])
def create_school():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO schools (school_id, school_name, city, total_students) VALUES (%s, %s, %s, %s)",
        (data['school_id'], data['school_name'], data['city'], data['total_students'])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "School created", "school_id": data['school_id']}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
