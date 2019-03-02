# Contributing to Talos’ client

Talos’ client follows a certain set of guidelines. This is to ensure that the developers can keep up with the rapid changes towards the beginning of the project, and to be able to maintain certain code standards (and otherwise) further down the line.

## Getting started

- Pull the repository
- Sign up for a [ZenHub](https://www.zenhub.com/) account

## Setup

`cd` into the project

Copy the contents of `env.example` into `.env` like so:

```shell
$ cp .env.example .env
```

### Notes

`REACT_APP_BASE_URL` can be ignored unless you are running the Talos client on macOS, in which case, set it to the external IP address of the Google Cloud Platform (GCP) Virtual Machine (VM)

## Install dependencies

### npm

```shell
$ npm install
```

## Running Talos’ client

### npm

```shell
$ npm start
```

## Making Changes

- Create a topic branch from where you want to base your work
  - This is usually the `master` branch
  - Only target release branches if you are certain your fix must be on that
    branch
  - To quickly create a topic branch based on `master`, run `git checkout -b
    fix/master/my_contribution master`. Please avoid working directly on the
    `master` branch
- Make commits of logical and atomic units and [write a good commit message](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- Talos will mostly always check for these errors, but in case it fails to do so, check for unnecessary whitespace with `git diff --check` before committing
