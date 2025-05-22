// Simulated Database Layer
class DataService {
  static async fetchUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId === 1) {
          resolve({ id: 1, name: "Alice" });
        } else {
          reject(new Error("User not found"));
        }
      }, 1000);
    });
  }

  static async fetchPostsByUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 101, userId: 1, title: "Learning Async" },
          { id: 102, userId: 1, title: "OOP in JavaScript" }
        ]);
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
    try {
      const user = await this.dataService.fetchUser(userId);
      const posts = await this.dataService.fetchPostsByUser(userId);
      return { user, posts };
    } catch (error) {
      throw error;
    }
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
      console.log(`User: ${user.name}`);
      console.log("Posts:");
      posts.forEach((post) => {
        console.log(`- ${post.title}`);
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

// Initialize and run
const dataService = DataService;
const userService = new UserService(dataService);
const app = new App(userService);

app.displayUserData(1); // Try 2 to trigger an error
