const Exam = require('./Exam.model');
const ExamApply = require('./ExamApply.model');
const ExamResult = require('./ExamResult.model');
const Student = require('./Student.model');
const Group = require('./Group.model');
const UserGroup = require('./UserGroup.model');


Student.hasMany(UserGroup, {foreignKey: {name: 'student_id', allowNull: false}});
UserGroup.belongsTo(Student, {foreignKey: {name: 'student_id', allowNull: false}});

Group.hasMany(UserGroup, {foreignKey: {name: 'group_id', allowNull: false}});
UserGroup.belongsTo(Group, {foreignKey: {name: 'group_id', allowNull: false}});

Group.hasOne(Exam, {foreignKey: {name: 'group_id', allowNull: false}});
Exam.belongsTo(Group, {foreignKey: {name: 'group_id', allowNull: false}});

Student.hasOne(ExamApply, {foreignKey: {name: 'student_id', allowNull: false}});
ExamApply.belongsTo(Student, {foreignKey: {name: 'student_id', allowNull: false}});

Exam.hasOne(ExamApply, {foreignKey: {name: 'exam_id', allowNull: false}});
ExamApply.belongsTo(Exam, {foreignKey: {name: 'exam_id', allowNull: false}});

// Student.hasOne(ExamResult, {foreignKey: {name: 'student_id', allowNull: false}});
// ExamResult.belongsTo(Student, {foreignKey: {name: 'student_id', allowNull: false}});

ExamApply.hasOne(ExamResult, {foreignKey: {name: 'examapply_id', allowNull: false}});
ExamResult.belongsTo(ExamApply, {foreignKey: {name: 'examapply_id', allowNull: false}});