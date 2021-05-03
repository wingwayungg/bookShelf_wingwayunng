# Web Developer Coding Exercise
Hi there! This is my trial solution for the coding challenge (there will be updates in the future).

The languages I used is 
* Frontend: React
* Backend: Django

## Points to note
This application is not prefect. There are some points remain to be fixed.
* (Major) Error occurs when user create book with ISBN, which already exists.
* (Minor) The navigation tab on the top has UI problems.
* (Minor) When user click edit button on the table on Book List page, and immediately return to Book List page by clicking "Book List" tab, and then click "Create Book" tab, the fields are non-empty.

## Setup
1. Clone this repo and change to the project directory 
2. Set up a virtual environment
```
# Create a virtual environment to isolate our package dependencies locally
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install Django and Django REST framework into the virtual environment
pip install django
pip install djangorestframework

# Install additional libraries, whcih is useful to build specific django functions
pip install django-background-tasks
```
3. Install frontend packages
```
cd frontend
npm install
```

4. Build the frontend
```
npm run build //For dev use npm run dev
```

5. Change back to the main project directory, and then create an initial migration
```
cd ..
python manage.py makemigrations
python manage.py migrate
```

6. Run the server, and go to http://127.0.0.1:8000/ 
```
python manage.py runserver
```