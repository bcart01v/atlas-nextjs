export default function NewTopic() {
    return (
      <main>
        <h1>Create a New Topic</h1>
        <form>
          <label>Topic Name:</label>
          <input type="text" name="topicName" required />
          <button type="submit">Create</button>
        </form>
      </main>
    );
  }