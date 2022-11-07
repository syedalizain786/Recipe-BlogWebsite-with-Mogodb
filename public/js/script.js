let addIngredientsBtn=document.getElementById("addIngredientsBtn");
let ingredientList=document.querySelector(".ingredientList");

let delBtn=document.querySelector(".deletebtn");

let ingredientDiv=document.querySelectorAll(".ingredientDiv")[0];

addIngredientsBtn.addEventListener("click",()=>{
    let newIngredients= ingredientDiv.cloneNode(true);
    let input=newIngredients.getElementsByTagName("input")[0];
    input.value="";
    ingredientList.appendChild(newIngredients);
});


delBtn.addEventListener("click",  ()=>{
    console.log("dowjdo");
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
        // fetch("http://localhost:3000/recipe/" + id, {
        //   method: 'DELETE'
        // }).then(() => {
        //    console.log('removed');
        // }).catch(err => {
        //   console.error(err)
        // });
})

// function myFunction() {
//     // document.getElementById("demo").style.color = "red";
//     var url = window.location.pathname;
//     var id = url.substring(url.lastIndexOf('/') + 1);
//     // console.log(id);


//         fetch(`http://localhost:3000/recipe/${id}`, {
//           method: 'DELETE'
//         }).then(() => {
//            console.log('removed');
//         }).catch(err => {
//           console.error(err)
//         });

//         window.location.reload();
//         document.location.href="/";

//   }