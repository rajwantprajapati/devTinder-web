const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fullName}</h2>
        <div className="flex">
          {age && <span>{age},</span>} {gender && <span> {gender}</span>}
        </div>
        <p>{about}</p>
        <div className="card-actions justify-center mt-10">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
