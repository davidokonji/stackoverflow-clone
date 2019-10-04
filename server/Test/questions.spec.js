import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import usermocks from './mocks/user-mock';
import questionmocks from './mocks/question-mock';
import prepareDb from './helpers/prepareDb';

chai.use(chaiHttp);

let validToken = '';
let invalidToken = 'gsudgsudgsoudgsdousgduosgd';
let questionId = '';

describe('Questions', () => {
  before(async () => {
    await prepareDb('user');
    await prepareDb('question');
    const user = await chai
    .request(app)
    .post('/api/auth/signup')
    .send(usermocks.validUserReg);

    validToken = user.body.data.token;
  });

  describe('Create Question', () => {
    it('should create a question successfully', async () => {
      const res = await chai
      .request(app)
      .post('/api/question')
      .set({
        Authorization: `Bearer ${validToken}`
      })
      .send(questionmocks.validQuestion);

      questionId = res.body.data._id;
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
  
  describe('Get all Questions', () => {
    it('should return all questions', async () => {
      const res = await chai
      .request(app)
      .get('/api/question');
  
      expect(res).to.have.status(200);
    });
  });

  describe('Get a Question', () => {
    it('should return a question', async () => {
      const res = await chai
      .request(app)
      .get(`/api/question/${questionId}`);

      expect(res).to.have.status(200);
    });

    it('should return 400 when invalid question id passed', async () => {
      const res = await chai
      .request(app)
      .get('/api/question/12345');
      expect(res).to.have.status(400);
    });

    it('should return 404 when question not found', async () => {
      const res = await chai
      .request(app)
      .get(`/api/question/5d977db25d8f3d1af4d46473`);
      
      expect(res).to.have.status(404);
    });
  });

  describe('Upvote Question', () => {
    it('should return a upvoted question', async () => {
      const res = await chai
      .request(app)
      .put(`/api/question/${questionId}/upvote`)
      .set({
        Authorization: `Bearer ${validToken}`
      });

      expect(res).to.have.status(200);
      expect(res.body.data.vote).to.equal(1);
    });
  });

   describe('Downvote Question', () => {
    it('should return a downvoted question', async () => {
      const res = await chai
      .request(app)
      .put(`/api/question/${questionId}/downvote`)
      .set({
        Authorization: `Bearer ${validToken}`
      });

      expect(res).to.have.status(200);
      expect(res.body.data.vote).to.equal(0);
    });
  });
});
