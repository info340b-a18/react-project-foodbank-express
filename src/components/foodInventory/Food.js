
class Food{
    constructor(text, num){
        this.text = text;
        this.num = num;
    }
    updateQuantity(n){
        this.num = n;
    }
    setId(id){
      this.id = id;
    }
}

export default Food;