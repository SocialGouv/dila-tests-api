# DILA API Tests

## Install

You need Python 3.6+

```sh
$ mkvirtualenv dila-api-tests
$ pip3 install -r requirements.txt
$ cp .env.sample .env
```

then fill .env secret values.

You need to have an account on [PISTE AIFE](https://developer.aife.economie.gouv.fr), and to have been given access to the DILA API.

You can then create an application [here](https://developer.aife.economie.gouv.fr/apps) with the required API, and then open it and generate OAuth identifiers

## Run

```sh
$ python3 run.py
```
