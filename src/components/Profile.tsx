import Profile from "../assets/profile.jpeg";

const ProfilePage = () => {
  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center space-y-5">
        <img
          src={Profile}
          alt="Profile photo"
          className="w-24 h-24 rounded-full border-4 border-slate-200 object-cover"
        />

        <div className="w-full text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">johndoe@email.com</p>
          <p className="text-gray-500 text-sm">Account created on: 03/07/2025</p>

          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="text-sm text-gray-700">Account status:</span>
            <span className="text-sm px-3 py-1 bg-green-400 text-white rounded-full">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
