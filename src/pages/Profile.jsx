// React
import { useMemo } from "react";

// Icons
import { Camera } from "lucide-react";

// API
import { usersApi } from "@/api/users.api";

// Toast
import { toast } from "@/notification/toast";

// Utils
import { formatUzPhone } from "@/lib/helpers";

// Hooks
import useStore from "@/hooks/useStore";
import useObjectState from "@/hooks/useObjectState";

// Components
import Input from "@/components/form/Input";
import Button from "@/components/form/Button";
import ProfilePhoto from "@/components/ProfilePhoto";

const Profile = () => {
  const { getProperty, updateProperty } = useStore("user");
  const {
    phone,
    lastName: initialLastName,
    firstName: initialFirstName,
  } = getProperty("data");

  const { setField, lastName, firstName, isLoading } = useObjectState({
    phone,
    isLoading: false,
    lastName: initialLastName,
    firstName: initialFirstName,
  });

  const isChanged = useMemo(() => {
    return initialFirstName !== firstName || initialLastName !== lastName;
  }, [lastName, firstName, initialLastName, initialFirstName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading || !isChanged) return;
    setField("isLoading", true);

    usersApi
      .update({ firstName, lastName })
      .then(({ code, user }) => {
        if (code !== "userUpdated") throw new Error();

        updateProperty("data", user);
        toast.success("Profil ma'lumotlari yangilandi");
      })
      .catch(({ message }) => toast.error(message || "Nimadir xato ketdi"))
      .finally(() => setField("isLoading", false));
  };

  return (
    <div className="mt-5 space-y-5">
      {/* Title */}
      <h1 className="font-medium text-[23px] leading-7">Profil</h1>

      {/* Profile */}
      <div className="flex items-center justify-between gap-3.5 w-full bg-gray-50 p-5 rounded-4xl">
        <div className="flex items-center gap-3.5">
          <ProfilePhoto size={64} className="size-16 rounded-full text-2xl" />

          <div className="space-y-1.5">
            {/* Full Name */}
            <strong className="line-clamp-1 text-lg font-medium">
              {initialFirstName} {initialLastName || ""}
            </strong>

            {/* Phone */}
            <p className="text-gray-500">{formatUzPhone(phone)}</p>
          </div>
        </div>

        {/* Upload Photo Btn */}
        <button className="btn size-12 bg-white rounded-full p-0 hover:text-blue-500">
          <Camera size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Edit profile */}
      <section className="bg-gray-50 p-5 space-y-3.5 rounded-4xl">
        <h2 className="font-medium text-xl">Ma'lumotlarni yangilash</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* First Name */}
          <Input
            border
            required
            size="xl"
            label="Ism"
            maxLength={24}
            name="firstName"
            value={firstName}
            placeholder="Ismingizni kiriting"
            onChange={(val) => setField("firstName", val)}
          />

          {/* Last Name */}
          <Input
            border
            size="xl"
            maxLength={24}
            name="lastName"
            value={lastName}
            label="Familiya"
            placeholder="Familiyangizni kiriting"
            onChange={(val) => setField("lastName", val)}
          />

          {/* Submit button */}
          <div>
            <Button
              size="xl"
              className="w-40"
              disabled={isLoading || !isChanged}
            >
              Yangilash{isLoading && "..."}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
