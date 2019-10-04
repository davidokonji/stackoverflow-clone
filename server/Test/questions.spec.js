import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import usermocks from './mocks/user-mock';
import questionmocks from './mocks/question-mock';
import prepareUser from './helpers/prepareUser';

chai.use(chaiHttp);

let validToken = '';
let invalidToken = 'gsudgsudgsoudgsdousgduosgd';

describe('Questions', () => {
  before(async () => {
    await prepareUser();
    const user = await chai
    .request(app)
    .post('/api/auth/signup')
    .send(usermocks.validUserReg);

    validToken = user.body.data.token;
  })
  it('should create a question successfully', async () => {
    const res = await chai
    .request(app)
    .post('/api/question')
    .set({
      Authorization: `Bearer ${validToken}`
    })
    .send(questionmocks.validQuestion);

    expect(res).to.have.status(201);
  });

  it('should return 422 for invalid question entries', async () => {
    const res = await chai
    .request(app)
    .post('/api/question')
    .set({
      Authorization: `Bearer ${validToken}`
    })
    .send(questionmocks.invalidQuestion);

    expect(res).to.have.status(422);
  });

  it('should return 401 when header not set', async () => {
    const res = await chai
    .request(app)
    .post('/api/question')
    .send(questionmocks.invalidQuestion);

    expect(res).to.have.status(401);
  });

  it('should return 401 when invalid token sent', async () => {
    const res = await chai
    .request(app)
    .post('/api/question')
    .send(questionmocks.invalidQuestion)
    .set({
      Authorization: `Bearer ${invalidToken}`
    });

    expect(res).to.have.status(401);
  });
});
