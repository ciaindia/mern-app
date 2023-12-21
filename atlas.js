const conn_str = "mongodb+srv://mern:mern@cluster0.dslyw.mongodb.net/zcompany?retryWrites=true&w=majority";
const mongoose = require("mongoose");

mongoose.connect(conn_str)
.then(() => console.log("Connected successfully..."))
.catch( (error) => console.log(error) );


const express = require("express");
const app = express();
app.use(express.json());

const empSchema = new mongoose.Schema(    {
    name: String,
    contact_number: String,
    address: String,
    salary: Number,
    employee_id: Number,
    role: String
});

const emp = new mongoose.model("emps", empSchema);

var cors = require('cors')
app.use(cors())

app.get("/employees", async (req, res) => {
    // var data = [{name: "hari", salary: 25000}, {name: "sameer", salary: 23000}]
    let data = await emp.find();
    res.send(data)
})

//fetch single document by id
//http://localhost:8989/employees/657d397eea713389134d1ffa

app.get("/employees/:id", async (req, res) => {
    // console.log(req.params)
    let data = await emp.find({_id: req.params['id']});
    res.send(data[0])
})

//update document by id
app.put("/employees", async (req, res) => {

	let u_data = await emp.updateOne({"_id": req.body.id}, {
		"$set": {
			"name" : req.body.name,
			"salary" : req.body.salary,
		}
	});
	
	res.send(u_data);

})


//http://localhost:8989/employees?id=657d397eea713389134d1ffe
app.delete("/employees", async (req, res) => {
    let d_data = await emp.deleteOne({"_id": req.query['id']});
	res.send(d_data);
})

app.post("/employees", async (req, res) => {

    // doc = {
    //     "name":"harsha newly added",
    //     "contact_number":"9833910512",
    //     "address":"mumbai",
    //     "salary":20000,
    //     "employee_id":98829,
    //     "role":"operations"
    // }

    doc = req.body;

    let u = await emp(doc);
	let result = u.save();
	res.send(doc);

})

app.listen(8989, () => {
	console.log("listening 8989...");
});
