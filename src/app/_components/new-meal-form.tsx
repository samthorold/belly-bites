function getCurrentDate() {
  const now = new Date();
  // const offset = now.getTimezoneOffset();
  // now.setMinutes(now.getMinutes() - offset);
  console.log(now.toISOString());
  return now.toISOString().slice(0, 16);
}

export default function NewMealForm({
  updateItemAction,
}: {
  updateItemAction: (formData: FormData) => void;
}) {
  return (
    <div className="form-container">
      <form action={updateItemAction} className="form">
        <label className="form-label">
          Name:
          <input type="text" name="mealName" className="form-input" />
        </label>
        <label className="form-label">
          Meal Time:
          <input
            type="datetime-local"
            name="mealTime"
            defaultValue={getCurrentDate()}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
}
