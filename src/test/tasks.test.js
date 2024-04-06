const request = require('supertest');
const app = require('../index');
const Task = require('../model/taskModel');

beforeEach(async () => {
  await Task.deleteMany();
});

describe('Tasks API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'complete History',
        description: 'complete it within 2 weeks.',
        dueDate: '2024-04-10',
        priority: 'Low',
        status: 'InProgess'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Test Task");
  });

  it('should get all tasks', async () => {
    await Task.create({
      title: 'Complete History',
      description: 'complete it within 2 weeks.',
      dueDate: '2024-04-10',
      priority: 'Low',
      status: 'InProgess'
    });
    await Task.create({
      title: 'Complete java',
      description: 'complete it within 2 weeks.',
      dueDate: '2024-04-15',
      priority: 'Medium',
      status: 'InProgress'
    });

    const res = await request(app)
      .get('/api/tasks');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it('should get a task by ID', async () => {
    const task = await Task.create({
      title: 'Complete History',
      description: 'complete it within 2 weeks.',
      dueDate: '2024-04-10',
      priority: 'Low',
      status: 'InProgess'
    });

    const res = await request(app)
      .get(`/api/tasks/${task._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Test Task");
  });

  it('should update a task', async () => {
    const task = await Task.create({
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: '2024-04-10',
      priority: 'High',
      status: 'Pending'
    });

    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send({ 
        title: 'Updated Task',
        description: 'Updated task description',
        dueDate: '2024-04-15',
        priority: 'Medium',
        status: 'InProgress'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Task");
  });

  it('should delete a task', async () => {
    const task = await Task.create({
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: '2024-04-10',
      priority: 'High',
      status: 'Pending'
    });

    const res = await request(app)
      .delete(`/api/tasks/${task._id}`);

    expect(res.statusCode).toEqual(204);
  });
});
