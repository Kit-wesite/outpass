const mongoose = require('mongoose');

const schemaStruct = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email_id: String,
    create_password: String,
    re_password: String,
});

const outpassSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true
    },
    register_number: String,
    department: String,
    year: String,
    purpose_of_outpass: String,
    parent_conduct_number: String,
    from_date: String,
    to_date: String
});

const Student = mongoose.model("Student", outpassSchema);
const User = mongoose.model("user", schemaStruct);

module.exports = { Student, User };