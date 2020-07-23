class Food{
    constructor(){
        
        this.image = loadImage("Milk.png")
    }
    getFoodStock(){
    
            database.ref('Food').on("value", function(data){
                foodS = data.val();
            });
        return foodS;;
    }
    updateFoodStock(food){
        database.ref("/").update({
            Food: food
        })
    }
    deductFood(){
        foodS--;
    }
    bedroom(){
        background(bedroom);
      }
      washroom(){
        background(washroom);
      }
      garden(){
        background(garden);
      }
    display(){
        var x = 80;
        var y = 100;
         
        imageMode(CENTER);
        // image(this.image, 720, 220, 70, 70);
        
        if(this.getFoodStock() > 0){
            for(var i = 1; i<=this.getFoodStock();i++){
                image(this.image, x, y, 50, 50);
                if((i%10==0) && (i != 0)){
                    x = 80;
                    y += 50;
                } else{
                    x += 40;
                }
            }
        }
        
    }
}