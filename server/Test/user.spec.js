import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import usermocks from './mocks/user-mock';
import '../config/db';
import prepareDb from './helpers/prepareUser';

chai.use(chaiHttp);

describe('User Authentications', function () {

  before(async () => {
    await prepareDb('user');
  });
  describe('User Registration', () => {
    it('should create a user successfully', async () => {
      const res = await chai
      .request(app)
      .post('/api/auth/signup')
      .send(usermocks.validUserReg);
  
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal('Successfully Registered User');
    });
  
    it('should return error when not all required fields complete', async () => {
      const res = await chai.
      request(app)
      .post('/api/auth/signup')
      .send(usermocks.invalidUserReg);
  
      expect(res).to.have.status(422);
    });  
  });

  describe('User Signin', () => {
    it('should login a registered user using email', async () => {
      const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send(usermocks.validEmailLogin);
  
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal(`Welcome Back ${usermocks.validUserReg.username}`);    
    });
  
    it('should login a registered user using username', async () => {
      const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send(usermocks.validUsernameLogin);
  
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal(`Welcome Back ${usermocks.validUserReg.username}`);    
    });
  
    it('should return 401 for incorrect login details', async () => {
      const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send(usermocks.invalidLogin);
  
      expect(res).to.have.status(401);
      expect(res.body.message).to.equal('Invalid Credentials');    
    });
  
    it('should return 422 for incorrect login email', async () => {
      const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send(usermocks.invalidLoginEmail);
  
      expect(res).to.have.status(422); 
    });
  });
});
