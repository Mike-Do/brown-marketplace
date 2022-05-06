import { getDatabase, ref, set, update, get, push, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();
var validateForm = () => {
    const id = document.querySelector("#product-id").value;
    const name = document.querySelector("#product-name").value;
    const description = document.querySelector("#product-description").value;
    const price = document.querySelector("#price-description").value;
    const tag = document.querySelector("#tag-description").value;
    const category = document.querySelector("#category-description").value;
    const seller = document.querySelector("#seller-description").value;
    const pictures = document.querySelector("#picture-description").value;
    const date = document.querySelector("#date-posted").value;
    const sold = document.querySelector("#sold-description").value;
    const numLiked = document.querySelector("#liked-description").value;
    const numBookmarked = document.querySelector("#bookmarked-description").value;
    const numDisliked = document.querySelector("#disliked-description").value;

    if (id.trim() == "" || name.trim() == "" || description == "" || price.trim() == "" || tag == ""
        || category == "" || seller.trim() == "" || pictures == "" || date.trim() == "" || sold == ""
        || numLiked == "" || numBookmarked == "" || numDisliked == "") {
        alert("form not completely filled");
    } else {
        writeBasicInfoToDatabase(id, name, description, price, tag, category, seller, pictures, date, sold,
            numLiked, numBookmarked, numDisliked);
    }
};

// This method adds a new product to the database. It replaces any existing data at that path.
var writeBasicInfoToDatabase = (id, name, description, price, tag, category,
                                  seller, pictures, date, sold, numLiked, numBookmarked, numDisliked) => {
    console.log("here")
    set(ref(database, 'products/' + id), {
        id: id,
        name: name,
        description: description,
        price: price,
        seller: seller,
        pictures: pictures,
        date: date,
        sold: sold,
        numLiked: numLiked,
        numBookmarked: numBookmarked,
        numDisliked: numDisliked
    });
    console.log("here")
}

var addCategoryToList = (category, categoryID) => {
    // Add the category to the list of categories
    const categoryRef2 = ref(database, 'categories/' + categoryID);
    set(categoryRef2, {
        categoryID: categoryID,
        categoryName: category
    })
    console.log("Added new category")
}

// This method adds a category to the product.
var addCategoryToProduct = (id, category, categoryID) => {
    // Add the category to the list of categories of the product
    const categoryRef = ref(database, 'products/' + id + '/categories/' + categoryID);
    set(categoryRef, {
        categoryID: categoryID,
        categoryName: category
    })

    // Add the product id to the list of product ids of the category
    const categoryRef2 = ref(database, 'categories/' + categoryID);
    set(categoryRef2, {
        productID: id
    })
}

var addSubCategoryToList = (categoryID, subCategoryName, subCategoryID) => {
    // Add the sub-category to the corresponding category
    const subCategoryRef = ref(database, 'categories/' + categoryID + '/subcategories/' + subCategoryID)
    set(subCategoryRef, {
        subcategoryID: subCategoryID,
        subCategoryName: subCategoryName
    })

    // Add sub-category to the list of sub-categories
    const subCategoryRef2 = ref(database, 'sub-categories/' + subCategoryID);
    set(subCategoryRef2, {
        subCategoryID: subCategoryID,
        subCategoryName: subCategoryName,
        categoryID: categoryID
    })
    console.log("Added new sub-category")
}

// This method adds a subcategory to the product.
var addSubCategoryToProduct = (productID, categoryID, subCategoryName, subCategoryID) => {
    // Add the sub-category to the list of subcategories under the category of the product
    const subCategoryRef = ref(database, 'products/' + productID + '/categories/' + categoryID + '/subcategories/'
    + subCategoryID)
    // const newSubCategoryRef = push(subCategoryRef);
    set(subCategoryRef, {
        subcategoryID: subCategoryID,
        subCategoryName: subCategoryName,
        categoryID: categoryID
    })

    // Add the product id to the list of product ids of the sub-category
    const subCategoryRef2 = ref(database, 'sub-categories/' + subCategoryID);
    set(subCategoryRef2, {
        productID: id
    })
}

var addTagToList = (tagID, tagName) => {
    // add the tag to the list of tags
    const tagRef = ref(database, 'tags/' + tagID)
    set(tagRef, {
        tagID: tagID,
        tagName: tagName
    })
    console.log("Added new tag")
}

// This method adds a tag to the product.
var addTagToProduct = (id, tag, tagID) => {
    console.log("here")
    set(ref(database, 'products/' + id + '/tags/' + tagID), {
        tagID: tagID,
        tagName: tag
    })
}

// This method adds one to the number of likes the product has.
var modifyNumLiked = (id, change) => {
    const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
    let newNumLiked;

    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            newNumLiked = String(parseInt(childSnapshot.val().numLiked) + change);
            update(ref(database, 'products/' + id), {
                numLiked: newNumLiked
            })
        })
    })
}

// This method toggles the sold flag.
var updateSoldFlag = (id) => {
    const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
    let currSoldFlag = "No";
    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().sold === "No") {
                currSoldFlag = "Yes";
            }
            update(ref(database, 'products/' + id), {
                sold: currSoldFlag
            })
        })
    })
}

document.querySelector('#product-register').addEventListener("click", () => {
    validateForm();
})
document.querySelector('#product-add-category').addEventListener("click", () => {
    addCategoryToList("Other", "7")
})
document.querySelector('#product-add-sub-category').addEventListener("click", () => {
    addSubCategoryToList("7", "Miscellaneous", 32)
})
document.querySelector('#product-add-tag').addEventListener("click", () => {
    addTagToList("5", "Gift")
})
document.querySelector('#product-add-liked').addEventListener("click", () => {
    modifyNumLiked("1", 1)
})
document.querySelector('#product-update-sold').addEventListener("click", () => {
    updateSoldFlag("1")
})

