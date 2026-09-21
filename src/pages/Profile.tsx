import { Mail, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import LogoutButton from "../components/auth/LogoutButton";
import AvatarUpload from "../components/profile/AvatarUpload";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const Profile = () => {
  const { user } = useAuth();
  const { data: currentUser, isError } = useCurrentUser();

  if (!user) {
    return null;
  }

  const name = currentUser?.name ?? user.fullName;
  const email = currentUser?.email ?? user.email;

  return (
    <div>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className={eyebrowClass}>My Profile</span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {name}
              </h1>

              <p className="mt-2 text-slate-600">{email}</p>
            </div>

            <LogoutButton />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <AvatarUpload />

          {isError && (
            <p className="mt-6 rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
              Couldn't refresh your profile from the server. Showing saved
              details.
            </p>
          )}

          <ul className="mt-8 space-y-4 border-t border-slate-100 pt-8 text-sm">
            <li className="flex items-center gap-3 text-slate-600">
              <User size={16} className="shrink-0 text-slate-400" />
              <span className="w-16 text-slate-400">Name</span>
              <span className="font-medium text-slate-900">{name}</span>
            </li>
            <li className="flex items-center gap-3 text-slate-600">
              <Mail size={16} className="shrink-0 text-slate-400" />
              <span className="w-16 text-slate-400">Email</span>
              <span className="font-medium text-slate-900">{email}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Profile;
