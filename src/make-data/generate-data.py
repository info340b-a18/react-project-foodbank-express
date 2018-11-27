import json 
import random as r
import numpy as np

imperishable = ["Cheese", "Dry Milk", "Canned Tuna", "Canned Salmon", "Nuts", "Nut Butter", "Sardines", "Black Beans", "Crackers", "Beef jerky", "Applesauce", "Pudding", "Fruit Cups", "Granola Bars", "Power Bars", "Cereal Bars", "Canned Beans", "Ravioli", "Spaghetti Cans", "Canned Soup", "Ramen", "Tomato Juice", "Packaged Nuts", "Trail Mix", "Fruit Snacks", "Dried Fruits", "Peanut Butter", "Pasta", "Spaghetti Sauce", "Canned Vegetables", "Fruit", "Macaroni", "Chips", "Pretzels", "Goldfish", "Boxed Drinks", "Juices", "Vienna Sausage", "Pop Tarts", "Oatmeal", "Ziplock", "Canned Tuna", "Rice", "Beans", "Dry Milk", "Cereal", "Protein Bars", "Raisins", "Prunes", "Peas", "Barley", "Quinoa", "Pudding"]

perishable = ["Fish", "Chicken", "Beef", "Pork", "Mutton", "sausage", "Milk", "Apples", "Vegetables", "Carrots", "Green Beans", "artichokes", "legumes", "broccoli", "celery", "bok choy", "poultry", "crab", "meatballs"]

food_banks = ["Asian Counseling and Referral Services Food Bank", "Ballard Food Bank", "Blessed Sacrament Food Bank", "Byrd Barr Place Food Bank", "Cherry Street Food Bank", "Chicken Soup Brigade", "El Centro de la Raza", "FamilyWorks - Wallingford Food Bank", "FamilyWorks - Greenwood Food Bank", "Giving Room Food Bank @ Epic Life Church", "Immanuel Community Services", "Jewish Family Service", "North Helpline - Lake City Food Bank", "North Helpline - Bitter Lake Food Bank", "Paradise of Praise", "Phinney Ridge Food Bank", "Pike Market Food Bank", "Providence Regina House", "Puget Sound Labor Agency", "Queen Anne Food Bank at Sacred Heart", "Rainier Valley Food Bank", "Salvation Army Food Bank", "Seattle Indian Center", "St. Vincent de Paul Food Bank", "The Food Bank @ St. Mary's", "University District Food Bank", "West Seattle Food Bank", "White Center Food Bank", "YWCA Central Area Food Bank"]

def generateRandomFood():
    r.shuffle(imperishable)
    r.shuffle(perishable)
    foods = imperishable[0:25] + perishable[0:9]
    weights = np.concatenate((np.random.choice(range(4, 100), 24), np.random.choice(range(0, 5), 10))).tolist()
    return dict(zip(foods, weights))
    
generateRandomFood()

def generateFoodBankJson():
    bank_words = {}
    for i in food_banks:
        bank_words[i] = generateRandomFood()

    with open('bank_words.json', 'w') as fp:
        json.dump(bank_words, fp)

generateFoodBankJson()