from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data
companies = [
    {"name": "TechCorp", "query": "Looking for ideas on energy efficiency."},
    {"name": "HealthInc", "query": "Looking for innovative health tracking."},
    {"name": "TechCorp", "query": "Looking for ideas on energy efficiency."},
    {"name": "HealthInc", "query": "Looking for innovative health tracking."},
    {"name": "TechCorp", "query": "Looking for ideas on energy efficiency."},
    {"name": "HealthInc", "query": "Looking for innovative health tracking."},
]

ideas = []  # This will store submitted ideas
users = []  # This will store registered users
company_members = []  # This will store registered company members
queries = []# This will store submitted queries
solutions = []

# Route for the home page
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/user_register', methods=['GET', 'POST'])
def user_register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

        # Simulate user registration
        user = {"name": name, "email": email, "password": password}
        users.append(user)  # Store user details in the users list
        print(f"Registered User: {user}")

        # After registration, redirect to the main user page
        return redirect(url_for('main_page'))

    return render_template('user_register.html')

@app.route('/company_register', methods=['GET', 'POST'])
def company_register():
    if request.method == 'POST':
        company_name = request.form.get('company_name')
        email = request.form.get('email')
        password = request.form.get('password')

        # Simulate company registration
        company_member = {"company_name": company_name, "email": email, "password": password}
        company_members.append(company_member)  # Store company member details
        print(f"Registered Company Member: {company_member}")

        # After registration, redirect to the company page
        return redirect(url_for('company_page'))

    return render_template('company_register.html')

@app.route('/company')
def company_page():
    return render_template('company.html')  # Make sure this template exists

# Route for the main user page
@app.route('/main')
def main_page():
    return render_template('1.html')

@app.route('/incubator_register')
def incubator_register():
    return render_template('incubation.html')

@app.route('/get_started')
def get_started():
    return render_template('front.html')

# Route to get companies
@app.route('/companies', methods=['GET'])
def get_companies():
    return jsonify(companies)

# Route to submit ideas
@app.route('/ideas', methods=['POST'])
def submit_idea():
    data = request.json
    ideas.append(data)  # Store the submitted idea
    print(f"Received Idea: {data}")  # Log the received data
    return jsonify({"message": "Idea submitted successfully!"}), 201

# Route to get all ideas
@app.route('/api/ideas', methods=['GET'])
def get_ideas():
    return jsonify(ideas)

# Route to get all registered users
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

# Route to get all registered company members
@app.route('/api/company_members', methods=['GET'])
def get_company_members():
    return jsonify(company_members)

@app.route('/queries', methods=['POST'])
def submit_query():
    data = request.get_json()
    query = data.get('query')

    if query:
        queries.append({'query': query})
        print(f"Received Query: {query}")
        return jsonify({"message": "Query submitted successfully!"}), 201
    else:
        return jsonify({"error": "Invalid query data"}), 400

@app.route('/api/queries', methods=['GET'])
def get_queries():
    return jsonify(queries)

# Route to submit solutions (if you want to add a solution feature later)
@app.route('/solutions', methods=['POST'])
def submit_solution():
    data = request.json
    solutions.append(data)  # Store the submitted solution
    print(f"Received Solution: {data}")  # Log the received data
    print(f"Current Solutions List: {solutions}")  # Log the entire solutions list for debugging
    return jsonify({"message": "Solution submitted successfully!"}), 201


@app.route('/api/solutions', methods=['GET'])
def get_solutions():
    return jsonify(solutions)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
