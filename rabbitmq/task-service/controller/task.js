import Task from '../models/task.js';
import { channel } from '../rabbitmq/connection.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({
        message: 'Incomplete Data: title, description, and userId are required',
        data: null,
        success: false,
      });
    }

    const newTask = new Task({ title, description, userId });
    await newTask.save();

    const message = { taskId: newTask._id, userId, title };

    if (!channel) {
      return res.status(503).json({
        message: 'RabbitMQ is not connected to task-service',
        data: null,
        success: false,
      });
    }

    channel.sendToQueue('task-created', Buffer.from(JSON.stringify(message)));

    return res.status(201).json({
      message: 'Successfully created task',
      data: newTask,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error Creating Task',
      data: error.message,
      success: false,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      message: 'Successfully fetched tasks',
      data: tasks,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching tasks',
      data: error.message,
      success: false,
    });
  }
};
