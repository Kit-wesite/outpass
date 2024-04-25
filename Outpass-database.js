const mongoose=require('mongoose')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const {User,Student}=require('./schema-mongo')
// const User=require('./schema-mongo')

const app=express()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('img'));


main()
async function main()
{
    await mongoose.connect("mongodb://localhost:27017/Outpass")
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html','html-home.html'));
});

app.get('/StaffLogin', (req, res) => {
    res.sendFile(path.join(__dirname,'html', 'html-staff-login.html'));
});

app.get('/StudentLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'html-student-login.html'));
});

app.get('/SecurityLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'html-security-login.html'));
});

app.get('/AdminLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'html-admin-login.html'));
});

app.get('/LoginRegister', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'html-login-register.html'));
});

app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'html-register.html'));
});
app.post('/Register', async (req, res) => {
    try {
        console.log("vanthuten")
        const { student_name, department, year,purpose_of_outpass,parent_conduct_number,from_date,to_date } = req.body;
        const newstu = new Student({
            student_name,
            department,
            year,
            purpose_of_outpass,
            parent_conduct_number,
            from_date,
            to_date
        });
       
        const saved=await newstu.save().then(console.log("saved"));
        res.redirect('/');
       
         
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });

        
    }
});
const PORT = process.env.PORT || 5100;
app.listen(PORT);