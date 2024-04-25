const mongoose=require('mongoose')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const {Student,User}=require('./schema-mongo')

const app=express()

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('img'));


main()
async function main()
{
    await mongoose.connect("mongodb://localhost:27017/KIT-DATABASE")
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
app.get('/SecurityVerify', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'html-security-verify.html'));
});





app.post('/LoginRegister', async (req, res) => {
    try {
        const { first_name, last_name, email_id, create_password, re_password } = req.body;
        const newUser = new User({
            first_name,
            last_name,
            email_id,
            create_password,
            re_password
        });
        const user = await User.findOne({ email_id });
        if (user) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
           
        }
        else{
        if((create_password===re_password))
        {
        const saved=await newUser.save();
        res.redirect('/StudentLogin');
        }
    }
         
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });

        
    }
});




app.post('/StudentLogin', async (req, res) => {
    try {
        const { student_email, student_password } = req.body;
        const user = await User.findOne({ email_id :student_email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (!(student_password===user.create_password)) {
            res.redirect('/StudentLogin')
        }
        
            res.redirect('/Register')
        
       
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});



//stafflogin

app.post('/StaffLogin',async (req,res)=>{
    try{
        const{staff_email ,staff_password}=req.body;
        if(staff_email==="rajamohamad@gmail.com" && staff_password==="raja@cse")
        res.redirect('/StaffVerify')
    }
    catch(error){
        res.redirect('/StaffLogin')
    }

})
app.post('/SecurityLogin',async (req,res)=>{
    try{
        const{security_email ,security_password}=req.body;
        if(security_email==="Sec@gmail.com" && security_password==="123")
        res.redirect('/SecurityVerify')
    }
    catch(error){
        res.redirect('/SecurityLogin')
    }

})


//login page and login register page completed above




//Outpass:
app.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'html-register.html'));
});

app.post('/Register', async (req, res) => {
    try {
        const { student_name,register_number, department, year,purpose_of_outpass,parent_conduct_number,from_date,to_date } = req.body;
        const newstu = new Student({
            student_name,
            register_number,
            department,
            year,
            purpose_of_outpass,
            parent_conduct_number,
            from_date,
            to_date
        });
       
        await newstu.save(); // Save student information to the database
        
        res.redirect('/');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

app.get('/StaffVerify', async (req, res) => {
    try {
        const students = await Student.find({}).exec();         
        await res.render('StaffVerify', { student: students })
    } catch (err) {

        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = process.env.PORT || 5100;
app.listen(PORT);


