const userData = [
  {
    id: "1",
    name: "Aisha",
    image: require("../../assets/users/user1.png"),
    status: "online",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    hobbies: [
      { name: "Painting", icon: "color-palette-outline" },
      { name: "Reading", icon: "book-outline" },
    ],
    description: {
      short: "A creative soul with a passion for art.",
      long: "Aisha is a creative soul with a deep passion for art and literature. She spends her free time painting beautiful landscapes and getting lost in the world of books. Her artistic nature is reflected in everything she does, from her hobbies to her outlook on life.",
    },
  },
  {
    id: "2",
    name: "Aarav",
    image: require("../../assets/users/user2.png"),
    status: "offline",
    phone: "+91 87654 32109",
    location: "Delhi, Delhi",
    hobbies: [
      { name: "Gym", icon: "fitness-outline" },
      { name: "Gaming", icon: "game-controller-outline" },
    ],
    description: {
      short: "A fitness enthusiast and avid gamer.",
      long: "Aarav is a fitness enthusiast who believes in staying active and healthy. When he's not at the gym, you can find him playing his favorite video games, where he enjoys the thrill of competition and strategy. Aarav's balance of physical and mental challenges defines his lifestyle.",
    },
  },
  {
    id: "3",
    name: "Priya",
    image: require("../../assets/users/user3.png"),
    status: "online",
    phone: "+91 76543 21098",
    location: "Bangalore, Karnataka",
    hobbies: [
      { name: "Singing", icon: "mic-outline" },
      { name: "Dancing", icon: "musical-notes-outline" },
    ],
    description: {
      short: "Loves music and dance.",
      long: "Priya is full of life and energy, with a deep love for music and dance. She finds joy in singing her favorite tunes and expressing herself through dance. Priya's vibrant personality makes her the life of any gathering, bringing joy to those around her.",
    },
  },
  {
    id: "4",
    name: "Arjun",
    image: require("../../assets/users/user4.png"),
    status: "online",
    phone: "+91 65432 10987",
    location: "Hyderabad, Telangana",
    hobbies: [
      { name: "Photography", icon: "camera-outline" },
      { name: "Cricket", icon: "baseball-outline" },
    ],
    description: {
      short: "Aspiring photographer and cricket lover.",
      long: "Arjun is passionate about photography, always seeking to capture the perfect shot. His love for cricket is just as strong, often spending weekends playing with friends or watching matches. Arjun's life is a blend of creativity and sportsmanship, which drives him in everything he does.",
    },
  },
  {
    id: "5",
    name: "Ananya",
    image: require("../../assets/users/user5.png"),
    status: "online",
    phone: "+91 54321 09876",
    location: "Chennai, Tamil Nadu",
    hobbies: [
      { name: "Cooking", icon: "restaurant-outline" },
      { name: "Gardening", icon: "leaf-outline" },
    ],
    description: {
      short: "Culinary artist with a green thumb.",
      long: "Ananya is a culinary artist, known for her delicious creations in the kitchen. She also has a passion for gardening, finding peace in nurturing her plants. Ananya's love for cooking and gardening reflects her nurturing nature and creativity, which shines through in her hobbies and daily life.",
    },
  },
  {
    id: "6",
    name: "Vihaan",
    image: require("../../assets/users/user6.png"),
    status: "offline",
    phone: "+91 43210 98765",
    location: "Pune, Maharashtra",
    hobbies: [
      { name: "Cycling", icon: "bicycle-outline" },
      { name: "Coding", icon: "laptop-outline" },
    ],
    description: {
      short: "Techie who loves outdoor activities.",
      long: "Vihaan is a tech enthusiast who enjoys spending his time coding and exploring new technologies. When he needs a break, he loves to go cycling, enjoying the outdoors and the fresh air. Vihaan's combination of tech-savvy skills and a love for physical activity makes him well-rounded and adaptable.",
    },
  },
  {
    id: "7",
    name: "Sneha",
    image: require("../../assets/users/user7.png"),
    status: "online",
    phone: "+91 32109 87654",
    location: "Jaipur, Rajasthan",
    hobbies: [
      { name: "Traveling", icon: "airplane-outline" },
      { name: "Photography", icon: "camera-outline" },
    ],
    description: {
      short: "Traveler with an eye for photography.",
      long: "Sneha is an avid traveler, always looking for the next adventure. Her love for photography complements her travels, capturing the beauty of the places she visits. Sneha's wanderlust and passion for photography allow her to see the world in unique and fascinating ways.",
    },
  },
  {
    id: "8",
    name: "Raj",
    image: require("../../assets/users/user8.png"),
    status: "offline",
    phone: "+91 21098 76543",
    location: "Ahmedabad, Gujarat",
    hobbies: [
      { name: "Dancing", icon: "musical-notes-outline" },
      { name: "Biking", icon: "bicycle-outline" },
    ],
    description: {
      short: "Fun-loving dancer and biker.",
      long: "Raj is a fun-loving individual who finds joy in dancing and biking. He loves the freedom of hitting the open road on his bike and expressing himself through dance. Raj's lively spirit and love for adventure make him a true thrill-seeker, always ready for the next exciting experience.",
    },
  },
  {
    id: "9",
    name: "Riya",
    image: require("../../assets/users/user9.png"),
    status: "offline",
    phone: "+91 10987 65432",
    location: "Kolkata, West Bengal",
    hobbies: [
      { name: "Sketching", icon: "pencil-outline" },
      { name: "Watching movies", icon: "film-outline" },
    ],
    description: {
      short: "Artistic mind with a love for movies.",
      long: "Riya has an artistic mind, with a passion for sketching and creating beautiful drawings. She also enjoys unwinding with movies, often finding inspiration in the stories and visuals. Riya's creativity and love for the arts make her a dreamer, always looking for beauty in the world around her.",
    },
  },
  {
    id: "10",
    name: "Rohit",
    image: require("../../assets/users/user10.png"),
    status: "online",
    phone: "+91 09876 54321",
    location: "Lucknow, Uttar Pradesh",
    hobbies: [
      { name: "Cricket", icon: "baseball-outline" },
      { name: "Kayaking", icon: "boat-outline" },
    ],
    description: {
      short: "Sports enthusiast with a love for adventure.",
      long: "Rohit is a sports enthusiast, particularly passionate about cricket. He enjoys the thrill of competition, both on the field and in his favorite outdoor activity, kayaking. Rohit's adventurous spirit and love for sports drive him to continually seek new challenges and experiences.",
    },
  },
];

export default userData;
