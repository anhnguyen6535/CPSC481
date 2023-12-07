# Flavour of Calgary - By OrderTech

<a target="_blank" href="https://flavour-of-calgary.vercel.app/">
    <img src="https://flavour-of-calgary.vercel.app/assets/ordertechlogo-8c41d2f3.png" width="100" height="100" alt="OrderTech Logo" />
</a>

### Come visit our **[live demo](https://flavour-of-calgary.vercel.app/)**!

## Usage

### Walkthrough

* To begin using the app, press the **Scan QR Code** button on the [Welcome screen](https://flavour-of-calgary.vercel.app/) to get started.

* Once you reach the [Home menu](https://flavour-of-calgary.vercel.app/home), you can browse the Flavour of Calgary's menu items.
  * Press **Add** to add items to your order.
    * Press the **+ and -** buttons to change the quantity.
    * If you try adding an alcoholic beverage, a waiter will be called over to confirm your age (once per session).
  * Press the **Bookmark Icon** in the top-right corner of a item to pin items to the top and compare them quicker.
  * Press the **Filter** button at the top-right to sort by dietary restrictions.
  * Use the **Search Bar** to find specific food items (for example, type "pizza" to see results for cheese, pepperoni, and vegetarian pizza).
  * Use the **Menu Bar** under the Search Bar to sort by the item types (drinks, entrees, etc.)
  * If you need help, press the **Call Waiter** button at any time.

* After you've decided on what you want to eat, press the **View Cart** button (or the **Cart Icon**) to go to the [Cart screen](https://flavour-of-calgary.vercel.app/cart).
  * Press **Add More Items** if you change your mind.
  * Press the **Trash Icon** to remove all copies of an item from your order.

* After reviewing the total cost, press **Place Order** and wait for your food to arrive.
  * If you're still hungry, press **Order More Items** to continue ordering.
  * Otherwise, press **Continue to Payment** (or the **Pay Icon**).

* Once you reach the [Payment screen](https://flavour-of-calgary.vercel.app/pay), you can review your order one last time.
  * Press the **One Bill** button to pay for it in one go and complete your dining session.
  * Press the **Split Bill** button to split payments between multiple people.

* If you choose to split the bill, you will be sent to the [Diners screen](https://flavour-of-calgary.vercel.app/pay/add-diners).
  * Press **Add (Another) Diner** for each person at your table.
  * Press **Continue** once everyone has been added.

* On the [Split bill screen](https://flavour-of-calgary.vercel.app/pay/split-bill), you can assign food items to each person.
  * Press the **Split** selector to split items between the diners you've previously selected.
  * Press **Continue** once each item has been assigned to one or more people.

* Now you can see each person's individual bills on the [Price breakdown screen](https://flavour-of-calgary.vercel.app/pay/split-bill-breakdown).
  * After confirming your orders, press **Request Bills** one last time to complete your dining session.

Once the dining session is complete, a Flavour of Calgary employee can visit the [Waiter screen](https://flavour-of-calgary.vercel.app/waiter) to reset a table's dining session.



### Features Implemented

* Adding food items to an order
* Removing food items from an order
* Search bar for finding specific items
* [+] and [-] buttons to change item quantity
* Calling a waiter
* Alcohol age verification
* Flitering by food type (entree, beverage, dessert, etc.)
* Filtering by dietary restriction (halal, peanut-free, vegan, etc.)
* Sending multiple orders before payment
* Adding diner names
* Splitting the bill between multiple diners
* Price breakdown screens


## Local Setup

### Requirements

1. Install nvm (Node Version Manager) for [Windows](https://github.com/coreybutler/nvm-windows) or [Linux/MacOS](https://github.com/nvm-sh/nvm)
2. Install Node.JS using NVM (`nvm install 20.9.0` followed by `nvm use 20.9.0`)
3. Clone the repo
4. Change directory to the app (`cd CPSC481/order-system-ionic`)
5. Install Ionic with `npm install -g @ionic/cli @capacitor/assets`
6. Make a clean install of the rest of the packages using `npm ci` (if this doesn't work, use `npm install`)



### Deployment
1. Change directory to the app (`cd CPSC481/order-system-ionic`)
2. Serve the webpage using `ionic serve`
3. Visit it by going to http://localhost:8100



## Contributors & Special Thanks

We'd like to extend a huge thanks to all of the members of the CPSC 481 - T03 - Group 2 team!

* Ahmed Abdullah
* Alan Alcocer-Iturriza
* Anh Nguyen
* Imran Haji
* Justin Yu