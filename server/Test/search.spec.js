import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

describe('Search Question, User, Response', () => {
  it('should return 200 when search complete', async () => {
    const res = await chai.request(app)
      .post('/api/search')
      .query({ query: 'test'});

      expect(res).to.have.status(200);
      expect(res.body.data.users).to.have.lengthOf(1);
      expect(res.body.data.questions).to.have.lengthOf(1);
      expect(res.body.data.responses).to.have.lengthOf(1);
  });
});

