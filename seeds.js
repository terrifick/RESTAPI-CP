const mongoose = require("mongoose");
const User = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/userApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!!!!");
    console.log(err);
  });

const seedUsers = [
  {
    imageUrl:
      "https://filmfare.wwmindia.com/content/2020/apr/deepikapadukonenext11586245449.jpg",
    name: "Deepika Padukone",
    profession: "actress",
  },
  {
    imageUrl:
      "https://i0.wp.com/topnaija.ng/wp-content/uploads/2022/05/genevievennaji.jpg?resize=1000%2C600&ssl=1",
    name: "Genevieve Nnaji",
    profession: "actress",
  },
  {
    imageUrl:
      "https://1.bp.blogspot.com/-QfOi6JftaY8/Xy72kVodpTI/AAAAAAAAPJY/I2PUCnQxN-UI5GGIKyDLRfs3GK_uEaZtgCLcBGAsYHQ/s1600/maurice_sam_20200808_45.png",
    name: "Maurice Sam",
    profession: "actor",
  },
  {
    imageUrl:
      "https://www.thefamouspeople.com/profiles/images/camila-cabello-6.jpg",
    name: "Camila Cabello",
    profession: "singer",
  },
  {
    imageUrl:
      "https://1.bp.blogspot.com/-XhPlFQDeiGU/XoSRClg9q_I/AAAAAAAAHvc/sVipZLv9WRwDKq0RETr-hjnCfquaBBzAQCLcBGAsYHQ/s1600/PicsArt_04-01-02.00.17.jpg",
    name: "Ric Hassani",
    profession: "singer",
  },
];

User.insertMany(seedUsers)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
