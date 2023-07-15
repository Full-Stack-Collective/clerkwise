export const NewPatient = () => {
  return (
    <>
      <h2>Patient Information</h2>
      <form className="flex flex-col items-center gap-4 max-w-md w-full">
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="firstName">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="firstName"
            id="first Name"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="surname">
            <span className="label-text">Surname</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="surname"
            id="surname"
          />
        </div>

        <fieldset className="flex justify-around w-full max-w-xs">
          <legend className="label-text">Sex</legend>

          <label className="label cursor-pointer">
            <span className="label-text">Female</span>
            <input type="radio" name="sex" value="female" className="radio" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Male</span>
            <input type="radio" name="sex" value="male" className="radio" />
          </label>
        </fieldset>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="dob">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="dob"
            id="dob"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="id">
            <span className="label-text">ID</span>
          </label>
          <input
            type="text"
            placeholder="ID"
            className="input input-bordered w-full max-w-xs"
            name="id"
            id="id"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="phone">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            placeholder="868-555-5555"
            className="input input-bordered w-full max-w-xs"
            name="phone"
            id="phone"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="address">
            <span className="label-text">Address</span>
          </label>
          <input
            type="tel"
            className="input input-bordered w-full max-w-xs"
            name="address"
            id="address"
          />
        </div>

        <button
          className="btn btn-primary max-w-[240px] my-5 w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};
