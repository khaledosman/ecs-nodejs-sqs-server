# ECS-NodeJS-server

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/)

## Setup

- Setup your aws credentials and aws profile using `aws configure --profile <aws profile>`
- `npm install`
- use `yarn start` to run in offline mode`
- `yarn deploy:dev` to deploy dev environment
- `yarn deploy:live` to deploy to live

## Environment variables

Environment variables can be setup in `.env` file

## Deploying

- Install and setup your aws cli with an aws profile using `aws config --profile=<aws profile>`
- use `yarn deploy:dev` or `yarn deploy:live` to build and deploy Docker images to amazon ECR and force a new deployment and start a new service running on the ECS cluster with the new docker image. ECS will then take care of drowning the old service to match the configured desired number of running tasks.

## Releasing

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release), [commitizen](https://github.com/commitizen/cz-cli), [commitlint](http://commitlint.js.org), [husky](https://github.com/typicode/husky) and [conventional commits](https://conventionalcommits.org/en/v1.0.0-beta.4/) in order to automate the release proccess

### Setup/Prequisites

1. The user needs to have a `GH_TOKEN` environment variable set with a valid git token that has push access to the repository which can be generated following these [steps](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
2. the token can be added into a `~/.bash_profile` to avoid manually setting it before running the command.
3. The script should be run from the release branch only (default: master) otherwise it will fail. To change the release branch you can edit the "release" section in the `package.json` file to temporarily set the release branch as follows
  
```js
"release": {
  ...
  "branch": "feature/integrate-semantic-release"
  ...
}
```

### Usage

- `yarn commit` will run commitizen cli to generate a conventional style commit message
- `yarn release` will do a dry-run of the release without pushing or changing any files
- `yarn release --no-ci` will do a real release.
We could potentially use this to automate releases when new commits/PRs land in the master branch
Details

### A release will

- Bump the version in `package.json` according to semantic versioning (semver) based on the changes/commit messages (fix/perf = patch, feat = minor, breaking = major)
- Create a git tag
- Generate a CHANGELOG.md with the latest changes since the last release
- Push the changes to the repository & create a git release
