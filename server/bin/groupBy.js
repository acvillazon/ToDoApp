//https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
//Take from Stackoverflow.

exports._groupBy = function(list, keyGetter){
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item).toString();
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
};


// const pets = [
//     {type:"Dog", name:"Spot"},
//     {type:"Cat", name:"Tiger"},
//     {type:"Dog", name:"Rover"}, 
//     {type:"Cat", name:"Leo"}
// ];
    
// const grouped = this._groupBy(pets, pet => pet.type);
// console.log(grouped)

// console.log(grouped.get("Dog")); // -> [{type:"Dog", name:"Spot"}, {type:"Dog", name:"Rover"}]
// console.log(grouped.get("Cat")); // -> [{type:"Cat", name:"Tiger"}, {type:"Cat", name:"Leo"}]