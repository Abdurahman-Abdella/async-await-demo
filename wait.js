// Simulated Database Layer
class DataService {
  static async fetchUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        userId === 1
          ? resolve({ id: 1, name: "Hayan" })
          : reject(new Error("User not found"));
      }, 1000);
    });
  }

  static async fetchPostsByUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = [
          { id: 101, userId: 1, title: "Learning Async" },
          { id: 102, userId: 1, title: "OOP in JavaScript" }
        ];
        resolve(posts.filter(post => post.userId === userId));
      }, 1000);
    });
  }
}

// Business Logic Layer
class UserService {
  constructor(dataService) {
    this.dataService = dataService;
  }

  async getUserWithPosts(userId) {
    const user = await this.dataService.fetchUser(userId);
    const posts = await this.dataService.fetchPostsByUser(userId);
    return { user, posts };
  }
}

// Presentation Layer
class App {
  constructor(userService) {
    this.userService = userService;
  }

  async displayUserData(userId) {
    try {
      const { user, posts } = await this.userService.getUserWithPosts(userId);

      console.log(`\n👤 User: ${user.name}`);
      console.log("📝 Posts:");
      posts.length
        ? posts.forEach(post => console.log(`- ${post.title}`))
        : console.log("No posts found.");
    } catch (error) {
      console.error("\n❌ Error:", error.message);
    }
  }
}

// Initialize and Run
const userService = new UserService(DataService);
const app = new App(userService);

// Run for valid and invalid userId
app.displayUserData(1); // Success
// app.displayUserData(2); // Uncomment to simulate error
