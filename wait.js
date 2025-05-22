// Simulate fetching user data
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: "Alice" });
      } else {
        reject("User not found");
      }
    }, 1000);
  });
}

// Simulate fetching posts by user ID
function fetchPostsByUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, userId: 1, title: "Post 1" },
        { id: 102, userId: 1, title: "Post 2" }
      ]);
    }, 1000);
  });
}

// Simulate displaying data
function displayData(user, posts) {
  console.log(`User: ${user.name}`);
  console.log("Posts:");
  posts.forEach((post) => {
    console.log(`- ${post.title}`);
  });
}

// Main async function
async function loadUserAndPosts(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPostsByUser(user.id);
    displayData(user, posts);
  } catch (error) {
    console.error("Error:", error);
  }
}

loadUserAndPosts(1); // Try changing to 2 to simulate an error
