const app = require('./app');

const mongoose = require('mongoose');

const request = require('supertest');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

let server;

beforeAll(async () => {
  await mongoose
    .connect(DB_HOST)
    .then(() => {
      console.log('Database connect success');
      server = app.listen(PORT, () => {
        console.log('Server running. Use our API on port: 3000');
      });
    })
    .catch(err => {
      console.log(err.message);
      process.exit(1);
    });
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.close();
  console.log('Database disconnect');
});

describe('Database connection', () => {
  it('should connect to the database successfully', done => {
    mongoose.connect(
      DB_HOST,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      err => {
        expect(err).toBeNull();
        done();
      }
    );
  });
});

describe('logIn', () => {
  it('should return a token and user object when valid credentials are provided', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = await request(app)
      .post('/api/users/login')
      .send(req.body)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.user).toEqual({
      email: 'test@example.com',
      subscription: 'starter',
    });
  });

  it('should throw an error when invalid credentials are provided', async () => {
    const req = {
      body: { email: 'test@example.com', password: 'wrongpassword' },
    };
    await request(app)
      .post('/api/users/login')
      .send(req.body)
      .expect(401)
      .expect('Content-Type', /json/)
      .expect({ message: 'Email or password is wrong' });
  });
});
