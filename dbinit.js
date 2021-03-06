let mongoose = require("mongoose");
let EventMultilang = require("./models/EventMultilang");
let BonuseMultilang = require("./models/BonuseMultilang");
let NewsMultilang = require("./models/NewsMultilang");
let PlaceTypeMultilang = require("./models/PlaceTypeMultilang");
let PlaceMultilang = require("./models/PlaceMultilang");

let News = require("./models/News");
let Bonuse = require("./models/Bonuse");
let Event = require("./models/Event");
let PlaceType = require("./models/PlaceType");
let Lang = require("./models/Lang");
let TopPlace = require("./models/TopPlace");
let Place = require("./models/Place");
let Complaint = require("./models/Complaint");
let DrinkApplication = require("./models/DrinkApplication");
let Rating = require("./models/Rating");
let Department = require("./models/Department");
let Client = require("./models/Client");
let DrinkApplicationComment = require("./models/DrinkApplicationComment");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/drinker", () => {
    mongoose.connection.db.dropDatabase();
    dbInit()
        .then(() => {
            console.log("done");
        })
        .catch((err) => {
            console.log(err);
        });
});

let lang1;
let lang2;
let placeType1;
let placeType2;
let topPlace1;
let topPlace2;
let topPlace3;
let topPlace4;
let news1;
let news2;
let bonuse1;
let bonuse2;
let event1;
let event2;
let eventM1;
let eventM2;
let eventM3;
let eventM4;
let bonuseM1;
let bonuseM2;
let bonuseM3;
let bonuseM4;
let newsM1;
let newsM2;
let newsM3;
let newsM4;
let placeTypeM1;
let placeTypeM2;
let placeTypeM3;
let placeTypeM4;
let placeM1;
let placeM2;
let placeM3;
let placeM4;
let place1;
let place2;
let complaint1;
let complaint2;
let complaint3;
let complaint4;
let rating1;
let rating2;
let rating3;
let rating4;
let app1;
let app2;
let app3;
let app4;
let department1;
let department2;
let department3;
let department4;
let client1;
let client2;
let message1;
let message2;
let message3;
let message4;
let message5;
let message6;
let message7;
let message8;


async function createModels() {
    lang2 = await Lang.create({name: "ukr"});
    lang1 = await Lang.create({name: "eng"});
    placeType1 = await PlaceType.create({});
    placeType2 = await PlaceType.create({});
    placeTypeM1 = await PlaceTypeMultilang.create({
        name: "ресторан",
        placeType: placeType1,
        lang: lang1
    });
    placeTypeM2 = await PlaceTypeMultilang.create({
        name: "resturant",
        placeType: placeType1,
        lang: lang2
    });
    placeTypeM3 = await PlaceTypeMultilang.create({
        name: "бар",
        placeType: placeType2,
        lang: lang1
    });
    placeTypeM4 = await PlaceTypeMultilang.create({
        name: "bar",
        placeType: placeType2,
        lang: lang2
    });
    client1 = await Client.create({
        name: "Tasik",
        surname: "Panasik",
        city: "Jopsk",
        phone: "355875545722",
        email: "someemail@mail.com",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLzZszQbQf6jkknIGI8A3rj-0BoEngyi9156njfrCjPED9_b2vw"
    });
    client2 = await Client.create({
        name: "Tasik",
        surname: "Panasik",
        city: "Jopsk",
        phone: "355875545722",
        email: "someemail@mail.com",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLzZszQbQf6jkknIGI8A3rj-0BoEngyi9156njfrCjPED9_b2vw"
    });
    place1 = await Place.create({
        phone: "355875545722",
        email: "someemail@mail.com",
        reviews: 0,
        allowed: true,
        location: {
            lat: 442,
            lng: 774
        },
        images: ["/upload/place/default.jpg"],
        days: {
            0: {
                start: "09:00",
                end: "18:00"
            },
            1: {
                start: "09:00",
                end: "18:00"
            },
            2: {
                start: "09:00",
                end: "18:00"
            },
            3: {
                start: "09:00",
                end: "18:00"
            },
            4: {
                start: "09:00",
                end: "18:00"
            },
            5: {
                start: "09:00",
                end: "18:00"
            },
            6: {
                start: "09:00",
                end: "18:00"
            },
            7: {
                start: "09:00",
                end: "18:00"
            }
        },
        types: [placeType1],
        hashTags: ["buhalovka", "bomjatnik"],
        topCategories: ["Best club for whores!"]
    });
    place2 = await Place.create({
        phone: "355875545722",
        email: "someemail@mail.com",
        reviews: 0,
        allowed: true,
        location: {
            lat: 442,
            lng: 774
        },
        images: ["/upload/place/default.jpg"],
        days: {
            0: {
                start: "09:00",
                end: "18:00"
            },
            1: {
                start: "09:00",
                end: "18:00"
            },
            2: {
                start: "09:00",
                end: "18:00"
            },
            3: {
                start: "09:00",
                end: "18:00"
            },
            4: {
                start: "09:00",
                end: "18:00"
            },
            5: {
                start: "23:00",
                end: "07:00"
            },
            6: {
                start: "23:00",
                end: "07:00"
            },
            7: {
                start: "23:00",
                end: "07:00"
            }
        },
        types: [placeType2],
        hashTags: ["jumoreska", "pupok"],
        topCategories: ["Best karaoke"]
    });
    topPlace1 = await TopPlace.create({
        startDate: Date(),
        endDate: Date(),
        price: 0,
        actual: true,
        place: place1
    });
    topPlace2 = await TopPlace.create({
        startDate: Date(),
        endDate: Date(),
        price: 0,
        actual: true,
        place: place1
    });
    topPlace3 = await TopPlace.create({
        startDate: Date(),
        endDate: Date(),
        price: 0,
        actual: true,
        place: place2
    });
    topPlace4 = await TopPlace.create({
        startDate: Date(),
        endDate: Date(),
        price: 0,
        actual: false,
        place: place2
    });
    placeM1 = await PlaceMultilang.create({
        name: "ржавый башмак",
        description: "самый ржавый башмак на всем белом свете",
        address: {
            city: "Львів",
            address: "Пимоненка",
            number: "19"
        },
        place: place1,
        lang: lang1
    });
    placeM2 = await PlaceMultilang.create({
        name: "row foot",
        description: "the most row foot all over the world",
        place: place1,
        address: {
            city: "Lviv",
            address: "Pymonenka",
            number: "19"
        },
        lang: lang2
    });
    placeM3 = await PlaceMultilang.create({
        name: "скрипучий стул",
        description: "стул скрипит, значит на нем сидят...жопа болит",
        place: place2,
        address: {
            city: "Львів",
            address: "Городоцька",
            number: "77"
        },
        lang: lang1
    });
    placeM4 = await PlaceMultilang.create({
        name: "screaming chair",
        description: "some screaming chair for your ass",
        place: place2,
        address: {
            city: "Lviv",
            address: "Gorodotska",
            number: "77"
        },
        lang: lang2
    });
    department1 = await Department.create({
        roles: ["BOSS_PLACE"],
        client: client1,
        place: place1
    });
    department2 = await Department.create({
        roles: ["ADMIN_PLACE"],
        client: client1,
        place: place1
    });
    department3 = await Department.create({
        roles: ["BOSS_PLACE"],
        client: client2,
        place: place2
    });
    department4 = await Department.create({
        roles: ["ADMIN_PLACE"],
        client: client2,
        place: place2
    });
    complaint1 = await Complaint.create({
        value: "So,so,so! huevo!",
        client: client1,
        place: place1
    });
    complaint2 = await Complaint.create({
        value: "So,so,so! huevo!",
        client: client1,
        place: place1
    });
    complaint3 = await Complaint.create({
        value: "So,so,so! huevo!",
        client: client2,
        place: place2
    });
    complaint4 = await Complaint.create({
        value: "So,so,so! huevo!",
        client: client2,
        place: place2
    });
    app1 = await DrinkApplication.create({
        friends: "I with my friends",
        goal: "poebatsa",
        budged: 30,
        date: Date(),
        organizer: client1,
        place: place1
    });
    app2 = await DrinkApplication.create({
        friends: "I with my friends",
        goal: "poebatsa",
        budged: 30,
        date: Date(),
        organizer: client1,
        place: place1
    });
    app3 = await DrinkApplication.create({
        friends: "I with my friends",
        goal: "poebatsa",
        budged: 30,
        date: Date(),
        organizer: client2,
        place: place2
    });
    app4 = await DrinkApplication.create({
        friends: "I with my friends",
        goal: "poebatsa",
        budged: 30,
        date: Date(),
        organizer: client2,
        place: place2
    });
    message1 = await DrinkApplicationComment.create({
        value: "Hello!",
        sender: client2,
        drinkApplication: app1,
    });
    message2 = await DrinkApplicationComment.create({
        value: "Hi!",
        sender: client1,
        drinkApplication: app1,
    });
    message3 = await DrinkApplicationComment.create({
        value: "Hello!",
        sender: client2,
        drinkApplication: app2,
    });
    message4 = await DrinkApplicationComment.create({
        value: "Hi!",
        sender: client1,
        drinkApplication: app2,
    });
    message5 = await DrinkApplicationComment.create({
        value: "Hello!",
        sender: client2,
        drinkApplication: app3,
    });
    message6 = await DrinkApplicationComment.create({
        value: "Hi!",
        sender: client1,
        drinkApplication: app3,
    });
    message7 = await DrinkApplicationComment.create({
        value: "Hello!",
        sender: client2,
        drinkApplication: app4,
    });
    message8 = await DrinkApplicationComment.create({
        value: "Hi!",
        sender: client1,
        drinkApplication: app4,
    });
    rating1 = await Rating.create({
        value: 5,
        comment: "Duze faino",
        price: 0,
        client: client1,
        place: place1
    });
    rating2 = await Rating.create({
        value: 2,
        comment: "Duze faino",
        price: 0,
        client: client1,
        place: place1
    });
    rating3 = await Rating.create({
        value: 4,
        comment: "Duze faino",
        price: 0,
        client: client2,
        place: place2
    });
    rating4 = await Rating.create({
        value: 3,
        comment: "Duze faino",
        price: 0,
        client: client2,
        place: place2
    });
    news1 = await News.create({
        startDate: Date(),
        endDate: Date(),
        author: client1,
        place: place1,
        image: "/upload/promo/default.jpg"
    });
    news2 = await News.create({
        startDate: Date(),
        endDate: Date(),
        author: client2,
        place: place2,
        image: "/upload/promo/default.jpg"
    });
    bonuse1 = await Bonuse.create({
        startDate: Date(),
        endDate: Date(),
        author: client1,
        place: place1,
        image: "/upload/promo/default.jpg"
    });
    bonuse2 = await Bonuse.create({
        startDate: Date(),
        endDate: Date(),
        author: client1,
        place: place2,
        image: "/upload/promo/default.jpg"
    });
    event1 = await Event.create({
        startDate: Date(),
        endDate: Date(),
        author: client1,
        place: place1,
        image: "/upload/promo/default.jpg"
    });
    event2 = await Event.create({
        startDate: Date(),
        endDate: Date(),
        author: client2,
        place: place2,
        image: "/upload/promo/default.jpg"
    });
    eventM1 = await EventMultilang.create({
        header: "жесткий бухлет",
        description: "собираемся бухнуть все разом",
        promo: event1,
        lang: lang1,
    });
    eventM2 = await EventMultilang.create({
        header: "header",
        description: "descr",
        promo: event1,
        lang: lang2
    });
    eventM3 = await EventMultilang.create({
        header: "свинг вечеруха",
        description: "свингуем до упаду",
        promo: event2,
        lang: lang1
    });
    eventM4 = await EventMultilang.create({
        header: "header",
        description: "descr",
        promo: event2,
        lang: lang2
    });
    bonuseM1 = await BonuseMultilang.create({
        header: "получи звиздюлей",
        description: "получи звиздюлей всего за 1000 грн/час",
        conditions: "прийди главное",
        promo: bonuse1,
        lang: lang1
    });
    bonuseM2 = await BonuseMultilang.create({
        header: "header",
        description: "descr",
        conditions: "conditions",
        promo: bonuse1,
        lang: lang2
    });
    bonuseM3 = await BonuseMultilang.create({
        header: "укради все что не ровно лежит",
        description: "ну ті и из названия понял что к чему",
        conditions: "conditions",
        promo: bonuse2,
        lang: lang1
    });
    bonuseM4 = await BonuseMultilang.create({
        header: "header",
        description: "descr",
        conditions: "conditions",
        promo: bonuse2,
        lang: lang2
    });
    newsM1 = await NewsMultilang.create({
        header: "рада обосралась",
        description: "рада как всегда обосралась",
        promo: news1,
        lang: lang1
    });
    newsM2 = await NewsMultilang.create({
        header: "header",
        description: "descr",
        promo: news1,
        lang: lang2
    });
    newsM3 = await NewsMultilang.create({
        header: "рада обосралась снова",
        description: "рада снова как всегда обосралась",
        promo: news2,
        lang: lang1
    });
    newsM4 = await NewsMultilang.create({
        header: "header",
        description: "descr",
        promo: news2,
        lang: lang2
    });
    await Client.update({_id: client1}, {$push: {favoritePlaces: place1}});
    await Client.update({_id: client2}, {$push: {favoritePlaces: place2}});
    return "done";
}

async function dbInit() {
    await createModels();
}