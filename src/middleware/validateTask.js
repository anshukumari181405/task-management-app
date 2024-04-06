
function validateTask(req, res, next) {
    const { title, description, dueDate, priority, status } = req.body;
    if (!title || !dueDate || !priority || !status) {
      return res.status(400).json({ message: 'Title, due date, priority, and status are required.' });
    }
    next();
  }
  
  module.exports = validateTask;
  