module.exports = function(app, bdManager){
    app.get("/testPost", function(req, res){
        let place = {
            name : "mi casa",
            address : "miguel de unamuno 8",
            capacity : 4
        }
        
        bdManager.insertPlace(place, function(id){
            if(id == null){
                res.send("Error inserting");
            }
            else{
                res.send("Added place with id: ", id);
            }
        });
    })
};