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
    ```
  - Linux/macOS  
    ```shell
    export FLASK_APP=csaptitude
    ```
  
* Create an Sqlite database  
  ```
  flask initdb
  ```

* Launch the webapp locally  
  `python ./run.py`

* Run the application in debug mode (in Windows)  
  ```batch
  SET FLASK_APP=csaptitude
  SET FLASK_DEBUG=1
  python -m flask run
  ```

* Run the application in debug mode (in Linux/macOS)  
  ```shell
  export FLASK_APP=csaptitude
  export FLASK_DEBUG=1
  python -m flask run
  ```

* Run publicly for development on the standard port (in Windows)  
  ```batch
  SET FLASK_APP=csaptitude
  SET FLASK_DEBUG=0
  flask run --host=0.0.0.0 -p 80
  ```