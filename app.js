// Friend Class: Represent a Friend
class Friend {
  constructor(name, location, phone) {
    this.name = name;
    this.location = location;
    this.phone = phone;
  }
}

// UI Class: Handle UI Task
class UI {
  static displayFriends() {
    const friends = Stores.getFriends();
    Stores.getFriends();
    friends.forEach((friend) => UI.addFriendToList(friend));
  }
  static addFriendToList(friend) {
    const list = document.getElementById("friend-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${friend.name}</td>
      <td>${friend.location}</td>
      <td>${friend.phone}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

    list.appendChild(row);
  }

  static deleteField(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} text-center`;
    div.innerHTML = message;
    const container = document.querySelector(".container");
    const form = document.querySelector("#form-group");
    container.insertBefore(div, form);

    // Set Timeout
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("phone").value = "";
  }
}

// Store Class: Handles Storage
class Stores {
  static getFriends() {
    let friends;
    if (localStorage.getItem("friends") === null) {
      friends = [];
    } else {
      friends = JSON.parse(localStorage.getItem("friends"));
    }
    return friends;
  }
  static addFriend(friend) {
    const friends = Stores.getFriends();
    friends.push(friend);
    localStorage.setItem("friends", JSON.stringify(friends));
  }

  static deleteFriend(phone) {
    const friends = Stores.getFriends();

    friends.forEach((friend, index) => {
      if (friend.phone === phone) {
        friends.splice(index, 1);
      }
    });

    localStorage.setItem("friends", JSON.stringify(friends));
  }
}

// Event: Display Friends
document.addEventListener("DOMContentLoaded", UI.displayFriends);

// Event: Add a Friend
document.querySelector("#form-group").addEventListener("submit", (e) => {
  e.preventDefault();
  //Get Form Values
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const phone = document.getElementById("phone").value;

  if (name === "" || location === "" || phone === "") {
    UI.showAlert("Please fill in all fields.", "danger");
  } else {
    const friend = new Friend(name, location, phone);

    UI.addFriendToList(friend);

    //Inserting into Local Storage
    Stores.addFriend(friend);

    UI.showAlert("Friend Added.", "success");
    UI.clearFields();
  }
});

// Event: Remove a Friend
document.getElementById("friend-list").addEventListener("click", (e) => {
  // Remove friend from UI
  UI.deleteField(e.target);

  //   Remove Friend from Local Storage
  Stores.deleteFriend(
    e.target.parentElement.previousElementSibling.textContent
  );
  UI.showAlert("Friend Deleted.", "success");
});
