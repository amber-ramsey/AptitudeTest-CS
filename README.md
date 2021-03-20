CS Aptitude
================

A Python 3 Flask web app for logging responses to the [Computer-Programming Aptitude Test](https://www.kent.ac.uk/ces/tests/computer-test.html) by the University of Kent. Currently, the site requires a student login and store the results in a SQLite Database.

## Setup for Web Development

Currently the app supports use with both Python 3.

* Install [Python 3](https://www.python.org/downloads/).

* Install dependencies  
  `pip install -r requirements.txt`

* Set environment variables.
  - Windows  
    ```batch
    SET FLASK_APP=csaptitude
    SET APP_SETTINGS=config.DevelopmentConfig
    ```

  - Linux/macOS  
    ```shell
    export FLASK_APP=csaptitude
    export APP_SETTINGS=config.DevelopmentConfig
    ```
  
* Create and setup database (will be Sqlite for dev and Postgres for production)
  ```
  python manage.py db upgrade
  ```

* Launch the webapp locally  
  `python ./run.py`

* Run the application
  - In debug mode for development (in Windows)  
    ```batch
    SET FLASK_ENV=development
    SET APP_SETTINGS=config.DevelopmentConfig
    python run.py
    ```

  - In debug mode for development (in Linux/macOS)  
    ```shell
    export FLASK_ENV=development
    export APP_SETTINGS=config.DevelopmentConfig
    python run.py
    ```

  - For development on the standard port (in Windows)  
    ```batch
    SET FLASK_APP=csaptitude
    SET APP_SETTINGS=config.DevelopmentConfig
    flask run --host=0.0.0.0 -p 80
    ```

  - For **production** on the standard port (in Linux/macOS)  
    ```shell
    export FLASK_APP=csaptitude
    export FLASK_ENV=production
    export APP_SETTINGS=config.ProductionConfig
    export DATABASE_URL=postgres://$(whoami)
    flask run --host=0.0.0.0 -p 80
    ```

## Deploy to Heroku

1.  Install the [Heroku Command Line Interface](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) and [Create the heroku app](https://devcenter.heroku.com/articles/creating-apps).
2.  Set the APP_SETTINGS environment variable.  
    ```shell
    heroku config:set APP_SETTINGS=config.ProductionConfig
    ```
3.  Create Postgres database (hobby-dev) is the free tier. Change `csapt` to the name of your Heroku app.  
    ```
    heroku addons:create heroku-postgresql:hobby-dev --app csapt
    ```
4.  View and confirm the APP_SETTINGS and DATABASE_URL are set. Again, change `csapt` to the name of your Heroku app.  
    ```shell
    heroku config --app csapt
    ```
5.  Push repository to heroku.  
    ```shell
    git push heroku
    ```
6.  Apply the migrations to the production database. Again, change `csapt` to the name of your Heroku app.  
    ```shell
    heroku run python manage.py db upgrade --app csapt
    ```

## Export Database Tables from Heroku

This webapp doesn't currently have a way of viewing the stored test results. However, they can be easily exported for offline analysis.

1.  Connect to the Heroku database.  
  ```
  heroku pg:psql
  ```

2.  Run the following SQL command and store it in a local CSV file.  
  ```sql
  \copy (select * from "user") TO 'users.csv' CSV HEADER;
  \copy (select * from "test_result") TO 'test_results.csv' CSV HEADER;
  \copy (select * from "question_response") TO 'question_responses.csv' CSV HEADER;
  ```

3.  Exit the interactive terminal.  
  ```
  \q
  ```