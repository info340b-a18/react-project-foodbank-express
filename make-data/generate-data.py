import json 
import random as r
import numpy as np

imperishable = ["Cheese", "Dry Milk", "Canned Tuna", "Canned Salmon", "Nuts", "Nut Butter", "Sardines", "Black Beans", "Crackers", "Beef jerky", "Applesauce", "Pudding", "Fruit Cups", "Granola Bars", "Power Bars", "Cereal Bars", "Canned Beans", "Ravioli", "Spaghetti Cans", "Canned Soup", "Ramen", "Tomato Juice", "Packaged Nuts", "Trail Mix", "Fruit Snacks", "Dried Fruits", "Peanut Butter", "Pasta", "Spaghetti Sauce", "Canned Vegetables", "Fruit", "Macaroni", "Chips", "Pretzels", "Goldfish", "Boxed Drinks", "Juices", "Vienna Sausage", "Pop Tarts", "Oatmeal", "Ziplock", "Canned Tuna", "Rice", "Beans", "Dry Milk", "Cereal", "Protein Bars", "Raisins", "Prunes", "Peas", "Barley", "Quinoa", "Pudding"]
perishable = ["Fish", "Chicken", "Beef", "Pork", "Mutton", "sausage", "Milk", "Apples", "Vegetables", "Carrots", "Green Beans", "artichokes", "legumes", "broccoli", "celery", "bok choy", "poultry", "crab", "meatballs"]
food_banks = ["Rainier Valley Food Bank", "YWCA Central Area Food Bank", "Blessed Sacrament", "North Helpline", "Phinney Ridge Food Bank", "Greenwood Food Bank", "Ballard Food Bank", "Paradise of Praise", "West Seattle Food Bank", "El Centro de la Raza"]


def generateRandomFood():
    r.shuffle(imperishable)
    r.shuffle(perishable)
    foods = imperishable[0:25] + perishable[0:9]
    weights = np.concatenate((np.random.choice(range(4, 21), 24), np.random.choice(range(0, 5), 10))).tolist()
    return dict(zip(foods, weights))
generateRandomFood()


def generateFoodBankJson():
    bank_words = {}
    for i in food_banks:
        bank_words[i] = generateRandomFood()

    with open('bank_words.json', 'w') as fp:
        json.dump(bank_words, fp)

generateFoodBankJson()
