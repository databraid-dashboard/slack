/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { getUsersData, getUserData } = require('../repositories/user-repository');
const { addDatabaseHooks } = require('./utils');

describe('User Repo getUsersData (all users)', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(getUsersData).to.exist;
  });

  it('should be a function', () => {
    expect(getUsersData).is.a('function');
  });

  it('should return an array', () => {
    getUsersData()
      .then((result) => {
        expect(result).to.be.an('array');
      });
  });

  it('should return an array with correct users', () => {
    getUsersData()
      .then((result) => {
        expect(result).to.deep.equal([{ user_name: '@gillyhopkins' }, { user_name: '@bojangles' }, { user_name: '@colonelforbin' }, { user_name: '@dave.gallup' }, { user_name: '@meghanprestemon' }]);
      });
  });
}));

describe('User Repo getUserData (one user)', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(getUserData).to.exist;
  });

  it('should be a function', () => {
    expect(getUserData).is.a('function');
  });

  it('should return an array', () => {
    getUserData('a324968f')
      .then((result) => {
        expect(result).to.be.an('array');
      });
  });

  it('should return an array with correct user', () => {
    getUserData('a324968f')
      .then((result) => {
        expect(result).to.deep.equal([{ user_name: '@gillyhopkins' }]);
      });
  });
}));

describe('User Repo fetchUserDataFromSlack', addDatabaseHooks(() => {
  it('should be a function', () => {
    expect(getUserData).is.a('function');
  });
}));
