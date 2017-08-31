/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { getUsers, getUserData, addUserDataFromSlack } = require('../repositories/user-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'User Repo getUsers (all users)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getUsers).to.exist;
    });

    it('should be a function', () => {
      expect(getUsers).is.a('function');
    });

    it('should return an array', () => {
      getUsers().then((result) => {
        expect(result).to.be.an('array');
      });
    });

    it('should return an array with correct users', () => {
      getUsers().then((result) => {
        expect(result).to.deep.equal([
          {
            user_id: 'U6FMJ3J3Z',
            user_name: 'dave.gallup',
            real_name: 'Dave Gallup',
            first_name: 'Dave',
            last_name: 'Gallup',
            status_emoji: ':slack:',
            image_24:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            image_512:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
          },
          {
            user_id: 'U6KESJ1BN',
            user_name: 'meghanprestemon',
            real_name: 'Meghan Prestemon',
            first_name: 'Meghan',
            last_name: 'Prestemon',
            status_emoji: ':slack:',
            image_24:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            image_512:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
          },
          {
            user_id: 'U6T3VM814',
            user_name: 'tylerlangenbrunner',
            real_name: 'Tyler Langenbrunner',
            first_name: 'Tyler',
            last_name: 'Langenbrunner',
            status_emoji: ':slack:',
            image_24:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            image_512:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
          },
          {
            user_id: 'U6SPRFYLX',
            user_name: 'kurtishouser',
            real_name: 'Kurtis Houser',
            first_name: 'Kurtis',
            last_name: 'Houser',
            status_emoji: ':slack:',
            image_24:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            image_512:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
          },
          {
            user_id: 'U6SHV2R5L',
            user_name: 'johanbmk',
            real_name: 'Johan Brattemark',
            first_name: 'Johan',
            last_name: 'Brattemark',
            status_emoji: ':slack:',
            image_24:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            image_512:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
          },
        ]);
      });
    });
  }),
);

describe(
  'User Repo getUserData (one user)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getUserData).to.exist;
    });

    it('should be a function', () => {
      expect(getUserData).is.a('function');
    });

    it('should return an array', () => {
      getUserData('U6SHV2R5L').then((result) => {
        expect(result).to.be.an('array');
      });
    });

    it('should return an array with correct user', () => {
      getUserData('U6SHV2R5L').then((result) => {
        expect(result).to.deep.equal([{ user_name: 'johanbmk' }]);
      });
    });
  }),
);

describe(
  'User Repo addUserDataFromSlack (all users)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(addUserDataFromSlack).to.exist;
    });

    it('should be a function', () => {
      expect(addUserDataFromSlack).is.a('function');
    });
  }),
);
