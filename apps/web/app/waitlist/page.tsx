export default function WaitlistPage() {
  return (
    <main>
      <p className="eyebrow">Waitlist</p>
      <h1>Founding access.</h1>
      <form>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <button type="submit">Request invite</button>
      </form>
    </main>
  );
}
