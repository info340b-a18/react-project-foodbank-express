import json 
import random as r
import numpy as np

#A list of imperishable foods
imperishable = ["Cheese", "Dry Milk", "Canned Tuna", "Canned Salmon", "Nuts", "Nut Butter", "Sardines", "Black Beans", "Crackers", "Beef jerky", "Applesauce", "Pudding", "Fruit Cups", "Granola Bars", "Power Bars", "Cereal Bars", "Canned Beans", "Ravioli", "Spaghetti Cans", "Canned Soup", "Ramen", "Tomato Juice", "Packaged Nuts", "Trail Mix", "Fruit Snacks", "Dried Fruits", "Peanut Butter", "Pasta", "Spaghetti Sauce", "Canned Vegetables", "Fruit", "Macaroni", "Chips", "Pretzels", "Goldfish", "Boxed Drinks", "Juices", "Vienna Sausage", "Pop Tarts", "Oatmeal", "Ziplock", "Canned Tuna", "Rice", "Beans", "Dry Milk", "Cereal", "Protein Bars", "Raisins", "Prunes", "Peas", "Barley", "Quinoa", "Pudding"]

#A list of perishable foods
perishable = ["Fish", "Chicken", "Beef", "Pork", "Mutton", "sausage", "Milk", "Apples", "Vegetables", "Carrots", "Green Beans", "artichokes", "legumes", "broccoli", "celery", "bok choy", "poultry", "crab", "meatballs"]

# All the food banks in seattle area
food_banks = ["Asian Counseling and Referral Services Food Bank", "Asian Counseling & Referral Service", "Northwest Harvest", "El Centro De La Raza", "Ballard Food Bank", "Blessed Sacrament Food Bank", "Byrd Barr Place", "Cherry Street Food Bank", "Chicken Soup Brigade", "Giving Room Food Bank @ Epic Life Church", "Immanuel Community Services", "Jewish Family Service", "Phinney Ridge Food Bank", "Pike Market Food Bank", "Providence Regina House", "Puget Sound Labor Agency", "Queen Anne Food Bank at Sacred Heart", "Rainier Valley Food Bank", "Salvation Army Food Bank", "Seattle Indian Center", "The Food Bank @ St. Mary's", "University District Food Bank", "West Seattle Food Bank", "White Center Food Bank", "YWCA Central Area Food Bank", "FamilyWorks Family Resource Center & Food Banks", "Paradise of Praise COGIC", "North Helpline", "West Seattle Food Bank", "St. Vincent de Paul Food Pantry - Overland", "Northwest Harvest", "Phinney Ridge Lutheran Church", "Puget Sound Labor Agency"]

# Make a random dictionary of words and weights for each Food bank  
def generateRandomFood():
    r.shuffle(imperishable)
    r.shuffle(perishable)
    foods = imperishable[0:25] + perishable[0:9]
    weights = np.concatenate((np.random.choice(range(4, 100), 24), np.random.choice(range(0, 5), 10))).tolist()
    return dict(zip(foods, weights))
    
generateRandomFood()

# Make the dictionary into a json file
def generateFoodBankJson():
    bank_words = {}
    for i in food_banks:
        bank_words[i] = generateRandomFood()

    with open('bank_words.json', 'w') as fp:
        json.dump(bank_words, fp)

generateFoodBankJson()