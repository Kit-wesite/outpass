window.addEventListener('DOMContentLoaded', (event) => {
    const submitButton = document.getElementById('sub');
    submitButton.addEventListener('click', function() {
        sth(); 
    });
});

function sth() {
    var name_val= document.getElementById("name_val").value;
    var rno_val = document.getElementById("rno_val").value;
    var dept_val = document.getElementById("dept_val").value;
    var year_val = document.getElementById("year_val").value;
    var purpose_val= document.getElementById("purpose_val").value;
    var parent_pno_val= document.getElementById("parent_pno_val").value;
    var from_date_val= document.getElementById("from_date_val").value;
    var to_date_val= document.getElementById("to_date_val").value;

    if (name_val && rno_val && dept_val && year_val && parent_pno_val && purpose_val && from_date_val && to_date_val) 
        alert("Sent To HOD");
    
}
