const mongoose  = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: { type: String },
  status: { type: String, enum: ['Not started', 'In proress', 'Completed'] },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}
});

module.exports = mongoose.model('Project', ProjectSchema);