export default function ProfilePage() {
  return (
    <section>
      <h2>Edit Profile</h2>
      <form>
        <label>
          Full name
          <input type="text" name="fullName" />
        </label>
        <label>
          Email
          <input type="email" name="email" readOnly />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" />
        </label>
        <button type="submit">Save</button>
      </form>
    </section>
  );
}
