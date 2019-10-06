import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import usermocks from './mocks/auth-mock';
import prepareDb from './helpers/prepareDb';

chai.use(chaiHttp);
let validToken = '';

describe('User', () => {
  before(async () => {
    await prepareDb('user');

    const user = await chai
    .request(app)
    .post('/api/auth/signup')
    .send(usermocks.validUserReg);

    validToken = user.body.data.token;
  });

  describe('User notification', () => {
    it('should fetch notifications successfully', async () => {
      const res = await chai
      .request(app)
      .get('/api/user/notifications')
      .set({
        Authorization: `Bearer ${validToken}`
      });

      expect(res).to.have.status(200);
    });
  });
});