// CV Screener

const profiles = [
  {
    name: "Jennie Nichols",
    gender: "female",
    age: 30,
    phone: "(272) 790-0888",
    city: "Billings",
    country: "United States",
    email: "jennie.nichols@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/75.jpg",
    },
  },

  {
    name: "John Wick",
    gender: "male",
    age: 30,
    phone: "(272) 790-0888",
    city: "Billings",
    country: "United States",
    email: "jennie.nichols@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
  },

  {
    name: "Saqlain Hussain",
    gender: "male",
    age: 30,
    phone: "+92 310 1710479",
    city: "Lahore",
    country: "Pakistan",
    email: "jennie.nichols@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/76.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/76.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/76.jpg",
    },
  },

  {
    name: "Nichols Jemima",
    gender: "female",
    age: 30,
    phone: "(272) 790-0888",
    city: "Billings",
    country: "United States",
    email: "jennie.nichols@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/76.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/76.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/76.jpg",
    },
  },
];

let imageBox = document.getElementById("image");
let profileBox = document.getElementById("profile");
let nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", changeCV);

function iterator(profiles) {
  let i = 0;

  return {
    next: function () {
      if (i < profiles.length) {
        return {
          value: profiles[i++],
          done: false,
        };
      } else {
        i = 0;
        return {
          value: profiles[i++],
          done: false,
        };
      }
    },
  };
}
let userObj = iterator(profiles);
changeCV();

function changeCV() {
  let profile = userObj.next().value;

  if (profile != undefined) {
    let imageURL = profile.picture.large;

    imageBox.innerHTML = `<img src='${imageURL}'></img>`;
    profileBox.innerHTML = `
    <table class="table table-bordered">
    <tr>
      <th class="text-center">Name:</th>
      <td>${profile.name}</td>
    </tr>
    <tr>
      <th class="text-center">Age:</th>
      <td>${profile.age}</td>
    </tr>
    <tr>
      <th class="text-center">City:</th>
      <td>${profile.city}</td>
    </tr>
    <tr>
      <th class="text-center">Country:</th>
      <td>${profile.country}</td>
    </tr>
    <tr>
      <th class="text-center">Phone:</th>
      <td>${profile.phone}</td>
    </tr>
    <tr>
      <th class="text-center">Email:</th>
      <td>${profile.email}</td>
    </tr>
</table>
    `;
  } else {
    window.location.reload();
  }
}

// profileBox.innerHTML = `<ul class="list-group">
//     <li class="list-group-item"><b>Name:</b>    ${profile.name}</li>
//     <li class="list-group-item"><b>Age:</b>     ${profile.age}</li>
//     <li class="list-group-item"><b>City:</b>    ${profile.city}</li>
//     <li class="list-group-item"><b>Country:</b> ${profile.country}</li>
//     <li class="list-group-item"><b>Phone:</b>   ${profile.phone}</li>
//     <li class="list-group-item"><b>Email:</b>   ${profile.email}</li>
//   </ul>`;