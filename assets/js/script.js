// ==================================
// 1. Toggle humbugger menu;
// By default, the .link tag should
// display none.
// ==================================
const link = document.querySelector(".link");
const hamburger = document.querySelector(".hamburger");

hamburger.onclick = () => {
  if (link.style.right === "-100%") {
    link.style.right = "0";
  } else {
    link.style.right = "-100%";
  }
};

// ==================================
// 2. Display products based on
// All, Men or Female categories.
// ==================================
const productTab = document.querySelectorAll('[name="tabset"]');
const catalogue = document.querySelectorAll(".catalogue");
const tagList = document.querySelectorAll(".tag");
const cardRow = document.querySelector(".card_row");

const msgDiv = document.createElement("div");
msgDiv.style.width = "100%";
msgDiv.style.height = "50px";
msgDiv.style.backgroundColor = "red";
msgDiv.style.borderRadius = "10px";
msgDiv.style.padding = "5px";

const paraMsg = document.createElement("p");
paraMsg.style.color = "#FFFFFF";
paraMsg.style.textAlign = "center";
paraMsg.style.fontSize = "30px";
paraMsg.textContent = "There's no item in this section.";
msgDiv.appendChild(paraMsg);
msgDiv.style.display = "none";
const showMsgDiv = (display) => {
  cardRow.appendChild(msgDiv).style.display = display;
};

let isTrue = false;
const tagArr = Array.from(tagList);
const displayTags = (category) => {
  tagList.forEach((tag) => {
    if (tag.textContent === category) {
      tag.parentNode.parentNode.parentNode.style.display = "block";
    } else {
      tag.parentNode.parentNode.parentNode.style.display = "none";
    }
  });

  isTrue = tagArr.some((tag) => tag.textContent === category);

  if (isTrue) {
    showMsgDiv("none");
  } else if (!isTrue) {
    showMsgDiv("block");
  } else {
    showMsgDiv("block");
  }
};

productTab.forEach((products) =>
  products.addEventListener("change", (e) => {
    if (products.value === "All") {
      tagList.forEach((tag) => {
        tag.parentNode.parentNode.parentNode.style.display = "block";
        showMsgDiv("none");
      });
    } else if (products.value === "Male") {
      displayTags("Male");
    } else if (products.value === "Female") {
      displayTags("Female");
    } else if (products.value === "Babies") {
      displayTags("Babies");
    }
  })
);
// ==================================
// 2. Display products based on
// search keywords in the input fields.
// ==================================
const search = document.querySelector(".search_product");

const errorDiv = document.createElement("div");

// convert a nodelist to an array
let cardArray = Array.from(catalogue);
// another way to convert a nodelist to an array
// const cardArray = Array.prototype.slice.call(catalogue);

// show card item function
let isFound = false;
let notFound = false;
const showItemCards = (value) => {
  cardArray.forEach((itemCard) => {
    itemCard.style.display = "none";
    const message = itemCard.children[0].children[2].textContent.toLowerCase();
    if (message.includes(value)) {
      itemCard.style.display = "block";
    } else {
      itemCard.style.display = "none";
    }
    errorDiv.innerHTML = `<p> Oops input "${value}" not found in the items directory.</p>`;
  });

  const displayError = () => {
    notFound = cardArray.every((cards) => cards.style.display === "none");
    isFound = cardArray.some((cards) => cards.style.display === "block");

    if (notFound) {
      cardRow.appendChild(errorDiv).style.display = "block";
    } else if (isFound) {
      cardRow.appendChild(errorDiv).style.display = "none";
    } else {
      cardRow.appendChild(errorDiv).style.display = "none";
    }
  };
  displayError();
};

search.addEventListener("input", (e) => {
  showItemCards(e.target.value.toLowerCase());
});
