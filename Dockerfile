FROM idbentley/flask-react-dev:latest as base

WORKDIR /var/www
COPY . .

# Install Python Dependencies
RUN ["pip", "install", "-r", "requirements.txt"]


# Build our React App
RUN ["npm", "install", "--prefix", "client"]
ENV REACT_APP_BASE_URL=https://flask-react-aa.herokuapp.com
RUN ["npm", "run", "build", "--prefix", "client"]

# Move our react build for Flask to serve
# Use cp here because we're copying files inside our working directory, not from
# our host machine.
RUN ["cp", "-r", "client/build/", "starter_app/static"]

# Setup Flask environment
ENV FLASK_APP=starter_app
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

# Run flask environment
CMD gunicorn starter_app:app
