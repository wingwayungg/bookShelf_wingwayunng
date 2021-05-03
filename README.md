# Genesis Cloud Challenge
Hi there! This is my trial solution for the coding challenge (there will be updates in the future).

The languages I used is 
* Frontend: React
* Backend: Django

## Points to note
* There are restrictions on my account, that only 2 instances could be created to be active.
* The link on https://developers.genesiscloud.com/examples is wrong(it should be )

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

<!-- # Install additional libraries, whcih is useful to build specific django functions
pip install django-background-tasks
pip install requests -->
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
python manage.py makemigrations
python manage.py migrate
```

6. Run the server, and go to http://127.0.0.1:8000/ 
```
python manage.py runserver
```