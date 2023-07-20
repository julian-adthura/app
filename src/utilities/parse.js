import Parse from "parse";

Parse.initialize("EiUlqtZVrx16YjNIxzpr96WuefAW89b07Qc6KAl7", "XQqxCqF53EyvZV517l6fguQxFXVA4D85zmQNOMaT");
Parse.serverURL = "https://parseapi.back4app.com/";

// Price = Cost of item
// Cost = Price to list

async function createUser(username, email, password) {
    // Creates a new Parse "User" object, which is created by default in your Parse app
    let user = new Parse.User();
    // Set the input values to the new "User" object
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);
    try {
      // Call the save method, which returns the saved object if successful
      user = await user.save();
      if (user !== null) {
        // Notify the success by getting the attributes from the "User" object, by using the get method (the id attribute needs to be accessed directly, though)
        alert(
          `New object created with success! ObjectId: ${
            user.id
          }, ${user.get("username")}`
        );
        return user
      }
    } catch (error) {
      throw new Error(error)
    }
  }

async function createListing(name, description, hashtags, zip, price, cost, owner, exp, image) {
    const listingObject = new Parse.Object('Listing');
    listingObject.set('name', name);
    listingObject.set('description', description);
    listingObject.set('hashtags', hashtags);
    listingObject.set('zip', zip);
    listingObject.set('price', price); // Price of the item being listed
    listingObject.set('cost', cost); // Cost to list the listing
    listingObject.set('owner', owner); // Pointer - User
    listingObject.set('expiration', exp); // Date
    image ? listingObject.set('image', image) : null // File


    try {
      const result = await listingObject.save();
      console.log('listingObject created', result);
      return result
    } catch (error) {
      console.error('Error while creating listingObject: ', error);
      throw new Error(error)
    }
}

async function deleteListing(id) {
  const listingObject = new Parse.Object.extend('Listing');
  const query = new Parse.Query(listingObject);
  query.get(id)
  .then((object) => {
    object.destroy().then(
      (success) => {
        console.log("Listing deleted successfully.");
        return success
      },
      (error) => {
        console.error("Error deleting Listing:", error);
        throw new Error(error)
      }
    );
  }).catch((error) => {
    console.log("Doesn't Exist")
  })
}

function getListings(hashtags, limit, offset) {
  return new Promise((res,rej) => {
    const listingObject = new Parse.Object('Listing');
    const query = new Parse.Query(listingObject);
    query.limit(limit ? limit : 30);
    query.skip(offset ? offset : 0);
    if (hashtags) {
      query.containedIn('hashtags', hashtags);
    }
  
    query.find().then((results) => {
      res(results)
      console.log('Retrieved objects:', results);
    }).catch((error) => {
      console.error('Error fetching objects:', error);
      rej(error)
    });
  })
}

export default {
  createUser,
  createListing,
  deleteListing,
  getListings
}