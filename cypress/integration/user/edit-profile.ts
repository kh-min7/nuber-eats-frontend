describe("Edit Profile", () => {
  const user = cy;
  beforeEach(() => {
    user.login("rudgh2879@naver.com", "121212");
  });
  it("can go to /edit-profile using the header", () => {
    user.get('a[href="/edit-profile"]').click();
    user.wait(2000);
    user.title().should("eq", "Edit Profile | Nuber Eats");
  });
  it("can change email", () => {
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "editProfile") {
        // @ts-ignore
        req.body?.variables?.input?.email = "rudgh2879@naver.com";
      }
    });
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("new@naver.com");
    user.findByRole("button").click();
  });
});
