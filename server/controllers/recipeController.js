require("../models/database");
const { default: mongoose } = require("mongoose");
const Category=require("../models/Category");
const Recipe=require("../models/Recipe");

/**
 * Get /
 * Homepage
 */
exports.homepage=async(req,res)=>{
    
    try {
        const limitNumber=5;
        const categories=await Category.find({}).limit(limitNumber);
        const latest=await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        const thai=await Recipe.find({"category":"Thai"}).sort({_id:-1}).limit(limitNumber);
        const american=await Recipe.find({"category":"American"}).sort({_id:-1}).limit(limitNumber);
        const pakistani=await Recipe.find({"category":"Pakistani"}).sort({_id:-1}).limit(limitNumber);
        
        const food={latest,thai,american,pakistani};
        res.render("index",{title:"Cooking Blog - Home",categories,food});
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }
};

/**
 * Get /categories
 * Catefories
 */
exports.exploreCategories=async(req,res)=>{
    
    try {
        const limitNumber=20;
        const categories=await Category.find({}).limit(limitNumber);
        res.render("categories",{title:"Cooking Blog - Categories",categories});
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }
}
/**
 * Get /categories/:id
 * Categories By Id
 */
 exports.exploreCategoriesById=async(req,res)=>{
    
    try {

        const categoryId=req.params.id;
        const categoryById=await Recipe.find({"category":categoryId});
        res.render("categories",{title:"Cooking Blog - Categories",categoryById});
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }
}


/**
 * Get /recipe/:id
 * Recipe Description
 * exploreRecipes
 */
exports.exploreRecipe=async(req,res)=>{
    
    try {
        
        const recipeID=req.params.id;
        const recipe=await Recipe.findById({_id:recipeID});
        console.log(recipe);
        res.render("recipe",{title:recipe.name,recipe});
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }
}

/**
 * Get /search
 * Search Recipe
 */
exports.searchRecipe=async(req,res)=>{
    
    try {    
        
        const searchTerm=req.body.searchTerm;
        const recipe=await Recipe.find({$text:{$search:searchTerm,$diacriticSensitive:true}});
        res.render("search",{title:"Cooking Blog- Search",recipe});    
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }

}

/**
 * Get /explore-latest
 * Explore Latest
 */
exports.exploreLatest=async(req,res)=>{
    
    try {    
        const recipe=await Recipe.find({}).sort({_id:-1});
        res.render("explore-latest",{title:"Cooking Blog- Explore Latest",recipe});    
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }

}

/**
 * Get /explore-Random
 * Explore Random
 */
exports.exploreRandom=async(req,res)=>{
    
    try {    

        const count=await Recipe.find({}).countDocuments();
        const random=Math.floor(Math.random()*count);
        const recipe=await Recipe.findOne().skip(random).exec();
        res.render("explore-random",{title:"Cooking Blog- Explore Random",recipe});    
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }

}

/**
 * Get /submit-recipe
 * submitRecipe
 */
exports.submitRecipe=async(req,res)=>{
    
    try{     
        const infoErrorObj=req.flash("infoErrors");    
        const infoSubmitObj=req.flash("infoSubmit");    
        res.render("submit-recipe",{title:"Cooking Blog- Submit Recipe",infoErrorObj,infoSubmitObj});    
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }

}

/**
 * Post /submit-recipe
 * submitRecipeOnPost
 */
exports.submitRecipeOnPost=async(req,res)=>{
        try {     
            let imageUploadFile;
            let uploadPath;
            let newImageName;
            if(!req.files || Object.keys(req.files).length ===0 ){
                console.log("Error submitting recipe.");
            }else{
                imageUploadFile=req.files.image;
                newImageName=Date.now() + imageUploadFile.name;
                uploadPath = require("path").resolve("./")+"/public/uploads/"+newImageName;
    
                imageUploadFile.mv(uploadPath,(err)=>{
                    if(err){
                        return res.status(500).send(err);
                    };
                });
            }
            const newRecipe=new Recipe({
                name:req.body.name,
                description:req.body.description,
                email:req.body.email,
                ingredients:req.body.ingredients,
                category:req.body.category,
                image:newImageName
                })
                await newRecipe.save();
            req.flash("infoSubmit","Recipe has been added.")
            res.redirect("/submit-recipe");
        } catch (error) {
            req.flash("inforErrors",error);
            res.redirect("/submit-recipe");
        }
}

/**
 * Delete /
 * deleteRecipe
 */
 exports.deleteRecipeByID=async(req,res)=>{
    
    try{     
        const recipeId=String(req.body.recipeId);
        console.log(req.body.recipeId);
        console.log(req.body);
        await Recipe.deleteOne({id:recipeId});
        res.redirect("/");   
    } catch (error) {
        res.status(500).send({message:error.message || "Error Occurred"});
    }
};








//Update recipe

// async function updateRecipe(){
//     try {
//         const filter={_id:"63654b257dc141e9d521d844"};
//         const update={category:"Pakistani"};
//         const upda=await Recipe.findByIdAndUpdate(
//             filter,
//             update,
//             returnOriginal=false
//             );

//     } catch (error) {
//         console.log(error);
//     }

// }
// updateRecipe();
















// async function insertDummyCategoryData(){
//     try {
//         await Category.insertMany([
//                   {
//                     "name": "Thai",
//                     "image": "thai-food.jpg"
//                   },
//                   {
//                     "name": "American",
//                     "image": "american-food.jpg"
//                   }, 
//                   {
//                     "name": "Chinese",
//                     "image": "chinese-food.jpg"
//                   },
//                   {
//                     "name": "Mexican",
//                     "image": "mexican-food.jpg"
//                   }, 
//                   {
//                     "name": "Indian",
//                     "image": "indian-food.jpg"
//                   },
//                   {
//                     "name": "Spanish",
//                     "image": "spanish-food.jpg"
//                   }
//                 ]);
//     } catch (error) {
//         console.log("err",+error)
//     }
// }

// insertDummyCategoryData();


//Delete Dummy Data

// async function deleteDummyCategoryData(){
//     try {
//         await Category.deleteOne(
            
//                 {
//                     "name":"Thai",
//                     "image":"thai-food.jpg"
//                 },
//                 (err)=>{
//                     if(!err){
//                         console.log("deleted succ")
//                     }
//                 }
            
//         );
//     } catch (error) {
//         console.log("err",+error)
//     }
// }

// deleteDummyCategoryData();


// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Choclate Banoffe",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@ali.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "chocolate-banoffe-whoopie-pies.jpg"
//       },
//       { 
//         "name": "Thai Soup",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@ali.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Thai", 
//         "image": "thai-food.jpg"
//       },
//       { 
//         "name": "Chinese Egg",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@ali.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Chinese", 
//         "image": "chinese-food.jpg"
//       },
//       { 
//         "name": "Mexican Shawarma",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@ali.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Mexican", 
//         "image": "mexican-food.jpg"
//       },
//       { 
//         "name": "Karahi",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@ali.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Indian", 
//         "image": "indian-food.jpg"
//       },
//       { 
//         "name": "Aloo Paratha",
//         "description": `Aloo Paratha is a delicious pakistani paratha filled with spiced mashed potatoes!`,
//         "email": "recipeemail@ali.co.uk",
//         "ingredients": [
//           "1 rooti",
//           "1 small normal size potato",
//           "1 cup of tea",
//         ],
//         "category": "Pakistani", 
//         "image": "alooparatha.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();

