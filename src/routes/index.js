const groupRouter = require('./group.route');
const studentRouter = require('./student.route');
const examRouter = require('./exam.route');
const examapplyRouter = require('./examapply.route');
const examresultRouter = require('./examresult.route');
const usergroupRouter = require('./usergroup.route');

module.exports = [
    groupRouter,
    studentRouter,
    examRouter,
    examapplyRouter,
    examresultRouter,
    usergroupRouter,
]